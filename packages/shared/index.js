// Shared constants, logic, and utilities for politok vote app

// Color constants used across web and mobile
export const COLORS = {
  // Primary colors
  PRIMARY_BLUE: '#3b82f6', // Brighter blue (blue-500) for better contrast on dark
  PRIMARY_YELLOW: '#ffaa00',

  // Text colors
  TEXT_DARK: '#0f172a',
  TEXT_RED_DARK: '#f87171', // Lighter red for dark mode text
  TEXT_RED_LIGHT: '#dc2626',
  TEXT_WHITE_DARK: '#f8fafc', // Slightly off-white for dark mode text
  TEXT_WHITE_LIGHT: '#fff',
  TEXT_BLUE_DARK: '#60a5fa', // Lighter blue for dark mode text
  TEXT_BLUE_LIGHT: '#3b82f6',
  TEXT_GRAY: '#94a3b8', // Medium gray for dark mode
  TEXT_GRAY_MEDIUM: '#cbd5e1',
  TEXT_GRAY_LIGHT: '#e2e8f0',

  // Background colors
  BG_LIGHT_BLUE: '#eff6ff',
  BG_LIGHT_GRAY: '#e2e8f0',
  BG_SELECTED: '#e2e8f0',
  BG_WHITE: '#fff',
  BG_PEACH: '#fff7ed',

  // Dark Mode Backgrounds
  BG_DARK: '#1a1a1a', // Dark Gray
  BG_DARKER: '#000000', // Black
  BG_DARK_CARD: '#262626', // Neutral 800
  BG_GRADIENT_WEB: 'linear-gradient(to bottom, #1e293b, #020617)', // Slate-800 to Slate-950
  BG_GRADIENT_MOBILE: ['#1e293b', '#020617'],

  // Dark Mode Text
  TEXT_LIGHT: '#ffffff',
  TEXT_LIGHT_GRAY: '#cbd5e1', // slate-300

  // Border colors
  BORDER_GRAY: '#475569',
  BORDER_GRAY_LIGHT: '#334155',
  BORDER_BLUE: '#3b82f6',

  // Outcome colors
  OUTCOME_RED: '#dc2626',
  OUTCOME_ORANGE: '#f59e0b',
  OUTCOME_GREEN: '#059669',
  OUTCOME_GRAY: '#64748b',

  // Hover states
  YELLOW_HOVER: '#e69900',
};

// Proposition data
export const PROPOSITIONS = [
  {
    id: 1,
    title: "🏘️ FREEZE THE RENT",
    description: "Shall we implement a freeze on rent increases for residential units?",
    options: [
      { id: 'yes', label: "Yes", type: 'reform', stats: { equity: 1, oligarchy: -1 } },
      { id: 'no', label: "No", type: 'status_quo', stats: { equity: -1, oligarchy: 1 } }
    ]
  },
  {
    id: 2,
    title: "🚌 FAST & FREE BUSES",
    description: "Shall we make buses faster and eliminate all fares?",
    options: [
      { id: 'yes', label: "Yes", type: 'reform', stats: { equity: 1, oligarchy: -1 } },
      { id: 'no', label: "No", type: 'status_quo', stats: { equity: -1, oligarchy: 1 } }
    ]
  },
  {
    id: 3,
    title: "🍼 CHILDCARE FOR ALL",
    description: "Shall we offer free, publicly-funded child care for all families?",
    options: [
      { id: 'yes', label: "Yes", type: 'systemic', stats: { equity: 1, oligarchy: -1 } },
      { id: 'no', label: "No", type: 'status_quo', stats: { equity: -1, oligarchy: 1 } }
    ]
  },
  {
    id: 4,
    title: "🏥 MEDICARE FOR ALL",
    description: "Shall we cut healthcare costs by eliminating insurance?",
    options: [
      { id: 'yes', label: "Yes", type: 'systemic', stats: { equity: 1, oligarchy: -1 } },
      { id: 'no', label: "No", type: 'status_quo', stats: { equity: -1, oligarchy: 1 } }
    ]
  }];

/**
* Process votes and calculate outcome
* @param {Object} votes - Map of proposition IDs to selected option IDs
* @returns {Object} Stats object with equity, oligarchy, and outcome
*/
export function processVote(votes) {
  let stats = { equity: 5, oligarchy: 5 };
  let typeCounts = { status_quo: 0, reform: 0, systemic: 0 };
  const voteCount = Object.keys(votes).length;

  // If no votes cast at all, things deteriorate significantly
  // We let this flow through to calculate the specific 96% score for apathy

  PROPOSITIONS.forEach(prop => {
    const selectedOptionId = votes[prop.id];

    if (!selectedOptionId) {
      // Skipping individual props has a milder impact (0% of a No)
      stats.equity -= 0.0;
      stats.oligarchy += 0.0;
      return;
    }

    const option = prop.options.find(o => o.id === selectedOptionId);
    typeCounts[option.type]++;
    stats.equity += option.stats.equity;
    stats.oligarchy += option.stats.oligarchy;
  });

  // Calculate raw scores without clamping first to preserve relative differences
  // Baseline is 5. Max add is +9 (14), Min sub is -6 (-1).

  // Piecewise normalization to satisfy specific user constraints:
  // - Score -1 (Max Reform) -> 1% Oligarchy
  // - Score 5 (Neutral) -> 50% Oligarchy
  // - Score 8 (All Skips) -> 96% Oligarchy
  // - Score 14 (All Status Quo) -> 99% Oligarchy

  let oligarchyPercent;
  const rawOligarchy = stats.oligarchy;

  if (rawOligarchy <= 5) {
    // Range -1 to 5 maps to 1% to 50%
    // Slope = 49 / 6 = 8.166...
    oligarchyPercent = 1 + ((rawOligarchy - (-1)) * (49 / 6));
  } else if (rawOligarchy <= 8) {
    // Range 5 to 8 maps to 50% to 96%
    // Slope = 46 / 3 = 15.333...
    oligarchyPercent = 50 + ((rawOligarchy - 5) * (46 / 3));
  } else {
    // Range 8 to 14 maps to 96% to 99%
    // Slope = 3 / 6 = 0.5
    oligarchyPercent = 96 + ((rawOligarchy - 8) * 0.5);
  }

  // Round to nearest integer
  stats.oligarchy = Math.round(oligarchyPercent);

  // Clamp to 1-99 range
  stats.oligarchy = Math.max(1, Math.min(99, stats.oligarchy));
  stats.equity = 100 - stats.oligarchy;

  // Determine outcome based on voting patterns and resulting scores
  let outcome = "";

  if (stats.oligarchy >= 90) {
    outcome = "Oligarchy Dominates";
  } else if (stats.oligarchy >= 80) {
    outcome = "Oligarchy Reigns";
  } else if (stats.oligarchy >= 70) {
    outcome = "Oligarchy Overpowers";
  } else if (stats.oligarchy >= 60) {
    outcome = "Oligarchy Seizes";
  } else if (stats.equity === 50) {
    outcome = "Equity Stagnants";
  } else if (stats.equity < 50) {
    outcome = "Equity Dwindles";
  } else {
    // equity > 50% – green outcomes
    if (typeCounts.reform >= 2 && typeCounts.systemic >= 1) {
      outcome = "Equity Advances";
    } else if (stats.equity >= 60) {
      outcome = "Equity Gains";
    } else {
      outcome = "Equity Improves";
    }
  }
  stats.outcome = outcome + ":";
  return stats;
}


/**
 * Get color for stat value based on comparison to baseline
 * @param {number} value - Current stat value
 * @param {number} baseline - Baseline to compare against
 * @param {boolean} inverted - Whether higher values are worse (for oligarchy)
 * @returns {string} Hex color code
 */
export function getStatColor(value, baseline, inverted = false) {
  const diff = value - baseline;
  if (inverted) {
    // For oligarchy: higher is worse
    if (diff > 20) return COLORS.OUTCOME_RED; // red - much worse
    if (diff > 0) return COLORS.OUTCOME_ORANGE; // orange - worse
    if (diff === 0) return COLORS.OUTCOME_GRAY; // gray - neutral
    if (diff > -20) return '#10b981'; // green - better
    return COLORS.OUTCOME_GREEN; // dark green - much better
  } else {
    // For happiness/equity: higher is better
    if (diff < -20) return COLORS.OUTCOME_RED; // red - much worse
    if (diff < 0) return COLORS.OUTCOME_ORANGE; // orange - worse
    if (diff === 0) return COLORS.OUTCOME_GRAY; // gray - neutral
    if (diff < 20) return '#10b981'; // green - better
    return COLORS.OUTCOME_GREEN; // dark green - much better
  }
}

/**
 * Generate shareable text for social media/messaging
 * @param {Object} votes - Map of proposition IDs to selected option IDs
 * @param {Object} resultStats - Stats object with equity, oligarchy, and outcome
 * @returns {string} Formatted share text
 */
export function generateShareText(votes, resultStats) {
  let shareText = "https://politok.vercel.app/\n\n";

  // Show outcome and stats first (like the results page)
  shareText += `${resultStats.outcome} \n\n`;
  shareText += `Equity ${resultStats.equity}%\nOligarchy ${resultStats.oligarchy}%\n\n`;

  // Then show voting pattern with emojis
  PROPOSITIONS.forEach(prop => {
    const vote = votes[prop.id];
    let emoji;
    if (vote === 'yes') {
      emoji = '✅';
    } else if (vote === 'no') {
      emoji = '❌';
    } else {
      emoji = '❔';
    }
    shareText += `${prop.title} ${emoji} \n`;
  });

  return shareText;
}

/**
 * Get color for outcome string
 * @param {string} outcome - Outcome string
 * @returns {string} Hex color code
 */
export function getOutcomeColor(outcome) {
  if (!outcome) return COLORS.OUTCOME_GRAY;
  const lower = outcome.toLowerCase();

  // Determine outcome color
  let outcomeColor;
  if (lower.includes('oligarchy') || lower.includes('dwindles')) {
    outcomeColor = COLORS.OUTCOME_RED;
  } else if (lower.includes('stagnants')) {
    outcomeColor = COLORS.OUTCOME_GRAY;
  } else if (lower.includes('equity')) { // advances, gains, improves
    outcomeColor = COLORS.OUTCOME_GREEN;
  } else {
    outcomeColor = COLORS.OUTCOME_GRAY; // Default for unknown outcomes
  }
  return outcomeColor;
}

/**
 * Calculate percentile ranking based on oligarchy score
 * Uses simulated distribution to show relative position
 * @param {number} oligarchyPercent - Oligarchy percentage (1-99)
 * @returns {Object} Percentile data with ranking and message
 */
export function getPercentileRanking(oligarchyPercent) {
  // Simulated realistic distribution
  // Most people vote for equity, so curve is skewed left
  // Lower oligarchy % = higher percentile (more equitable than others)

  let percentile;

  if (oligarchyPercent <= 20) {
    percentile = 95; // Very equitable - top 5%
  } else if (oligarchyPercent <= 30) {
    percentile = 85; // High equity - top 15%
  } else if (oligarchyPercent <= 40) {
    percentile = 70; // Good equity - top 30%
  } else if (oligarchyPercent <= 50) {
    percentile = 50; // Neutral
  } else if (oligarchyPercent <= 60) {
    percentile = 30; // Leaning oligarchy
  } else if (oligarchyPercent <= 70) {
    percentile = 15; // High oligarchy - bottom 15%
  } else {
    percentile = 5; // Very oligarchic - bottom 5%
  }

  const isEquitable = oligarchyPercent < 50;
  const isMedian = oligarchyPercent === 50;

  const message = isMedian
    ? `at 50% for equity support`
    : isEquitable
      ? `in top ${100 - percentile}% for equity support`
      : `in bottom ${percentile}% for equity support`;

  return {
    percentile,
    message,
    isTopTier: percentile >= 85,
    isBottomTier: percentile <= 15
  };
}

/**
 * Generate identity label based on voting pattern and outcome
 * @param {Object} stats - Stats object with equity, oligarchy, outcome
 * @param {Object} votes - Map of proposition IDs to selected option IDs
 * @returns {Object} Identity label with emoji and color
 */
export function getIdentityLabel(stats, votes) {
  const yesCount = Object.values(votes).filter(v => v === 'yes').length;
  const noCount = Object.values(votes).filter(v => v === 'no').length;
  const skippedCount = PROPOSITIONS.length - Object.keys(votes).length;

  // 1. Very high oligarchy (0-20% equity / 80-99% oligarchy) - narrow extreme (20%)
  if (stats.oligarchy >= 80) {
    return { label: 'Naysayer', emoji: '👎', color: COLORS.OUTCOME_RED, description: 'No to government solutions', groupNumber: 1 };
  }

  // 2. Easter Egg: 67% oligarchy (33% equity / 67% oligarchy) - SPECIAL
  if (stats.oligarchy === 67) {
    return { label: '6-7 Oligarchy', emoji: '👌 👇', color: COLORS.OUTCOME_WHITE, description: 'Nonsensical expression', groupNumber: 2 };
  }

  // 3. High oligarchy (51-79% oligarchy, excluding 67) - wider (28%)
  if (stats.oligarchy > 50) {
    return { label: 'Status Quo', emoji: '🫤', color: COLORS.OUTCOME_ORANGE, description: 'Prefer most things as they are', groupNumber: 3 };
  }

  // 4. Swing voter (exactly 50%) - SPECIAL (1%)
  if (stats.equity === 50) {
    return { label: 'Swing Voter', emoji: '🤷', color: COLORS.OUTCOME_GRAY, description: 'Either Way', groupNumber: 4 };
  }

  // 5. Easter Egg: 33% oligarchy (67% equity / 33% oligarchy) - SPECIAL
  if (stats.oligarchy === 33) {
    return { label: '6-7 Equity', emoji: '👌 👆', color: COLORS.OUTCOME_WHITE, description: 'No fixed meaning', groupNumber: 5 };
  }

  // 6. High equity (21-49% oligarchy, excluding 33) - wider (28%)
  if (stats.oligarchy >= 21) {
    return { label: 'Change Minded', emoji: '🙌', color: COLORS.OUTCOME_GREEN, description: 'Open to reform and new ideas', groupNumber: 6 };
  }

  // 7. Very High Equity - All Yes (1-20% oligarchy) - narrow extreme (20%)
  return { label: 'type shi', emoji: '👍', color: COLORS.OUTCOME_GREEN, description: 'Equity vibes', groupNumber: 7 };

  // Fallback (shouldn't reach here with full coverage)
  return { label: 'Undecided', emoji: '🤔', color: COLORS.OUTCOME_GRAY, description: 'Still figuring it out', groupNumber: 0 };
}

/**
 * Generate controversy/hot take based on voting pattern
 * @param {Object} votes - Map of proposition IDs to selected option IDs
 * @returns {Object} Controversy data with statement and type
 */
export function getControversyHook(votes) {
  const controversies = [];

  // Check each proposition for controversy hooks
  if (votes[2] === 'no') { // No on free buses
    controversies.push({
      statement: "no free buses = people paying $5+ daily to get to work while traffic stays gridlocked",
      proposition: "FAST & FREE BUSES",
      isControversial: true
    });
  }

  if (votes[1] === 'no') { // No on rent freeze
    controversies.push({
      statement: "no rent freeze = families choosing between rent increases and staying in their neighborhood",
      proposition: "FREEZE THE RENT",
      isControversial: true
    });
  }

  if (votes[3] === 'no') { // No on childcare
    controversies.push({
      statement: "no childcare = parents paying $2000+/month or one parent quits their job",
      proposition: "CHILDCARE FOR ALL",
      isControversial: true
    });
  }

  if (votes[4] === 'no') { // No on medicare for all
    controversies.push({
      statement: "no medicare for all = medical bankruptcy remains the #1 cause of bankruptcy",
      proposition: "MEDICARE FOR ALL",
      isControversial: true
    });
  }

  // If all yes votes
  const yesCount = Object.values(votes).filter(v => v === 'yes').length;
  if (yesCount === PROPOSITIONS.length) {
    controversies.push({
      statement: "yes to everything = funded by progressive taxes on corporations and high earners making $1M+",
      proposition: "ALL",
      isControversial: true
    });
  }

  // If all no votes
  const noCount = Object.values(votes).filter(v => v === 'no').length;
  if (noCount === PROPOSITIONS.length) {
    controversies.push({
      statement: "no to everything = rent keeps rising, transit stays broken, childcare unaffordable",
      proposition: "ALL",
      isControversial: true
    });
  }

  // Pick a random controversy or return none
  if (controversies.length === 0) {
    return {
      statement: "mixed votes = pragmatic approach to policy trade-offs",
      isControversial: false
    };
  }

  return controversies[Math.floor(Math.random() * controversies.length)];
}

/**
 * Generate friend comparison hash from vote data
 * @param {Object} votes - Map of proposition IDs to selected option IDs
 * @param {Object} stats - Stats object with equity, oligarchy, outcome
 * @returns {string} Base64 encoded comparison data
 */
export function generateFriendComparisonHash(votes, stats) {
  const data = {
    v: votes,
    e: stats.equity,
    o: stats.oligarchy,
    oc: stats.outcome
  };

  try {
    // Convert to JSON then base64
    const jsonStr = JSON.stringify(data);
    if (typeof btoa !== 'undefined') {
      return btoa(jsonStr); // Browser
    } else {
      return Buffer.from(jsonStr).toString('base64'); // Node/React Native
    }
  } catch (error) {
    console.error('Error generating comparison hash:', error);
    return '';
  }
}

/**
 * Parse friend comparison hash
 * @param {string} hash - Base64 encoded comparison data
 * @returns {Object|null} Decoded comparison data or null if invalid
 */
export function parseFriendComparisonHash(hash) {
  try {
    let jsonStr;
    if (typeof atob !== 'undefined') {
      jsonStr = atob(hash); // Browser
    } else {
      jsonStr = Buffer.from(hash, 'base64').toString(); // Node/React Native
    }
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error('Error parsing comparison hash:', error);
    return null;
  }
}

/**
 * Compare two sets of vote results
 * @param {Object} myStats - My stats object
 * @param {Object} friendStats - Friend's stats object  
 * @returns {Object} Comparison data with differences
 */
export function compareResults(myStats, friendStats) {
  const equityDiff = myStats.equity - friendStats.equity;
  const oligarchyDiff = myStats.oligarchy - friendStats.oligarchy;

  let message;
  if (Math.abs(equityDiff) <= 5) {
    message = "You're basically the same!";
  } else if (equityDiff > 0) {
    message = `You're ${Math.abs(equityDiff)}% MORE equitable`;
  } else {
    message = `You're ${Math.abs(equityDiff)}% LESS equitable`;
  }

  return {
    equityDiff,
    oligarchyDiff,
    message,
    isSimilar: Math.abs(equityDiff) <= 10,
    moreEquitable: equityDiff > 0
  };
}

/**
 * Generate viral-optimized share text
 * @param {Object} votes - Map of proposition IDs to selected option IDs
 * @param {Object} resultStats - Stats object with equity, oligarchy, outcome
 * @param {Object} percentileData - Percentile ranking data
 * @param {Object} identityLabel - Identity label data
 * @returns {string} Enhanced viral share text
 */
export function generateViralShareText(votes, resultStats, percentileData, identityLabel) {
  let shareText = "";

  // URL at the top
  shareText += `https://politok.vercel.app/\n`;

  // Empty line
  shareText += `\n`;

  // Identity label with emoji
  shareText += `${identityLabel.emoji} ${identityLabel.label}\n\n`;

  // Identity label with emoji - Group 7 Format
  shareText += `If you are seeing this, you are in Group ${identityLabel.groupNumber}\n\n`;

  // Percentile flex or humility
  if (percentileData.isTopTier) {
    shareText += `We are lowkey ${percentileData.message} 🤜 🤛\n\n`;
  } else if (percentileData.isBottomTier) {
    shareText += `We are nahhh ${percentileData.message} 😭\n\n`;
  } else {
    shareText += `We are ${percentileData.message}\n\n`;
  }

  // Outcome
  shareText += `${resultStats.outcome}\n`;
  if (resultStats.oligarchy > resultStats.equity) {
    shareText += `Oligarchy ${resultStats.oligarchy}%\nEquity ${resultStats.equity}%\n\n`;
  } else {
    shareText += `Equity ${resultStats.equity}%\nOligarchy ${resultStats.oligarchy}%\n\n`;
  }

  // Voting pattern with emojis
  PROPOSITIONS.forEach(prop => {
    const vote = votes[prop.id];
    let emoji;
    if (vote === 'yes') {
      emoji = '✅';
    } else if (vote === 'no') {
      emoji = '❌';
    } else {
      emoji = '❔';
    }
    shareText += `${prop.title} ${emoji}\n`;
  });

  // Call to action
  shareText += `\nHow would you vote?\n`;

  return shareText;
}

/**
 * Generate provocative landing page hooks
 * @returns {Object} Random landing page hook
 */
export function getLandingPageHook() {
  const hooks = [
    {
      question: "equity type shi?",
      subtext: "let's see if you're fr or just vibes",
      emoji: "⚖️"
    },
    {
      question: "bruh, you cooked?",
      subtext: "or actually based with the politok takes",
      emoji: "🔥"
    },
    {
      question: "6-7 POV: think you care",
      subtext: "prove it or you're mid honestly",
      emoji: "👌 👇"
    },
    {
      question: "bro, lowkey oligarchy supporter?",
      subtext: "your votes about to expose you no cap",
      emoji: "🎩"
    },
    {
      question: "viral content unlocked",
      subtext: "get scripts + captions for TikTok fr",
      emoji: "🎬"
    },
    {
      question: "main character energy?",
      subtext: "time to see if you ate or just performed",
      emoji: "✨"
    },
    {
      question: "it's giving... what exactly?",
      subtext: "equity or oligarchy? we about to find out",
      emoji: "🤔"
    }
  ];

  return hooks[Math.floor(Math.random() * hooks.length)];
}

/**
 * Generate TikTok-ready scripts based on user's quiz results
 * @param {Object} votes - Map of proposition IDs to selected option IDs
 * @param {Object} resultStats - Stats object with equity, oligarchy, outcome
 * @param {Object} identityLabel - Identity label data
 * @param {Object} controversyHook - Controversy hook data
 * @returns {Array} Array of 3 script objects with type, content, and hashtags
 */
export function generateTikTokScripts(votes, resultStats, identityLabel, controversyHook) {
  const yesCount = Object.values(votes).filter(v => v === 'yes').length;
  const noCount = Object.values(votes).filter(v => v === 'no').length;

  // Script 1: Hook Script (Personal Story Angle)
  let hookScript = '';
  if (resultStats.equity >= 70) {
    hookScript = `POV: You just found out your rent could've been frozen but people voted NO\n\n[Show your ${resultStats.oligarchy}% oligarchy score]\n\n"Yeah...I got a ${resultStats.equity}% equity score on politok and I'm lowkey proud"\n\n#politok #rentcrisis #genz #equity`;
  } else if (resultStats.oligarchy >= 70) {
    hookScript = `POV: Your votes just exposed you\n\n[Show ${resultStats.oligarchy}% oligarchy score]\n\n"Not me voting against affordable housing, transit, and childcare 💀"\n\n#politok #exposed #realitycheck`;
  } else {
    hookScript = `POV: You took politok\n\n[Show your ${resultStats.equity}% equity score]\n\n"Turns out I'm ${identityLabel.emoji} ${identityLabel.label}"\n\n#politok #politicaltiktok #genz`;
  }

  // Script 2: Controversy Script (React to Hot Take)
  let controversyScript = '';
  if (controversyHook && controversyHook.isControversial) {
    controversyScript = `Not me getting called out for my votes 💀\n\n[React to: "${controversyHook.statement}"]\n\n"But like...they're not wrong tho"\n\n#politok #hottake #based #reality`;
  } else {
    controversyScript = `My politok hot take:\n\n${resultStats.outcome}\n\n[Show: ${identityLabel.emoji} ${identityLabel.label}]\n\n"${identityLabel.label} and I stand by it"\n\n#politok #politicaltiktok #hottake`;
  }

  // Script 3: Challenge Script (Competitive/Participatory)
  const challengeScript = `I voted on 3 politok policies and got ${resultStats.equity}% equity\n\n${identityLabel.emoji} ${identityLabel.label}\n\nDrop your score in the comments 👇\n\nLet's see who's really about that life\n\n#challenge #politok #vote #equity`;

  return [
    {
      type: 'hook',
      title: '🎯 POV Hook',
      content: hookScript,
      description: 'Personal story angle - relatable and engaging'
    },
    {
      type: 'controversy',
      title: '🔥 Hot Take',
      content: controversyScript,
      description: 'React to your results - sparks discussion'
    },
    {
      type: 'challenge',
      title: '💪 Challenge',
      content: challengeScript,
      description: 'Get others to participate - drives engagement'
    }
  ];
}

/**
 * Generate TikTok-ready caption with hashtags
 * @param {Object} resultStats - Stats object with equity, oligarchy, outcome
 * @param {Object} identityLabel - Identity label data
 * @param {Object} controversyHook - Controversy hook data (optional)
 * @returns {string} Complete caption with hashtags
 */
export function generateTikTokCaption(resultStats, identityLabel, controversyHook) {
  let caption = '';

  // Add hot take if controversial
  if (controversyHook && controversyHook.isControversial) {
    caption += `📋 ${controversyHook.statement}\n\n`;
  }

  // Add score and identity
  caption += `${identityLabel.emoji} I scored ${resultStats.equity}% equity on politok\n`;
  caption += `${identityLabel.label}\n\n`;

  // Add outcome
  caption += `Result: ${resultStats.outcome}\n\n`;

  // Add CTA
  caption += `🎯 Link in bio to take it\n\n`;

  // Add hashtags
  const currentYear = new Date().getFullYear();
  caption += `#politok #politok #genz #genalpha #genbeta #politok #vote${currentYear} #equity #fightoligarchy #housing #policy #vote #freezetherent #fastandfreebuses #childcareforall`;

  return caption;
}
