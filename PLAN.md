# polytawk - TikTok Content Engine Strategy

## Vision

Transform polytawk from a one-time political quiz into a **TikTok content creation tool** that helps politically disengaged Gen Z users create viral videos about polytawk policy.

## Target Audience

**Primary**: TikTok users (18-24) who are:
- Politically disengaged but chronically online
- Looking for viral content ideas
- Want to look smart/funny/engaged without deep research
- Prefer visual content over reading policy papers

## Theory of Change

```
TikTok User discovers app
  → Takes quiz (3 questions, <1 min)
  → Gets personalized scripts + shareable cards
  → Creates TikTok with provided content
  → Their followers discover app
  → Repeat cycle
  → Users exposed to voter registration CTAs
  → Increased voter registration + turnout for polytawk policies
```

## Budget & Timeline

- **Time**: 100 hours (no funding)
- **Competitive advantage**: 100 more hours of focused development than competitors
- **Timeline**: 
  - MVP (40 hours): Weeks 1-2
  - V1.1 (30 hours): Weeks 3-4  
  - V1.2 (30 hours): Weeks 5-6

## Success Metrics

### Week 1
- 100 quiz completions
- 20 TikTok scripts copied
- 10 result cards downloaded

### Month 1
- 1,000 quiz completions
- 100 TikToks posted using #polytawk
- 50 voter registration clicks

### Month 3
- 10,000 quiz completions
- First viral TikTok (100k+ views)
- 500+ voter registrations

---

# Feature Roadmap

## Phase 1: Core Content Generation (40 hours) - MVP

### 1. Auto-Generated TikTok Scripts (15 hours)

**Goal**: Provide ready-to-use scripts that make users look smart/funny/controversial

**Features**:
- Generate 3 script types based on quiz results:
  1. **Hook Script**: Personal story angle
  2. **Controversy Script**: React to hot take
  3. **Challenge Script**: Competitive/participatory

**Example Templates**:

```
🎯 Hook Script:
"POV: You just found out your rent could've been frozen but people voted NO"
[Show your oligarchy score]
"Yeah...I got a [score]% on polytawk"
#polytawk #rentcrisis #genz

🔥 Controversy Script:  
"Not me getting called an [identity label] for voting [your way]"
[React to your hot take]
"But like...they're not wrong tho"
#politicaltiktok #hottake #based

💪 Challenge Script:
"I voted on 3 polytawk policies and got [equity]% equity"
"Drop your score in the comments 👇"
"Let's see who's really about that life"
#challenge #polytawk #vote
```

**Implementation**:
- [ ] Create `generateTikTokScripts()` in `packages/shared/index.js`
- [ ] Add "TikTok Scripts" section to results page
- [ ] Add "Copy Script" button for each script type
- [ ] Track which scripts get copied (PostHog event)
- [ ] Display scripts in mobile-friendly format

**Analytics to Track**:
- Script copy rate by type
- Which identity labels get most script copies
- User retention after copying script

---

### 2. Shareable Result Cards (20 hours)

**Goal**: Create TikTok-ready static images users can download and use in videos

**Features**:
- Generate 4 card types:
  1. **Score Card**: Emoji + identity label + percentile
  2. **Hot Take Card**: Controversy statement on gradient
  3. **Comparison Card**: "I got X%, what did you get?"
  4. **Challenge Card**: Call-to-action to beat your score

**Design Requirements**:
- 9:16 aspect ratio (TikTok vertical format)
- High contrast, readable on phone
- Bold typography
- Brand colors (Blue/Yellow)
- Subtle watermark: "polytawk.com"
- QR code to app (on score card only)

**Implementation**:
- [ ] Design 4 card templates using Canvas API or html2canvas
- [ ] Add "Download Cards" section to results page
- [ ] Generate unique cards based on user's results
- [ ] "Download as PNG" button for each card
- [ ] Optimize image size (<500KB)
- [ ] Track downloads by card type

**Tech Stack**:
- Use `html2canvas` for client-side image generation
- No backend needed (all client-side)

---

### 3. Copy-Paste Captions (5 hours)

**Goal**: Remove friction from posting by providing complete captions

**Features**:
- Generate caption based on results
- Include trending hashtags
- Personalize with user's score/label
- One-click copy

**Caption Template**:
```
📋 [Your hot take]
⚖️ I scored [X]% equity on polytawk
🎯 Link in bio to take it
#polytawk #genz #polytawk #vote2024 #equity #housing #vote
```

**Implementation**:
- [ ] Create `generateTikTokCaption()` function
- [ ] Add caption box below scripts
- [ ] "Copy Caption" button
- [ ] Include trending hashtag rotation
- [ ] Track caption copy rate

---

## Phase 2: Gamification (25 hours) - V1.1

### 4. Weekly Leaderboard (10 hours)

**Goal**: Create social proof and competition among creators

**Features**:
- "This week's top creators" ranked by shares
- "Hall of Fame" for all-time leaders
- User can claim their spot with TikTok handle
- Digital badges: "Top 1%", "100+ Shares", "Viral Creator"

**Implementation**:
- [ ] Set up simple share tracking (localStorage + optional backend)
- [ ] Create leaderboard UI on homepage
- [ ] Allow users to submit TikTok handle
- [ ] Generate badge images users can screenshot
- [ ] Reset weekly leaderboard every Monday

**Tracking Method**:
- Add `?ref=[userId]` to shared links
- Track referral clicks in PostHog
- Store counts in localStorage (or Supabase if scaling)

---

### 5. Trending Content Feed (10 hours)

**Goal**: Show what's working to inspire more content creation

**Features**:
- "Most copied scripts this week"
- "Hottest takes getting shared"
- Embedded TikTok posts using #polytawk

**Implementation**:
- [ ] Embed TikTok videos using TikTok Embed API
- [ ] Query #polytawk hashtag
- [ ] Display top 10 most-liked posts
- [ ] Track script usage via analytics
- [ ] Update feed daily

**Display**:
- Section on homepage: "See What Others Are Creating"
- Carousel of embedded TikToks
- Link to "View All" on TikTok

---

### 6. Daily Challenge (5 hours)

**Goal**: Give users a reason to return daily with new content angles

**Features**:
- New prompt/twist on the same 3 questions each day
- Different framing = different TikTok content opportunity

**Daily Themes**:
- **Monday**: "What if EVERYONE voted like you?"
- **Tuesday**: "Would your parents vote the same way?"
- **Wednesday**: "Predict how your state voted"
- **Thursday**: "Compare to a celebrity's likely votes"
- **Friday**: "What would this mean for your city?"
- **Weekend**: "Wildcard challenges"

**Implementation**:
- [ ] Create daily prompts (stored in config)
- [ ] Rotate based on `new Date().getDay()`
- [ ] Display daily challenge on homepage
- [ ] Generate challenge-specific scripts
- [ ] Track which days get most engagement

---

## Phase 3: Conversion Path (20 hours) - V1.2

### 7. Voter Registration CTA (8 hours)

**Goal**: Convert awareness into action (voter registration)

**Features**:
- Prominent CTA on results page: "Make it count IRL → Register to vote"
- Link to Vote.org with UTM tracking
- Show live counter: "X people registered via this app"
- Follow-up after registration (if possible)

**Implementation**:
- [ ] Add Vote.org widget to results page
- [ ] Create custom UTM parameters for tracking
- [ ] Track registration clicks in PostHog
- [ ] Display registration count on homepage
- [ ] Add to TikTok scripts ("Link to register in bio")

**Partner Integration**:
- Use Vote.org's embed widget (free)
- Track conversions via their API (if available)
- Potentially partner with other orgs (TurboVote, etc.)

---

### 8. Find Your Ballot (7 hours)

**Goal**: Localize the experience to user's actual ballot

**Features**:
- Enter zip code
- Show: "Here's what's on YOUR ballot about polytawk"
- Link to Ballotpedia for local measures
- Generate localized TikTok script about their ballot

**Implementation**:
- [ ] Add zip code input on results page
- [ ] Query Google Civic Info API or Ballotpedia API
- [ ] Filter for housing/transit/childcare keywords
- [ ] Display local measures with links
- [ ] Generate localized script mentioning specific props
- [ ] Track zip code submissions

**Tech**:
- Use Google Civic Information API (free tier: 25,000 requests/day)
- Fallback to Ballotpedia if API limit hit

---

### 9. Connect to Orgs (5 hours)

**Goal**: Channel engaged users to organizations doing real work

**Features**:
- Based on equity score, recommend 2-3 relevant orgs
- Different tiers get different recommendations
- Track which orgs get most clicks

**Recommendations**:

**High Equity (70%+)**:
- DSA (Democratic Socialists of America)
- YIMBY Action
- National Low Income Housing Coalition

**Moderate (50-69%)**:
- Local Action Lab
- Open Primaries
- National Housing Conference

**Low Equity (<50%)**:
- Educational resources instead of orgs
- Urban Institute housing research
- Policy explainers

**Implementation**:
- [ ] Create org recommendation logic
- [ ] Design org card UI (logo, description, link)
- [ ] Add affiliate/referral links where possible
- [ ] Track clicks to each org
- [ ] Update org list seasonally

---

## Phase 4: Analytics & Iteration (15 hours)

### 10. Track What Works (10 hours)

**Metrics to Track**:

**Engagement**:
- Quiz completion rate
- Time spent on results page
- Script copy rate (by type)
- Card download rate (by type)
- Caption copy rate

**Virality**:
- Share button clicks
- Referral traffic from TikTok
- #polytawk post count (manual tracking)
- Top performing scripts/cards

**Impact**:
- Voter registration clicks
- Org link clicks
- Zip code submissions (localization interest)

**Implementation**:
- [ ] Set up PostHog custom events for all actions
- [ ] Create analytics dashboard (PostHog or custom)
- [ ] Weekly automated report
- [ ] A/B test different script formats
- [ ] Iterate based on data

**Key Questions**:
- Which scripts perform best?
- Which identity labels drive most shares?
- What time of day do users engage most?
- Which cards are most downloaded?

---

### 11. Polish & Testing (5 hours)

**Goal**: Ensure quality experience on mobile (where TikTokers are)

**Tasks**:
- [ ] User test with 5-10 actual TikTok creators
- [ ] Fix any UX issues discovered
- [ ] Optimize mobile performance (< 2 second load)
- [ ] Test on iOS Safari and Android Chrome
- [ ] Ensure cards download correctly on mobile
- [ ] Fix any script formatting issues
- [ ] Verify all CTAs work

---

# Technical Stack

## No New Dependencies Required

**Image Generation**:
- `html2canvas` or Canvas API (browser native)
- Client-side generation (no backend needed)

**Analytics**:
- PostHog (already integrated)
- Custom events for all tracking

**Voter Registration**:
- Vote.org embed widget (free)
- UTM parameters for tracking

**Ballot Data**:
- Google Civic Information API (free tier)
- Ballotpedia as backup

**Storage**:
- localStorage for leaderboard (initially)
- Optional: Supabase/Firebase if scaling (free tiers)

**No backend needed for MVP** - Everything runs client-side

---

# Design Principles

1. **ZERO friction to create content**
   - Everything one-click copyable
   - No signup required
   - Works on mobile

2. **Make users look good**
   - Scripts are witty and timely
   - Cards are aesthetic and shareable
   - Identity labels are fun, not preachy

3. **Credit the app subtly**
   - Watermarks, not heavy branding
   - Let user's content shine
   - Hashtag does the work

4. **Track everything**
   - Every click, copy, download tracked
   - Data-driven iteration
   - Learn what works

5. **Mobile-first**
   - TikTokers are on phones
   - Test on actual devices
   - Fast load times critical

---

# Implementation Priority

## Week 1-2: MVP (40 hours)

**Must Have**:
- [x] Fix logical inconsistencies (completed)
- [ ] TikTok script generator
- [ ] Downloadable result cards
- [ ] Copy-paste captions
- [ ] Voter registration CTA

**Success Criteria**:
- User can complete quiz in <1 min
- User can copy script in 1 click
- User can download card in 1 click
- Mobile experience is smooth

---

## Week 3-4: V1.1 (30 hours)

**Add**:
- [ ] Weekly leaderboard
- [ ] Trending content feed
- [ ] Analytics dashboard

**Success Criteria**:
- 100+ quiz completions
- 5+ TikToks posted with hashtag
- Data showing which features work

---

## Week 5-6: V1.2 (30 hours)

**Add**:
- [ ] Daily challenge
- [ ] Ballot finder
- [ ] Org connections

**Success Criteria**:
- 1,000+ quiz completions
- 50+ TikToks posted
- 50+ voter reg clicks
- 10+ org clicks

---

# Marketing/Distribution Strategy

## Initial Seeding

1. **Post in TikTok creator communities**
   - Reddit: r/TikTokCreators, r/ContentCreators
   - Discord: Creator-focused servers
   - Twitter: Tag micro-influencers

2. **Direct outreach to political TikTokers**
   - Find creators already posting about housing/politics
   - DM them the tool
   - Offer to collaborate

3. **Partner with advocacy orgs**
   - Share tool with DSA chapters
   - YIMBY groups
   - College political clubs

## Organic Growth

1. **Hashtag strategy**
   - #polytawk (main)
   - #polytawk #genz #polytawk #vote2025
   - Piggyback on trending tags

2. **Leaderboard gamification**
   - Creators compete for top spots
   - Badges create status
   - Weekly features incentivize participation

3. **Network effects**
   - Every TikTok includes link to app
   - Viewers discover → take quiz → create content
   - Viral loop

---

# Risk Mitigation

## Potential Issues & Solutions

**Risk**: TikTok algorithm changes, hashtag gets suppressed
- **Mitigation**: Diversify to Instagram Reels, YouTube Shorts
- **Backup**: Email capture for updates

**Risk**: No one creates content
- **Mitigation**: Start with 10-20 hand-picked creators to seed
- **Opportunity**: Pay them small amounts ($20-50) if needed

**Risk**: Scripts feel inauthentic
- **Mitigation**: User test extensively, iterate based on feedback
- **Opportunity**: Let users submit their own scripts

**Risk**: Technical issues on mobile
- **Mitigation**: Extensive mobile testing before launch
- **Opportunity**: Progressive web app (PWA) for better mobile UX

---

# Future Considerations (Beyond 100 hours)

## If This Works

**Scale Features**:
- Backend for real leaderboard tracking
- User accounts (optional)
- More daily challenges
- Longer quiz (10-15 questions)
- Multiple quiz topics (climate, healthcare, etc.)

**Revenue Opportunities**:
- Affiliate partnerships with advocacy orgs
- Sponsored content from aligned candidates
- Premium features (custom branding for orgs)

**Platform Expansion**:
- Instagram Reels support
- YouTube Shorts support  
- Threads integration
- WhatsApp sharing

**Data Products**:
- Anonymized insights for campaigns
- Geographic voting patterns
- Demographic analysis
- Sell to research orgs

---

# Open Questions

1. **Content Moderation**: How do we handle if anti-polytawk people use the tool?
   - Answer: Let them. More engagement = more visibility for the hashtag

2. **Scale**: What if we get 10,000 users in week 1?
   - Answer: Everything is client-side, should scale fine. Monitor API rate limits.

3. **Brand Evolution**: Does "polytawk" limit us to housing policy?
   - Answer: For now, yes. Focus. Can expand later.

4. **Partnerships**: Should we partner with specific orgs from the start?
   - Answer: Soft partnerships (link to them). Formal ones take time.

---

# Next Steps

1. **Review this plan** with stakeholders
2. **Prioritize MVP features** (Week 1-2 focus)
3. **Set up development environment**
4. **Begin implementation** with TikTok script generator
5. **User test early and often**

---

**Last Updated**: November 25, 2025 
**Owner**: 
**Status**: Planning Complete → Ready for Implementation
