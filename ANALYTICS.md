# Analytics Documentation

This document outlines all analytics events tracked in the polytawk application using PostHog.

## Tracked Events

### User Journey Events

| Event Name | Description | Properties |
|------------|-------------|------------|
| `simulation_started` | User starts the voting simulation | - |
| `cast_vote_button_clicked` | User clicks "Cast Vote" button | `vote_count`, `skipped_count` |
| `simulation_completed` | User completes the quiz | `equity_percent`, `oligarchy_percent`, `outcome`, `vote_count`, `skipped_count`, `votes_detail` |
| `start_over_clicked` | User clicks "Start Over" | - |
| `review_ballot_clicked` | User chooses to review incomplete ballot | - |

### Proposition Voting

| Event Name | Description | Properties |
|------------|-------------|------------|
| `proposition_vote` | User votes on a proposition | `proposition_id`, `proposition_title`, `option_id`, `is_deselection` |

### Viral Features

| Event Name | Description | Properties |
|------------|-------------|------------|
| `viral_share_clicked` | User shares results | `share_content`, `outcome`, `equity_percent`, `oligarchy_percent`, `percentile`, `identity_label`, `vote_count` |
| `percentile_revealed` | Percentile ranking shown | `percentile`, `is_top_tier`, `oligarchy_percent` |
| `identity_label_shown` | Identity label displayed | `label`, `emoji`, `equity_percent` |
| `controversy_reaction` | User reacts to hot take | `reaction` ('agree'/'disagree'), `statement` |

### TikTok Content

| Event Name | Description | Properties |
|------------|-------------|------------|
| `tiktok_script_copied` | User copies TikTok script | `script_type` ('hook', 'controversy', 'challenge') |
| `tiktok_caption_copied` | User copies TikTok caption | - |

### Downloadable Cards

| Event Name | Description | Properties |
|------------|-------------|------------|
| `card_download_started` | Card generation begins | `card_type` ('score', 'hottake', 'comparison', 'challenge') |
| `card_download_completed` | Card successfully downloaded | `card_type` |
| `card_download_failed` | Card generation failed | `card_type`, `error` |

### Conversion Events

| Event Name | Description | Properties |
|------------|-------------|------------|
| `voter_registration_clicked` | User clicks voter registration CTA | - |
| `ballot_search` | User searches for their ballot | `zip_code` |
| `org_clicked` | User clicks on organization link | `org_name` |

### Navigation

| Event Name | Description | Properties |
|------------|-------------|------------|
| `polytawk_title_clicked` | User clicks app title | - |
| `vote_button_clicked` | User clicks main VOTE button | - |

## Key Metrics to Monitor

### Engagement Funnel
1. **Landing → Quiz Start**: % of visitors who click "VOTE"
2. **Quiz Started → Completed**: % who finish all 3 questions
3. **Results Viewed → Action Taken**: % who share, download cards, or register

### Viral Loop
- **Script Copy Rate**: % of users who copy TikTok scripts
- **Card Download Rate**: % of users who download at least one card
- **Most Popular Card Type**: Which card gets downloaded most
- **Most Popular Script Type**: Which script gets copied most

### Conversion
- **Voter Registration CTR**: % who click voter registration link
- **Ballot Search Rate**: % who search for their ballot
- **Org Click Rate**: % who click on organization links

### Content Performance
- **Identity Label Distribution**: Which labels are most common
- **Controversy Engagement**: % who react to hot takes
- **Share Rate**: % of users who share results

## Success Criteria

### Phase 1 (MVP - Week 2)
- ✅ 100 quiz completions
- 20+ TikTok scripts copied
- 10+ result cards downloaded

### Phase 2 (V1.1 - Week 4)
- 100+ quiz completions
- 5+ TikToks posted with #polytawk
- Leaderboard: 10+ users claim handle

### Phase 3 (V1.2 - Week 6)
- 1,000+ quiz completions
- 50+ TikToks posted
- 50+ voter registration clicks
- 10+ org clicks

### Long-term (Month 3)
- 10,000+ quiz completions
- First viral TikTok (100k+ views)
- 500+ voter registrations

## PostHog Dashboard Setup

### Recommended Insights

1. **User Flow Funnel**
   - Visualization: Funnel
   - Steps: Landing → simulation_started → simulation_completed → viral_share_clicked

2. **Content Virality**
   - Visualization: Bar chart
   - Events: tiktok_script_copied (grouped by script_type)
   - Events: card_download_completed (grouped by card_type)

3. **Conversion Tracking**
   - Visualization: Trend
   - Events: voter_registration_clicked, ballot_search, org_clicked

4. **Identity Labels**
   - Visualization: Pie chart
   - Event: identity_label_shown (grouped by label)

5. **Equity Distribution**
   - Visualization: Histogram
   - Event: simulation_completed (grouped by equity_percent bins)

## Privacy & Data Retention

- All data is anonymized
- No PII is collected
- PostHog retention: 90 days for free tier
- Zip codes stored only for ballot lookup, not tracked long-term
