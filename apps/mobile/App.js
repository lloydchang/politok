import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Linking, ScrollView, Modal, Animated, Share, Alert, Clipboard } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import {
  PROPOSITIONS,
  COLORS,
  processVote as processVoteShared,
  getOutcomeColor,
  getStatColor,
  generateShareText,
  getPercentileRanking,
  getIdentityLabel,
  getControversyHook,
  generateFriendComparisonHash,
  generateViralShareText,
  getLandingPageHook
} from '@politok/shared';

import { PostHogProvider, usePostHog } from 'posthog-react-native';
import { initObservability } from './src/lib/observability';
import { useAnalytics } from './src/lib/analytics';

// Initialize Honeycomb Observability
initObservability();

export default function App() {
  return (
    <PostHogProvider
      apiKey={process.env.EXPO_PUBLIC_POSTHOG_KEY}
      options={{
        host: process.env.EXPO_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
      }}
    >
      <AppContent />
    </PostHogProvider>
  );
}

function AppContent() {
  const { trackEvent, trackPropositionVote, trackSimulationCompleted } = useAnalytics();
  const [simulationMode, setSimulationMode] = useState(false);
  const [votes, setVotes] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [resultStats, setResultStats] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Viral features state
  const [percentileData, setPercentileData] = useState(null);
  const [identityLabel, setIdentityLabel] = useState(null);
  const [controversyHook, setControversyHook] = useState(null);
  const [friendComparisonLink, setFriendComparisonLink] = useState(null);
  const [controversyReaction, setControversyReaction] = useState(null);
  const [landingHook] = useState(getLandingPageHook());

  const handleShare = async () => {
    // Use viral share text if we have the data
    const shareText = (percentileData && identityLabel)
      ? generateViralShareText(votes, resultStats, percentileData, identityLabel)
      : generateShareText(votes, resultStats);

    // Track viral share event
    trackEvent('viral_share_clicked', {
      share_content: shareText,
      outcome: resultStats.outcome,
      equity_percent: resultStats.equity,
      oligarchy_percent: resultStats.oligarchy,
      percentile: percentileData?.percentile,
      identity_label: identityLabel?.label,
      vote_count: Object.keys(votes).length
    });

    try {
      await Share.share({
        message: shareText,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleTitleTap = () => {
    // Track politok title click
    trackEvent('politok_title_clicked');

    setSimulationMode(true);
    setSubmitted(false);
    setVotes({});
    setResultStats(null);
    setShowConfirm(false);

    // Track simulation started
    trackEvent('simulation_started');
  };

  const handleVoteButtonPress = () => {
    // Track VOTE button press
    trackEvent('vote_button_clicked');

    setSimulationMode(true);
    setSubmitted(false);
    setVotes({});
    setResultStats(null);
    setShowConfirm(false);

    // Track simulation started
    trackEvent('simulation_started');
  };

  const handleVote = (propId, optionId) => {
    const proposition = PROPOSITIONS.find(p => p.id === propId);

    setVotes(prev => {
      const isDeselection = prev[propId] === optionId;

      // Track the vote/deselection
      if (proposition) {
        trackPropositionVote(propId, proposition.title, optionId, isDeselection);
      }

      if (isDeselection) {
        const newVotes = { ...prev };
        delete newVotes[propId];
        return newVotes;
      }
      return { ...prev, [propId]: optionId };
    });
  };

  const castVote = () => {
    const voteCount = Object.keys(votes).length;
    const skipped = PROPOSITIONS.length - voteCount;

    // Track cast vote button press
    trackEvent('cast_vote_button_clicked', {
      vote_count: voteCount,
      skipped_count: skipped
    });

    if (skipped > 0) {
      setShowConfirm(true);
      return;
    }

    const results = processVoteShared(votes);

    // Calculate viral features
    const percentile = getPercentileRanking(results.oligarchy);
    const identity = getIdentityLabel(results, votes);
    const controversy = getControversyHook(votes);
    const comparisonHash = generateFriendComparisonHash(votes, results);
    const comparisonUrl = `politok://compare?data=${comparisonHash}`;

    setPercentileData(percentile);
    setIdentityLabel(identity);
    setControversyHook(controversy);
    setFriendComparisonLink(comparisonUrl);

    // Track simulation completion with viral data
    trackSimulationCompleted(votes, results, PROPOSITIONS);

    // Track viral elements revealed
    trackEvent('percentile_revealed', {
      percentile: percentile.percentile,
      is_top_tier: percentile.isTopTier,
      oligarchy_percent: results.oligarchy
    });

    trackEvent('identity_label_shown', {
      label: identity.label,
      emoji: identity.emoji,
      equity_percent: results.equity
    });

    setResultStats(results);
    setSubmitted(true);
    setShowConfirm(false);
  };

  const exitSimulation = () => {
    // Track start over press
    trackEvent('start_over_clicked');

    setSimulationMode(false);
    setSubmitted(false);
    setVotes({});
    setShowConfirm(false);
  };

  if (simulationMode) {
    if (submitted && resultStats) {
      return (
        <View style={styles.container}>
          <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>

            <View style={[styles.resultCard, { borderColor: getOutcomeColor(resultStats.outcome) }]}>
              <Text style={[styles.outcomeTitle, { color: getOutcomeColor(resultStats.outcome) }]}>
                {resultStats.outcome}
              </Text>

              <View style={styles.statsGrid}>
                <View style={styles.statBox}>
                  <Text style={styles.statEmoji}>⚖️</Text>
                  <Text style={styles.statLabel}>Equity</Text>
                  <Text style={[styles.statValue, { color: getStatColor(resultStats.equity, 50) }]}>
                    {resultStats.equity}%
                  </Text>
                </View>

                <View style={styles.statBox}>
                  <Text style={styles.statEmoji}>🎩</Text>
                  <Text style={styles.statLabel}>Oligarchy</Text>
                  <Text style={[styles.statValue, { color: getStatColor(resultStats.oligarchy, 50, true) }]}>
                    {resultStats.oligarchy}%
                  </Text>
                </View>
              </View>

              <View style={styles.voteSummary}>
                {PROPOSITIONS.map((prop) => {
                  const votedOption = votes[prop.id];
                  const skipped = !votedOption;
                  return (
                    <View key={prop.id} style={styles.voteResultRow}>
                      <Text style={styles.voteResultTitle}>{prop.title}</Text>
                      <Text style={[
                        styles.voteResultValue,
                        skipped && styles.voteResultSkipped,
                        votedOption === 'yes' && styles.voteResultYes,
                        votedOption === 'no' && styles.voteResultNo
                      ]}>
                        {skipped ? 'Skipped' : votedOption === 'yes' ? 'Yes' : 'No'}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>

            <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
              <Text style={styles.shareButtonText}>SHARE</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.exitButton} onPress={exitSimulation}>
              <Text style={styles.exitButtonText}>START OVER</Text>
            </TouchableOpacity>
          </ScrollView>
          <StatusBar style="dark" />
        </View>
      );
    }

    const voteCount = Object.keys(votes).length;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {PROPOSITIONS.map((prop) => (
            <View key={prop.id} style={styles.propContainer}>
              <Text style={styles.propTitle}>{prop.title}</Text>
              <Text style={styles.propDesc}>{prop.description}</Text>

              <View style={styles.optionsContainer}>
                {prop.options.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.optionButton,
                      votes[prop.id] === option.id && styles.optionSelected
                    ]}
                    onPress={() => handleVote(prop.id, option.id)}
                  >
                    <View style={[
                      styles.radioCircle,
                      votes[prop.id] === option.id && styles.radioSelected
                    ]} />
                    <Text style={[
                      styles.optionText,
                      votes[prop.id] === option.id && styles.optionTextSelected
                    ]}>{option.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}

          <TouchableOpacity style={styles.submitButton} onPress={castVote}>
            <Text style={styles.submitButtonText}>CAST VOTE</Text>
          </TouchableOpacity>

        </ScrollView>

        <Modal
          visible={showConfirm}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowConfirm(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Incomplete Ballot</Text>
              <Text style={styles.modalQuestion}>Do you want to continue?</Text>

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.modalButtonSecondary}
                  onPress={() => {
                    trackEvent('review_ballot_clicked');
                    setShowConfirm(false);
                  }}
                >
                  <Text style={styles.modalButtonSecondaryText}>Review Ballot</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButtonPrimary}
                  onPress={() => {
                    const results = processVoteShared(votes);
                    // Track simulation completion with incomplete ballot
                    trackSimulationCompleted(votes, results, PROPOSITIONS);
                    setResultStats(results);
                    setSubmitted(true);
                    setShowConfirm(false);
                  }}
                >
                  <Text style={styles.modalButtonPrimaryText}>CAST VOTE</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <StatusBar style="dark" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleTitleTap} style={{ alignItems: 'center' }}>
        <Animated.Text style={[styles.title, { transform: [{ scale: scaleAnim }] }]}>Affordability</Animated.Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleVoteButtonPress}>
        <Text style={styles.buttonText}>VOTE</Text>
      </TouchableOpacity>

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#0c2788',
    marginBottom: 10,
  },
  hint: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 50,
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: '#ffaa00',
    paddingHorizontal: 80,
    paddingVertical: 24,
    borderRadius: 8,
    marginBottom: 32,
    elevation: 8,
  },
  buttonText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2141c4',
    letterSpacing: 4,
  },
  disclaimerBanner: {
    width: '100%',
    backgroundColor: '#fef3c7',
    borderBottomWidth: 3,
    borderBottomColor: '#f59e0b',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  disclaimerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#92400e',
    textAlign: 'center',
    marginBottom: 6,
  },
  disclaimerSubtext: {
    fontSize: 13,
    color: '#78350f',
    textAlign: 'center',
    lineHeight: 18,
  },
  voteGovLink: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: '#78350f',
  },
  voteCounter: {
    width: '100%',
    paddingVertical: 12,
    backgroundColor: '#e2e8f0',
  },
  voteCounterText: {
    textAlign: 'center',
    color: '#475569',
    fontSize: 14,
  },
  scrollView: {
    width: '100%',
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  propContainer: {
    marginBottom: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#cbd5e1',
    paddingBottom: 24,
  },
  propTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 4,
  },
  propDesc: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 2,
    borderColor: '#94a3b8',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  optionSelected: {
    borderColor: '#2141c4',
    backgroundColor: '#e2e8f0',
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ffaa00',
    marginRight: 12,
    backgroundColor: '#fff',
  },
  radioSelected: {
    backgroundColor: '#2141c4',
  },
  optionText: {
    fontSize: 16,
    color: '#334155',
    flex: 1,
  },
  optionTextSelected: {
    fontWeight: 'bold',
    color: '#0f172a',
  },
  submitButton: {
    backgroundColor: '#2141c4',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 12,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  cancelLink: {
    alignItems: 'center',
    padding: 10,
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderColor: '#2141c4',
    borderWidth: 2,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  cancelButtonText: {
    color: '#2141c4',
    fontSize: 18,
    fontWeight: '600',
  },
  cancelText: {
    color: '#64748b',
    textDecorationLine: 'underline',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    borderWidth: 4,
    borderColor: '#2141c4',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2141c4',
    marginBottom: 12,
  },
  modalText: {
    fontSize: 16,
    color: '#1e40af',
    marginBottom: 8,
    lineHeight: 22,
  },
  modalQuestion: {
    fontSize: 16,
    color: '#3b82f6',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButtonSecondary: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#e2e8f0',
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonSecondaryText: {
    color: '#334155',
    fontWeight: '600',
    fontSize: 16,
  },
  modalButtonPrimary: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#ffaa00',
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonPrimaryText: {
    color: '#2141c4',
    fontWeight: 'bold',
    fontSize: 16,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0f172a',
    textAlign: 'center',
    marginBottom: 24,
  },
  resultCard: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    borderWidth: 4,
    marginBottom: 20,
  },
  outcomeTitle: {
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
    justifyContent: 'space-around',
    gap: 12,
  },
  statBox: {
    width: '30%',
    alignItems: 'center',
    padding: 12,
  },
  statEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  voteSummary: {
    borderTopWidth: 2,
    borderTopColor: '#e2e8f0',
    paddingTop: 16,
  },
  voteSummaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 12,
  },
  voteResultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  voteResultTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
    flex: 1,
  },
  voteResultValue: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 12,
  },
  voteResultYes: {
    color: '#059669',
  },
  voteResultNo: {
    color: '#dc2626',
  },
  voteResultSkipped: {
    color: '#64748b',
    fontStyle: 'italic',
  },
  disclaimerBox: {
    backgroundColor: '#fef3c7',
    borderWidth: 3,
    borderColor: '#f59e0b',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  shareButton: {
    backgroundColor: '#2141c4',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  exitButton: {
    backgroundColor: '#ffaa00',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  exitButtonText: {
    color: '#2141c4',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
});
