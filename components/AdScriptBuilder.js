import { useState } from "react";

// ─── AD MODES ─────────────────────────────────────────────────────────────────
const AD_MODES = {
  direct: { id: "direct", label: "Direct Offer", emoji: "🎯", tagline: "Convert viewers into paying clients.", description: "The goal is a sale or a booked call. You're asking someone to invest money or time. Needs the most trust, the strongest proof, and a clear risk reversal. Best for warm or solution-aware audiences.", bestFor: "Stage 3-5 audiences. Retargeting, warm followers, people who already know you or your niche.", notFor: "Cold traffic who've never heard of you. Pitching too early is the #1 reason ads don't convert.", color: "#e8500a", recommendedStages: [3, 4, 5] },
  follower: { id: "follower", label: "Follow Me", emoji: "👥", tagline: "Grow your audience with the right people.", description: "The goal is the follow. No pitch, no offer, no risk reversal. You're selling your content and your perspective. The CTA is always: follow me for daily content on [their pain or desired outcome].", bestFor: "Stage 1-2 cold audiences. People who feel the pain but aren't ready to buy. Build the audience first, sell later.", notFor: "People who are ready to buy. Don't waste a hot lead on a follow ad.", color: "#4a7aff", recommendedStages: [1, 2] },
  indirect: { id: "indirect", label: "Indirect Offer", emoji: "🎁", tagline: "Give value first. Earn the right to sell later.", description: "The goal is an opt-in, a free training claim, or a lead magnet download. Lower commitment than a direct offer so it works on colder audiences. The risk reversal is implicit: it's free. Your job is making the freebie feel urgent and valuable.", bestFor: "Stage 2-3 audiences. Cold traffic who feel the pain and are open to solutions but aren't ready to invest yet.", notFor: "Stage 4-5 audiences who already know you. Don't send warm leads to a freebie when they're ready for the real thing.", color: "#4a8a4a", recommendedStages: [2, 3] }
};

const AWARENESS_STAGES = [
  { id: "unaware", level: 1, label: "Unaware", tagline: "They don't know they have a problem yet.", description: "Your audience hasn't connected their situation to a problem that needs solving. They're living with a hidden pain they haven't named yet.", whoLivesHere: "The broadest possible audience. Scrollers who've never searched for a solution, never complained about the problem out loud, but are quietly living it every day.", whenToUse: "Rarely worth advertising here unless you have a large budget and a long-term brand play. Most small businesses can't afford the slow ROI. Follower ads work better here than offers.", commonMistake: "Jumping straight to a solution. If they don't know they have a problem, an offer means nothing.", hookStrategy: "Lead with a bold, provocative statement about their world. Make them feel seen before they know why.", bestModes: ["follower"] },
  { id: "problem_aware", level: 2, label: "Problem Aware", tagline: "They feel the pain, but don't know a solution exists.", description: "They know something is wrong. They're frustrated, stuck, or burned out. But they haven't started searching for answers yet.", whoLivesHere: "The majority of your cold traffic on Meta. People scrolling their feed who feel the problem daily but haven't gone looking for a fix. Highest volume stage.", whenToUse: "Where most of your cold ad spend should go. Lead with the pain, introduce the idea that a solution exists. Follower ads and indirect offers work best here.", commonMistake: "Leading with your offer or credentials. They don't care yet. They need to feel heard first.", hookStrategy: "Name the exact pain they feel every day. Agitate it so they lean in, then introduce the idea that a solution exists.", bestModes: ["follower", "indirect"] },
  { id: "solution_aware", level: 3, label: "Solution Aware", tagline: "They know solutions exist, but haven't found you.", description: "They've been looking. They've maybe tried a few things. They're actively comparing options and in research mode.", whoLivesHere: "Warmer cold traffic. They've Googled the problem, followed accounts in the niche, maybe bought something that didn't work. High intent, still wide audience.", whenToUse: "The sweet spot for direct response. Your unique mechanism matters most here. Indirect offers also work well to capture leads who aren't quite ready to buy.", commonMistake: "Making the same claims as everyone else. A solution-aware buyer will scroll past if your ad sounds like every other coach.", hookStrategy: "Lead with your unique mechanism or method. Why is YOUR approach different from everything else they've seen?", bestModes: ["direct", "indirect"] },
  { id: "product_aware", level: 4, label: "Product Aware", tagline: "They know you, but haven't committed.", description: "They've seen your content or your offer. Something is stopping them. An objection, doubt, timing, or price.", whoLivesHere: "Retargeting audiences. People who've watched your videos, visited your page, or clicked an ad but didn't convert. Smaller audience, significantly higher intent.", whenToUse: "Retargeting campaigns. Much higher conversion rates. This is where you resolve the objection and make the decision easy. Direct offer only.", commonMistake: "Re-explaining what you do. They already know. They need their objection resolved and a reason to act now.", hookStrategy: "Address the objection head-on. Name the thing stopping them, then dismantle it with proof and risk reversal.", bestModes: ["direct"] },
  { id: "most_aware", level: 5, label: "Most Aware", tagline: "They know you and your offer. They just need a reason to act now.", description: "They're warm. They've been following you, they trust you. They just need urgency, a new result, or a final push.", whoLivesHere: "Your existing community, email list, past buyers. Tiny audience, highest conversion rate of any stage.", whenToUse: "Launches, promos, re-engagement. Keep it short. Get straight to the reason to act now. Skip all education.", commonMistake: "Over-explaining to someone who already knows. Length kills urgency here. Get in, make the case, get out.", hookStrategy: "Lead straight to the offer. Use scarcity, urgency, or a new result. Don't re-explain what you do.", bestModes: ["direct"] }
];

const SOPHISTICATION_LEVELS = [
  { id: "low", label: "Fresh Market", description: "Your niche hasn't seen many offers like yours. A simple, direct claim works.", hookMod: "Make a bold, direct promise. The market hasn't heard it yet, so it lands hard." },
  { id: "medium", label: "Competitive Market", description: "Your niche has seen similar offers. You need a unique mechanism to stand out.", hookMod: "Lead with what makes your method different. Name your system. Contrast it against the norm." },
  { id: "high", label: "Saturated Market", description: "Your niche has seen everything. Jaded buyers need a completely new angle.", hookMod: "Lead with a counterintuitive idea, a surprising result, or a disruptive belief. Avoid any claim they've heard before." }
];

const AD_DURATIONS = [
  { id: "30s", label: "30 seconds", wordCount: "75–100 words", description: "Hook + one punch + CTA. Zero fat. Best for retargeting or most-aware audiences.", spokenNotes: "About 3 sentences per section max. Every word earns its place." },
  { id: "60s", label: "60 seconds", wordCount: "140–160 words", description: "The sweet spot for cold traffic. Full framework with tight execution.", spokenNotes: "One breath per idea. Keep sentences under 15 words. No padding." },
  { id: "90s", label: "90 seconds", wordCount: "210–240 words", description: "Room for a full story or two proof points. Best for HSO or story frameworks.", spokenNotes: "Build the story in short beats. No sentence should need a second read." },
  { id: "2min", label: "2 minutes", wordCount: "270–300 words", description: "Long-form trust-builder. Only for product-aware audiences or high-ticket offers.", spokenNotes: "Every section must earn the viewer's attention. Cut anything that doesn't move them forward." }
];

const FRAMEWORKS = {
  direct_short: { id: "direct_short", mode: "direct", label: "Direct Offer (Short)", description: "Gets to the offer fast. Best for warm or solution-aware audiences.", steps: [
    { id: "hook", label: "Hook", tip: "Stop the scroll in 3 seconds. Call out your exact target or their #1 pain. Never open with 'I'.", placeholder: "e.g. If you're a PT stuck charging $60 an hour with no way to scale..." },
    { id: "promise_risk", label: "Promise + Risk Reversal", tip: "Bold specific promise first. Then kill the risk with a guarantee.", placeholder: "e.g. I'll get you signing 3 new online clients a month, or you don't pay." },
    { id: "qualify", label: "Qualify", tip: "Who is this for and who isn't it for? Filtering out the wrong people increases close rate.", placeholder: "e.g. This is for PTs already working with clients who want to move online..." },
    { id: "proof", label: "Proof", tip: "One strong result. Real name, specific outcome, timeframe. Numbers beat adjectives.", placeholder: "e.g. Last month, James went from 4 clients to 14 in 8 weeks." },
    { id: "cta", label: "Call to Action", tip: "One action only. See the examples below for the right language based on where you're sending them.", placeholder: "Write your CTA here, e.g. Click the link below to apply for a free strategy call...", ctaOptions: "direct" }
  ]},
  direct_long: { id: "direct_long", mode: "direct", label: "Direct Offer (Long)", description: "More trust-building before the ask. Best for higher-ticket or product-aware audiences.", steps: [
    { id: "hook", label: "Hook", tip: "Call out the exact person you want watching. Make it feel personal.", placeholder: "e.g. If you're a PT tired of trading hours for dollars..." },
    { id: "introduce_yourself", label: "Introduce Yourself", tip: "One or two sentences. Who you are and why you're credible.", placeholder: "e.g. My name is Jake, I've helped 50+ PTs go online..." },
    { id: "promise_risk", label: "Promise + Risk Reversal", tip: "Big promise first. Kill the risk immediately.", placeholder: "e.g. I can show you how to sign 3 new online clients a month, or I'll refund you." },
    { id: "introduce_method", label: "Introduce Your Method", tip: "Name your system specifically. What is it actually called? What are the exact steps or phases? Don't say 'a proven system', name the thing.", placeholder: "e.g. The [Name] Method has 3 phases: [Phase 1], [Phase 2], [Phase 3]...", specificity: true },
    { id: "qualify", label: "Qualify", tip: "Be honest about who this is and isn't for. It builds trust and improves lead quality.", placeholder: "e.g. This is for PTs already working with clients who want to move online..." },
    { id: "proof_1", label: "Proof #1", tip: "Strong client result. Specific name, numbers, timeframe.", placeholder: "e.g. James came to me with 3 local clients and no online presence..." },
    { id: "proof_2", label: "Proof #2", tip: "Second result, different angle or client type.", placeholder: "e.g. Sarah was on the verge of quitting PT altogether..." },
    { id: "cta", label: "Primary CTA", tip: "Clear, low friction, one action. Match the verbal CTA to wherever the ad is sending them.", placeholder: "Write your primary CTA here...", ctaOptions: "direct" },
    { id: "cta_2", label: "Secondary CTA", tip: "Reinforce the same action a different way. Never introduce a second destination.", placeholder: "e.g. If you've been on the fence, now is the time. The link is below.", ctaOptions: "direct_secondary" }
  ]},
  hso_direct: { id: "hso_direct", mode: "direct", label: "HSO (Hook, Story, Offer)", description: "Builds trust through story before selling. Great for problem-aware or product-aware audiences.", steps: [
    { id: "hook", label: "Hook", tip: "A bold statement, relatable situation, or surprising moment.", placeholder: "e.g. I almost quit coaching before I figured this out..." },
    { id: "story_before", label: "The Before", tip: "Paint the before state in their words. The pain, frustration, the stuck feeling.", placeholder: "e.g. I was posting every day, grinding, and had almost nothing to show for it..." },
    { id: "story_turn", label: "The Turning Point", tip: "The moment of change. Name the actual thing you discovered or did, not a vague 'shift'.", placeholder: "e.g. Then I [specific action] and within [timeframe] I [specific result]...", specificity: true },
    { id: "story_after", label: "The After", tip: "What does life look like now? Be specific. Numbers, lifestyle, actual changes.", placeholder: "e.g. Now I sign [number] clients every month, earn [specific amount]..." },
    { id: "offer", label: "Offer + CTA", tip: "Bridge the story to your offer naturally, then close with the CTA.", placeholder: "e.g. That's why I built [your method]. Click the link below and let's talk...", ctaOptions: "direct" }
  ]},
  pas_direct: { id: "pas_direct", mode: "direct", label: "PAS (Problem, Agitate, Solution)", description: "Meets them in their pain and leads to relief. Great for problem or solution-aware audiences.", steps: [
    { id: "problem", label: "Problem", tip: "Name the exact problem your audience is experiencing right now.", placeholder: "e.g. Most PTs are stuck trading hours for dollars with no way to scale..." },
    { id: "agitate", label: "Agitate", tip: "Make the problem feel real and costly. Don't lecture, just reflect the truth.", placeholder: "e.g. You're exhausted, you can't take holidays without your income dropping..." },
    { id: "solution", label: "Solution + CTA", tip: "Name your method specifically. Make the transition feel inevitable, then close with the CTA.", placeholder: "e.g. The [Method Name] solves this by [specific mechanism]. Click the link below.", ctaOptions: "direct", specificity: true }
  ]},
  big_domino: { id: "big_domino", mode: "direct", label: "Big Domino", description: "One core belief that, if established, makes your offer inevitable. Best for skeptical or unaware audiences.", steps: [
    { id: "domino_belief", label: "The One Belief", tip: "What single belief, if held, would make saying yes to your offer completely obvious?", placeholder: "e.g. If you believe [specific claim], then [your offer] becomes the obvious next step..." },
    { id: "challenge_old_belief", label: "Challenge the Old Belief", tip: "Name the false belief specifically and dismantle it with a real example or number.", placeholder: "e.g. Most PTs think you need [specific false belief], but I had [specific counter-proof]..." },
    { id: "new_story", label: "Build the New Story", tip: "Name the actual thing that works, not just 'a better approach'.", placeholder: "e.g. What you actually need is [specific thing 1], [specific thing 2], and [specific thing 3]...", specificity: true },
    { id: "cta", label: "CTA", tip: "Now that the belief is shifted, the action should feel like a natural conclusion.", placeholder: "e.g. If that shifted something for you, click the link below and let's talk.", ctaOptions: "direct" }
  ]},
  aida_direct: { id: "aida_direct", mode: "direct", label: "AIDA", description: "Classic four-part arc. Works across all awareness levels with the right hook.", steps: [
    { id: "attention", label: "Attention", tip: "Grab them in the first second. Bold claim, surprising stat, provocative question.", placeholder: "e.g. Most PTs who try to go online fail in the first 6 months..." },
    { id: "interest", label: "Interest", tip: "Build curiosity. Tease what's coming. Why should they keep watching?", placeholder: "e.g. But the ones who succeed all have one thing in common..." },
    { id: "desire", label: "Desire", tip: "Paint the outcome in vivid, specific terms. Numbers, lifestyle, real changes.", placeholder: "e.g. Imagine signing [specific number] new clients every month, earning [specific amount]..." },
    { id: "action", label: "Action", tip: "One clear instruction matched to your destination.", placeholder: "Write your CTA here...", ctaOptions: "direct" }
  ]},
  follow_value_promise: { id: "follow_value_promise", mode: "follower", label: "Value Promise", description: "The simplest follow ad. Name who you help, the pain you speak to, what you post about, and ask for the follow.", steps: [
    { id: "hook", label: "Hook", tip: "Call out the exact person you want following you.", placeholder: "e.g. If you're a PT trying to figure out how to go online..." },
    { id: "pain_desire", label: "Their Pain or Desired Outcome", tip: "Name the specific thing they're struggling with or the outcome they want.", placeholder: "e.g. You're probably grinding through 50-hour weeks wondering if there's a better way..." },
    { id: "content_promise", label: "What You Post About", tip: "Tell them exactly what they'll get if they follow you. Specific topics, frequency, format.", placeholder: "e.g. I post daily on how to build an online coaching business without a big following..." },
    { id: "credibility", label: "Why You (Brief)", tip: "One sentence of credibility. Use a specific number or result.", placeholder: "e.g. I've helped 50+ PTs go from local coaching to full-time online income in under 90 days." },
    { id: "cta_follow", label: "Follow CTA", tip: "The only CTA is the follow. Tie it back to their pain or desired outcome.", placeholder: "Write your follow CTA here...", ctaOptions: "follower" }
  ]},
  follow_contrarian: { id: "follow_contrarian", mode: "follower", label: "Contrarian Hook", description: "Challenge a common belief in your niche. Position yourself as the person who tells the truth others won't.", steps: [
    { id: "hook", label: "Contrarian Hook", tip: "Challenge something your audience believes that's keeping them stuck.", placeholder: "e.g. You don't need [specific widely-held belief] to [desired outcome]..." },
    { id: "why_theyre_wrong", label: "Why the Common Belief Is Wrong", tip: "Back up your contrarian claim with a specific reason or example.", placeholder: "e.g. Most coaches [specific mistake]. I [specific counter-example with numbers]..." },
    { id: "what_actually_works", label: "What Actually Works", tip: "Name the specific thing, not 'a different approach'. Include a result if you have one.", placeholder: "e.g. What actually works is [specific method]. I [specific result with numbers]...", specificity: true },
    { id: "content_promise", label: "Content Promise", tip: "What do you post about? Tie it directly to the belief you just challenged.", placeholder: "e.g. I post daily on the stuff nobody else in this space is talking about..." },
    { id: "cta_follow", label: "Follow CTA", tip: "The only CTA is the follow.", placeholder: "Write your follow CTA here...", ctaOptions: "follower" }
  ]},
  follow_story: { id: "follow_story", mode: "follower", label: "Story to Follow", description: "A mini HSO where the offer is your account. Best for audiences who need to see themselves in you first.", steps: [
    { id: "hook", label: "Hook", tip: "Open on a moment or before state your audience will immediately recognise.", placeholder: "e.g. Two years ago I was working 60-hour weeks and couldn't afford a holiday..." },
    { id: "story", label: "The Story", tip: "Short version of your journey. Specific numbers in both before and after. No vague 'everything changed'.", placeholder: "e.g. I went from [specific before] to [specific after] in [specific timeframe] by [specific thing]...", specificity: true },
    { id: "bridge", label: "The Bridge", tip: "Connect your story to what you now post about.", placeholder: "e.g. Now I document everything I learn about building an online coaching business..." },
    { id: "content_promise", label: "Content Promise", tip: "What will they get from following you? Specific topics, daily or regular posting.", placeholder: "e.g. I post daily on offers, outreach, and building an online income as a PT..." },
    { id: "cta_follow", label: "Follow CTA", tip: "The only CTA is the follow.", placeholder: "Write your follow CTA here...", ctaOptions: "follower" }
  ]},
  follow_content_preview: { id: "follow_content_preview", mode: "follower", label: "Content Preview", description: "Show them a real sample of your content or thinking. Let the value speak for itself, then ask for the follow.", steps: [
    { id: "hook", label: "Hook", tip: "Open with the most valuable thing you're about to share.", placeholder: "e.g. Here are the 3 things that helped me go from 5 to 20 online clients..." },
    { id: "value_content", label: "The Value", tip: "Deliver the actual content. Specific, actionable. Name the steps directly, don't tease.", placeholder: "e.g. First: [specific tactic]. Second: [specific tactic]. Third: [specific tactic]...", specificity: true },
    { id: "tie_to_content", label: "Tie It to Your Content", tip: "Tell them this is what you post about regularly.", placeholder: "e.g. This is the kind of thing I share every day on my page..." },
    { id: "cta_follow", label: "Follow CTA", tip: "The only CTA is the follow.", placeholder: "Write your follow CTA here...", ctaOptions: "follower" }
  ]},
  indirect_pas: { id: "indirect_pas", mode: "indirect", label: "PAS to Freebie", description: "Name the pain, agitate it, then present your free resource as the relief. Best for cold problem-aware audiences.", steps: [
    { id: "hook", label: "Hook", tip: "Name the pain immediately. Cold audiences need to feel seen before they'll care.", placeholder: "e.g. Most PTs have no idea how to sign their first online client..." },
    { id: "agitate", label: "Agitate", tip: "Make the cost of the problem feel real.", placeholder: "e.g. So they post content, get some likes, and wonder why nobody's buying..." },
    { id: "introduce_freebie", label: "Introduce the Freebie", tip: "Name your free resource specifically. Give it a title. Not 'a free guide', but 'The [Specific Name] that gives you [specific result]'.", placeholder: "e.g. That's why I put together a free [type] called [Specific Name], which [specific outcome]...", specificity: true },
    { id: "freebie_value", label: "What They'll Get", tip: "Two or three specific outcomes from the freebie. Not features, outcomes.", placeholder: "e.g. Inside you'll learn: [specific outcome 1], [specific outcome 2], [specific outcome 3]..." },
    { id: "cta_indirect", label: "CTA", tip: "One action. As low friction as possible. Match to your destination.", placeholder: "Write your CTA here, e.g. Click the link below to get instant access...", ctaOptions: "indirect" }
  ]},
  indirect_direct_value: { id: "indirect_direct_value", mode: "indirect", label: "Direct Value Offer", description: "Lead straight with the free resource and its value. Best for solution-aware audiences who are actively looking.", steps: [
    { id: "hook", label: "Hook", tip: "Lead with the free thing and what it does. Name it specifically.", placeholder: "e.g. I just put together a free [type] called [Name] that [specific outcome]..." },
    { id: "who_its_for", label: "Who It's For", tip: "Qualify them. Make them feel like it was built specifically for them.", placeholder: "e.g. This is specifically for [exact person] who [specific situation]..." },
    { id: "what_inside", label: "What's Inside", tip: "Specific outcomes only. Not 'you'll learn about X', but 'you'll walk away with Y'.", placeholder: "e.g. You'll walk away with [specific deliverable 1], [specific deliverable 2], [specific deliverable 3]...", specificity: true },
    { id: "credibility", label: "Why Trust You", tip: "One sentence of proof. A specific result. No vague credentials.", placeholder: "e.g. I've used this system to help [specific number] [type of person] achieve [specific result]." },
    { id: "cta_indirect", label: "CTA", tip: "One frictionless action. Match to your destination.", placeholder: "Write your CTA here, e.g. Click the link below to grab the free training...", ctaOptions: "indirect" }
  ]},
  indirect_hso: { id: "indirect_hso", mode: "indirect", label: "HSO to Resource", description: "Use a story to earn trust, then present your free resource as the natural next step.", steps: [
    { id: "hook", label: "Hook", tip: "Open on a relatable moment or surprising result.", placeholder: "e.g. I spent 18 months trying to go online before I figured out what was actually missing..." },
    { id: "story", label: "The Story", tip: "Brief, specific, relatable. Numbers in both the before and after.", placeholder: "e.g. I went from [specific before with numbers] to [specific after with numbers] by [specific thing]...", specificity: true },
    { id: "lesson", label: "The Lesson", tip: "One clear, specific insight that bridges your story to the freebie.", placeholder: "e.g. The lesson: you don't need [false assumption], you need [specific truth]..." },
    { id: "introduce_freebie", label: "Introduce the Freebie", tip: "Present your free resource by its specific name.", placeholder: "e.g. I took everything I learned and built it into a free [type] called [Specific Name]...", specificity: true },
    { id: "cta_indirect", label: "CTA", tip: "One action. Simple and immediate.", placeholder: "Write your CTA here, e.g. Click the link below and get instant access...", ctaOptions: "indirect" }
  ]}
};

const CTA_OPTIONS = {
  direct: { label: "Direct Offer CTA Options", note: "Pick the language that matches where you're sending them.", groups: [
    { heading: "Sending to a booking or application page", options: ["Click the link below to apply for a free strategy call.", "Hit the link below and book your free call today.", "Click learn more below and let's get you started.", "The link below will take you straight to my calendar. Book a time that works for you.", "Click below, fill out the short application, and we'll talk this week."] },
    { heading: "Sending to a VSL or sales page", options: ["Click the link below and watch the free training that breaks down exactly how this works.", "Hit learn more below and I'll walk you through the whole thing.", "Click below and watch the video. It's about 20 minutes and worth every second.", "The full breakdown is in the link below. Click learn more and go watch it now."] },
    { heading: "Organic post (comment keyword mechanic)", options: ["Comment [KEYWORD] below and I'll send you the details.", "Drop [KEYWORD] in the comments and I'll reach out directly.", "Comment [KEYWORD] and I'll send everything you need to get started.", "Type [KEYWORD] below and I'll be in your DMs within the hour."] },
    { heading: "Sending to a DM or Messenger flow", options: ["Click the link below and send me a message. Let's talk.", "Hit the button below and we can figure out if this is the right fit for you.", "Click below and shoot me a message. I reply to everyone personally."] }
  ]},
  direct_secondary: { label: "Secondary CTA Options", note: "Reinforce the same destination. Never introduce a second destination.", groups: [
    { heading: "Urgency and scarcity", options: ["Spots are limited and they go fast. The link is below.", "I only take a handful of new clients each month. If you're serious, click below now.", "This won't be open for long. Click the link below while it's still available."] },
    { heading: "Address the hesitation", options: ["If you've been sitting on the fence, this is your sign. The link is below.", "If you're not sure if this is right for you, click below anyway. The worst that happens is you find out it's not.", "Still on the fence? Click below and watch the training. You can decide after."] },
    { heading: "Simple repeat", options: ["The link is below. Go click it.", "Everything you need is in the link below.", "Click below and let's talk."] }
  ]},
  follower: { label: "Follow Me CTA Options", note: "The only goal is the follow. Tie it directly back to their pain or desired outcome.", groups: [
    { heading: "Tie the follow to their pain or outcome", options: ["I post every day about [their pain or desired outcome]. If that sounds like you, follow me.", "Follow me if you're trying to [desired outcome] without [the thing they want to avoid].", "Every day I share [content topic]. If that's what you're working on, hit follow.", "If [pain point] is something you deal with, follow me. That's exactly what I talk about every day."] },
    { heading: "Simple and direct", options: ["Follow me and I'll show you exactly how to do it.", "Hit follow. I post this level every single day.", "Follow me for more of this.", "If that was useful, follow me. There's a lot more where that came from."] },
    { heading: "Contrarian or bold", options: ["Follow me if you want the version of this nobody else is showing you.", "Follow me if you're done with the recycled advice.", "If you want the truth about [topic], follow me. I post it daily."] }
  ]},
  indirect: { label: "Indirect Offer CTA Options", note: "Make the action sound easy and the value sound immediate.", groups: [
    { heading: "Paid ad, sending to a landing page", options: ["Click the link below to get free access.", "Hit learn more below and grab the free training.", "Click below and get instant access. It's completely free.", "The link below takes you straight to it. Click learn more and grab your copy.", "Click below, drop your email, and I'll send it straight to you."] },
    { heading: "Organic post (comment keyword mechanic)", options: ["Comment [KEYWORD] below and I'll send it straight to your DMs.", "Drop [KEYWORD] in the comments and I'll send you the link.", "Comment [KEYWORD] and I'll get it to you within the hour.", "Type [KEYWORD] below and I'll send it over. It's free."] },
    { heading: "Add what happens next", options: ["Click below, grab the free training, and you'll have the full framework in under 20 minutes.", "Hit learn more, drop your email, and I'll send it over immediately.", "Click the link below. It takes 30 seconds to get access and about 20 minutes to go through."] }
  ]}
};

const FRAMEWORKS_BY_MODE = {
  direct: ["direct_short", "direct_long", "hso_direct", "pas_direct", "big_domino", "aida_direct"],
  follower: ["follow_value_promise", "follow_contrarian", "follow_story", "follow_content_preview"],
  indirect: ["indirect_pas", "indirect_direct_value", "indirect_hso"]
};

const RECOMMENDED = {
  direct: { unaware: ["big_domino", "aida_direct"], problem_aware: ["pas_direct", "hso_direct", "aida_direct"], solution_aware: ["direct_short", "direct_long", "pas_direct"], product_aware: ["direct_long", "direct_short", "hso_direct"], most_aware: ["direct_short", "direct_long"] },
  follower: { unaware: ["follow_contrarian", "follow_story"], problem_aware: ["follow_value_promise", "follow_story", "follow_contrarian"], solution_aware: ["follow_value_promise", "follow_content_preview"], product_aware: ["follow_content_preview", "follow_value_promise"], most_aware: ["follow_content_preview"] },
  indirect: { unaware: ["indirect_hso", "indirect_pas"], problem_aware: ["indirect_pas", "indirect_hso"], solution_aware: ["indirect_direct_value", "indirect_pas"], product_aware: ["indirect_direct_value"], most_aware: ["indirect_direct_value"] }
};

// ─── SHARED UI COMPONENTS (outside main component to prevent remount) ─────────
const PageWrap = ({ children }) => (
  <div style={{ minHeight: "100vh", background: "#0d0d0d", color: "#f0ede8", fontFamily: "'Inter', system-ui, sans-serif", paddingBottom: 60 }}>
    {children}
  </div>
);

const TopBar = ({ title, onBack, right }) => (
  <div style={{ background: "#111", borderBottom: "1px solid #1e1e1e", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
    <button onClick={onBack} style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 13, padding: 0 }}>← Back</button>
    <div style={{ fontSize: 13, fontWeight: 600, color: "#888" }}>{title}</div>
    <div style={{ fontSize: 11, color: "#444", minWidth: 50, textAlign: "right" }}>{right || ""}</div>
  </div>
);

const Eyebrow = ({ text }) => (
  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", color: "#e8500a", textTransform: "uppercase", marginBottom: 8 }}>{text}</div>
);

const PrimaryBtn = ({ onClick, disabled, children }) => (
  <button onClick={onClick} disabled={disabled} style={{ width: "100%", padding: "16px", background: disabled ? "#1a1a1a" : "linear-gradient(135deg, #e8500a, #c43a00)", border: "none", color: disabled ? "#444" : "#fff", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: disabled ? "default" : "pointer", letterSpacing: "-0.2px", transition: "all 0.2s" }}>{children}</button>
);

const GhostBtn = ({ onClick, children }) => (
  <button onClick={onClick} style={{ width: "100%", padding: "14px", background: "#111", border: "1px solid #1e1e1e", color: "#888", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>{children}</button>
);

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function AdScriptBuilder() {
  const [view, setView] = useState("mode");
  const [adMode, setAdMode] = useState(null);
  const [awarenessStage, setAwarenessStage] = useState(null);
  const [sophistication, setSophistication] = useState(null);
  const [dominantEmotion, setDominantEmotion] = useState("");
  const [adDuration, setAdDuration] = useState(null);
  const [selectedFramework, setSelectedFramework] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [generatedHooks, setGeneratedHooks] = useState([]);
  const [selectedHook, setSelectedHook] = useState(null);
  const [generatedScript, setGeneratedScript] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [apiError, setApiError] = useState(null);

  const mode = adMode ? AD_MODES[adMode] : null;
  const stage = awarenessStage ? AWARENESS_STAGES.find(s => s.id === awarenessStage) : null;
  const soph = sophistication ? SOPHISTICATION_LEVELS.find(s => s.id === sophistication) : null;
  const duration = adDuration ? AD_DURATIONS.find(d => d.id === adDuration) : null;
  const framework = selectedFramework ? FRAMEWORKS[selectedFramework] : null;
  const steps = framework?.steps || [];
  const step = steps[currentStep];

  function reset() {
    setView("mode"); setAdMode(null); setAwarenessStage(null);
    setSophistication(null); setDominantEmotion(""); setAdDuration(null);
    setSelectedFramework(null); setCurrentStep(0); setAnswers({});
    setGeneratedHooks([]); setSelectedHook(null);
    setGeneratedScript(""); setApiError(null); setLoadingMessage("");
  }

  function startBuild(fwId) {
    setSelectedFramework(fwId); setCurrentStep(0); setAnswers({});
    setGeneratedHooks([]); setSelectedHook(null);
    setGeneratedScript(""); setView("build");
  }

  function handleNext() {
    if (currentStep < steps.length - 1) setCurrentStep(c => c + 1);
    else generateHooks();
  }

  function handleBack() {
    if (currentStep > 0) setCurrentStep(c => c - 1);
    else setView("framework");
  }

  function buildBaseContext() {
    const fw = FRAMEWORKS[selectedFramework];
    const stepDetails = fw.steps.map(s => `${s.label}: ${answers[s.id] || "(not provided)"}`).join("\n");
    return { fw, stepDetails };
  }

  function buildHumanizerRules() {
    return `HUMANIZER RULES — strip every one of these AI writing patterns from the output:

A. STAGING INSTEAD OF STATING
1. No "not X but Y" contrasts. State the point directly.
2. No one-line closers or dramatic fragments that repeat what was just said. Cut them.
3. No staged run-ups before the point. No "let's dive in", "honestly?", "here's the thing". Start on the point.

B. RHYTHM BY RULE
4. No forced triads. Use the number of examples the meaning actually needs.
5. No repeated sentence openings back to back.
6. No dashes as a universal connector. Commas, periods, colons only.
7. No stacked qualifiers. Keep one qualifier or none.

C. INFLATION AND BORROWED AUTHORITY
8. Never use these words: delve, testament, landscape, showcasing, nestled, vibrant, tapestry, pivotal, beacon, foster, realm, embark, elevate, leverage, synergy, seamless, robust, cutting-edge, transformative, game-changer, innovative, holistic, dynamic, bespoke, empower, spearhead, unveil, groundbreaking, paradigm, cultivate, revolutionize, underscore, resonate.
9. No inflated significance. End on the last concrete fact.
10. No shallow -ing riders. "symbolizing... reflecting... showcasing" — cut them.
11. No sales language. State what the thing actually is.

D. CHAT LEFTOVERS
12. No chatbot residue. No "great question", "I hope this helps", "certainly".
13. No knowledge-limit disclaimers or hedging guesses.`;
  }

  const modeInstructions = {
    direct: `This is a DIRECT OFFER ad. The goal is a sale, a booked call, or an application. Include a strong risk reversal somewhere in the script. For the CTA: use the exact CTA the user has written in their inputs. If they haven't written one, use natural spoken language that points to the link below. Do NOT use comment keyword mechanics like "comment FREEDOM" unless the user explicitly wrote that in their CTA input.`,
    follower: `This is a FOLLOW ME ad. There is NO offer, NO pitch, NO product mention, and NO risk reversal. The entire goal is the follow. Use the CTA the user has written in their inputs. If they haven't written one, use a natural follow CTA that ties directly back to their pain or desired outcome. This is not a sales ad.`,
    indirect: `This is an INDIRECT OFFER ad for a free resource, lead magnet, or free training. It's free, so the risk reversal is implicit. Use the CTA the user has written in their inputs. If they haven't written one, use natural spoken language pointing to the destination. Never pitch a paid offer in this script.`
  };

  async function callApi(prompt, maxTokens) {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, maxTokens })
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData?.error || `Server error ${res.status}`);
    }
    const data = await res.json();
    return data.text || "";
  }

  async function generateHooks() {
    setLoading(true);
    setApiError(null);
    setLoadingMessage("Writing 3 hook options for you to choose from...");
    setView("hooks");

    const { fw, stepDetails } = buildBaseContext();
    const hookInput = answers["hook"] || answers["attention"] || answers["problem"] || answers["domino_belief"] || "(not provided)";

    const hookPrompt = `You are an expert direct response copywriter trained in Eugene Schwartz's Breakthrough Advertising principles.

Your job: write 3 different opening hooks for a ${mode?.label} video ad. Each hook must be distinct in angle.

CONTEXT:
- Ad Mode: ${mode?.label}
- Market Awareness Stage: ${stage?.label || "not specified"} (${stage?.description || ""})
- Market Sophistication: ${soph?.label || "not specified"} (${soph?.description || ""})
- Dominant Emotion: "${dominantEmotion || "not specified"}"
- Framework: ${fw.label}
- Hook Strategy for this stage: ${stage?.hookStrategy || "lead with the audience's pain or desired outcome"}
- Sophistication Hook Adjustment: ${soph?.hookMod || "match the approach to the market"}
- Target Ad Length: ${duration?.label || "60 seconds"} (${duration?.wordCount || "140-160 words"} total)
- Client's hook notes: ${hookInput}

Full client inputs for context:
${stepDetails}

HOOK RULES:
- Each hook is 1 to 3 sentences max (15-25 words each)
- Never open with "I"
- No em dashes or en dashes. Commas only.
- Write for spoken word. Short sentences.
- Each hook must use a meaningfully different angle:
  Hook 1: Pain/problem-led (call out what they're struggling with)
  Hook 2: Result/outcome-led (open on the transformation or specific result)
  Hook 3: Contrarian or curiosity-led (challenge a belief, make a bold claim, or open a loop)

${buildHumanizerRules()}

OUTPUT FORMAT — return exactly this, nothing else:
HOOK 1: [the hook text]
HOOK 2: [the hook text]
HOOK 3: [the hook text]`;

    try {
      const text = await callApi(hookPrompt, 500);
      const hooks = [];
      const lines = text.split("\n");
      for (const line of lines) {
        const match = line.match(/^HOOK \d+:\s*(.+)$/);
        if (match) hooks.push(match[1].trim());
      }
      if (hooks.length < 2) throw new Error("Couldn't parse hooks from the response. Please try again.");
      setGeneratedHooks(hooks);
    } catch (err) {
      setApiError(err.message || "Something went wrong. Please try again.");
    }
    setLoading(false);
    setLoadingMessage("");
  }

  async function generateScript(chosenHook) {
    setLoading(true);
    setApiError(null);
    setLoadingMessage("Writing your script...");
    setView("result");

    const { fw, stepDetails } = buildBaseContext();
    const wordCount = duration?.wordCount || "140-160 words";
    const durationLabel = duration?.label || "60 seconds";
    const spokenNotes = duration?.spokenNotes || "One breath per idea. Keep sentences under 15 words.";

    const draftPrompt = `You are an expert direct response copywriter trained in Eugene Schwartz's Breakthrough Advertising principles.

AD MODE: ${mode?.label}
${modeInstructions[adMode]}

CONTEXT:
- Market Awareness Stage: ${stage?.label || "not specified"} (${stage?.description || ""})
- Market Sophistication: ${soph?.label || "not specified"} (${soph?.description || ""})
- Dominant Emotion: "${dominantEmotion || "not specified"}"
- Framework: ${fw.label}
- Hook Strategy: ${stage?.hookStrategy || "lead with the audience's pain or desired outcome"}
- Sophistication Hook Adjustment: ${soph?.hookMod || "match the approach to the market"}
- Target Length: ${durationLabel} (${wordCount} of spoken copy)
- Spoken Word Notes: ${spokenNotes}

CHOSEN HOOK (use this exact hook, word for word, as the opening):
"${chosenHook}"

USER'S INPUTS:
${stepDetails}

COPY RULES:
- No em dashes or en dashes anywhere. Use commas instead.
- Rule of One: one person, one problem, one promise, one CTA.
- Never open with "I". (The hook is already chosen above.)
- Specificity beats adjectives. Use numbers, names, timeframes.
- One CTA only. Never give options.
- Write for spoken word. Short sentences. Natural rhythm.
- Script must be ${wordCount}. Calibrate carefully.
- Every sentence should sound like a person talking to a camera.
- Do NOT add any preamble or explanation. Return only the script.

${buildHumanizerRules()}

FORMAT: Label each section in brackets matching the ${fw.label} framework. Write spoken copy beneath each label.`;

    let draftScript = "";
    try {
      draftScript = await callApi(draftPrompt, 1200);
      if (!draftScript) throw new Error("The response came back empty. Please try again.");
    } catch (err) {
      setApiError(err.message || "Something went wrong. Please try again.");
      setLoading(false);
      setLoadingMessage("");
      return;
    }

    setLoadingMessage("Reviewing and polishing your script...");

    const reviewPrompt = `You are a senior direct response copywriter doing a quality review of a video ad script.

Your job: review the draft below against every rule listed, fix every violation, and return the final polished script. Do NOT add commentary. Return only the improved script.

DRAFT SCRIPT:
${draftScript}

REVIEW CHECKLIST:

LENGTH CHECK:
- Target: ${wordCount} of spoken copy
- Count words in the spoken copy sections (not bracket labels)
- If over: cut the weakest sentence in each section
- If under: add one specific, concrete detail to the weakest section
- No padding. Every added word must earn its place.

COPY RULES:
- No em dashes or en dashes. Replace with commas.
- No vague claims. Every outcome needs a number or a name.
- One CTA only. If there are two destinations, remove the second.
- All copy must sound spoken, not written. Break up any sentence over 20 words.

CAPITALISATION CHECK:
- No mid-sentence capitalisation unless it's a proper noun.
- Standard sentence capitalisation throughout.

SPOKEN WORD CHECK:
- Read every sentence out loud mentally. If it needs a second read, rewrite it.
- Short sentences. Natural pauses. Written for a camera, not a page.
- No formal transitions like "Furthermore," "In conclusion," "As such,"

${buildHumanizerRules()}

Return the complete polished script in the same bracket-label format as the draft.
After the script, add [STRATEGY NOTES] with:
1) Why this approach fits the awareness stage and ad mode
2) One thing to test in a second version
3) One copy rule to watch when recording`;

    try {
      const finalScript = await callApi(reviewPrompt, 1400);
      if (!finalScript) throw new Error("The review pass came back empty.");
      setGeneratedScript(finalScript);
    } catch {
      setGeneratedScript(draftScript + "\n\n[Note: The quality review pass was unavailable. This is the draft version.]");
    }

    setLoading(false);
    setLoadingMessage("");
  }

  function handleCopy() {
    navigator.clipboard.writeText(generatedScript);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  }

  // ─── VIEW: MODE SELECTION ─────────────────────────────────────────────────
  if (view === "mode") return (
    <PageWrap>
      <div style={{ background: "#111", borderBottom: "1px solid #1e1e1e", padding: "20px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: "linear-gradient(135deg, #e8500a, #c43a00)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>⚡</div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700 }}>Ad Script Builder</div>
          <div style={{ fontSize: 11, color: "#555", marginTop: 1 }}>Freedom Coach Method</div>
        </div>
      </div>
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "32px 20px 0" }}>
        <Eyebrow text="Start Here" />
        <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.5px", margin: "0 0 10px" }}>What kind of ad are you writing?</h1>
        <p style={{ fontSize: 13, color: "#666", lineHeight: 1.6, marginBottom: 28 }}>The goal of your ad determines everything: the framework, the hook, the structure, and the CTA. Pick the right mode first.</p>
        {Object.values(AD_MODES).map(m => (
          <button key={m.id} onClick={() => { setAdMode(m.id); setView("awareness"); }} style={{ width: "100%", background: "#111", border: "1px solid #1e1e1e", borderRadius: 12, padding: "20px", cursor: "pointer", textAlign: "left", marginBottom: 10, transition: "all 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = m.color; e.currentTarget.style.background = "#141414"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e1e1e"; e.currentTarget.style.background = "#111"; }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
              <div style={{ fontSize: 24, lineHeight: 1, marginTop: 2 }}>{m.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                  <div style={{ fontSize: 15, fontWeight: 800, color: "#f0ede8" }}>{m.label}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: m.color, background: "#1a1a1a", padding: "2px 8px", borderRadius: 20 }}>CTA: {m.id === "direct" ? "Buy / Apply" : m.id === "follower" ? "Follow Me" : "Get Freebie"}</div>
                </div>
                <div style={{ fontSize: 12, color: "#888", lineHeight: 1.5, marginBottom: 8 }}>{m.tagline}</div>
                <div style={{ fontSize: 12, color: "#555", lineHeight: 1.6 }}>{m.description}</div>
                <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
                  <div style={{ flex: 1 }}><div style={{ fontSize: 10, fontWeight: 700, color: "#4a8a4a", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 3 }}>Best for</div><div style={{ fontSize: 11, color: "#557755" }}>{m.bestFor}</div></div>
                  <div style={{ flex: 1 }}><div style={{ fontSize: 10, fontWeight: 700, color: "#8a4a4a", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 3 }}>Not for</div><div style={{ fontSize: 11, color: "#775555" }}>{m.notFor}</div></div>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </PageWrap>
  );

  // ─── VIEW: AWARENESS ──────────────────────────────────────────────────────
  if (view === "awareness") return (
    <PageWrap>
      <TopBar title={mode?.label} onBack={() => setView("mode")} right="1 of 5" />
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "32px 20px 0" }}>
        <Eyebrow text="Step 1 of 5 — Breakthrough Advertising" />
        <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.4px", margin: "0 0 10px" }}>Where is your audience right now?</h2>
        <p style={{ fontSize: 13, color: "#666", lineHeight: 1.6, marginBottom: 12 }}>Eugene Schwartz called this Market Awareness. The stage your audience is at determines your hook, your framework, and how hard you sell.</p>
        <div style={{ background: "#1a0d0d", border: "1px solid #2e1a1a", borderRadius: 10, padding: "14px 16px", marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#8a4a4a", letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 6 }}>The #1 advertiser mistake</div>
          <p style={{ fontSize: 12, color: "#886666", lineHeight: 1.7, margin: 0 }}>Most advertisers default to Stage 4-5, pitching to people as if they already know and trust them. But the majority of cold traffic lives at Stage 2-3. Pitching too early is why most ads don't convert.</p>
        </div>
        {AWARENESS_STAGES.map(s => {
          const isRecommended = mode && s.bestModes?.includes(adMode);
          const isSelected = awarenessStage === s.id;
          return (
            <div key={s.id} style={{ background: isSelected ? "#131313" : "#111", border: `1px solid ${isSelected ? "#e8500a" : isRecommended ? "#2a3a2a" : "#1e1e1e"}`, borderRadius: 10, marginBottom: 8, overflow: "hidden" }}>
              <button onClick={() => setAwarenessStage(isSelected ? null : s.id)} style={{ background: "none", border: "none", padding: "16px 18px", cursor: "pointer", textAlign: "left", width: "100%" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: isSelected ? "linear-gradient(135deg, #e8500a, #c43a00)" : "#1a1a1a", border: `1px solid ${isSelected ? "transparent" : "#2a2a2a"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: isSelected ? "#fff" : "#444" }}>{s.level}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#f0ede8" }}>{s.label}</div>
                      {isRecommended && <div style={{ fontSize: 10, fontWeight: 700, color: "#4a8a4a", background: "#1a2e1a", padding: "2px 7px", borderRadius: 20 }}>Good for {mode?.label}</div>}
                      <div style={{ marginLeft: "auto", fontSize: 11, color: isSelected ? "#e8500a" : "#333" }}>{isSelected ? "▲" : "▼"}</div>
                    </div>
                    <div style={{ fontSize: 12, color: isSelected ? "#aaa" : "#555", lineHeight: 1.5 }}>{s.tagline}</div>
                  </div>
                </div>
              </button>
              {isSelected && (
                <div style={{ padding: "0 18px 18px", borderTop: "1px solid #1e1e1e" }}>
                  <div style={{ paddingTop: 14, display: "flex", flexDirection: "column", gap: 12 }}>
                    <div><div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: "#555", marginBottom: 4 }}>What this means</div><div style={{ fontSize: 12, color: "#888", lineHeight: 1.6 }}>{s.description}</div></div>
                    <div><div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: "#4a7aaa", marginBottom: 4 }}>Who lives here</div><div style={{ fontSize: 12, color: "#557799", lineHeight: 1.6 }}>{s.whoLivesHere}</div></div>
                    <div><div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: "#4a8a4a", marginBottom: 4 }}>When to advertise here</div><div style={{ fontSize: 12, color: "#557755", lineHeight: 1.6 }}>{s.whenToUse}</div></div>
                    <div><div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: "#8a4a4a", marginBottom: 4 }}>Common mistake</div><div style={{ fontSize: 12, color: "#775555", lineHeight: 1.6 }}>{s.commonMistake}</div></div>
                    <div style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 8, padding: "10px 12px" }}><div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: "#444", marginBottom: 5 }}>Hook Strategy</div><div style={{ fontSize: 12, color: "#7ab87a", lineHeight: 1.6 }}>{s.hookStrategy}</div></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        <div style={{ marginTop: 16 }}><PrimaryBtn onClick={() => setView("sophistication")} disabled={!awarenessStage}>Next: Market Sophistication →</PrimaryBtn></div>
      </div>
    </PageWrap>
  );

  // ─── VIEW: SOPHISTICATION ─────────────────────────────────────────────────
  if (view === "sophistication") return (
    <PageWrap>
      <TopBar title={mode?.label} onBack={() => setView("awareness")} right="2 of 5" />
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "32px 20px 0" }}>
        <Eyebrow text="Step 2 of 5 — Breakthrough Advertising" />
        <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.4px", margin: "0 0 10px" }}>How saturated is your market?</h2>
        <p style={{ fontSize: 13, color: "#666", lineHeight: 1.6, marginBottom: 12 }}>The more offers a market has seen, the more sophisticated your approach needs to be.</p>
        <div style={{ background: "#0d100d", border: "1px solid #1a221a", borderRadius: 10, padding: "14px 16px", marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#4a8a4a", letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 6 }}>Why this matters</div>
          <p style={{ fontSize: 12, color: "#668866", lineHeight: 1.7, margin: 0 }}>In a fresh market, a direct promise lands hard. In a saturated market, jaded buyers need a new mechanism, a contrarian angle, or proof so specific it can't be faked.</p>
        </div>
        {SOPHISTICATION_LEVELS.map(s => (
          <button key={s.id} onClick={() => setSophistication(s.id)} style={{ width: "100%", background: sophistication === s.id ? "#161616" : "#111", border: `1px solid ${sophistication === s.id ? "#e8500a" : "#1e1e1e"}`, borderRadius: 10, padding: "16px 18px", cursor: "pointer", textAlign: "left", marginBottom: 8 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#f0ede8", marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: 12, color: sophistication === s.id ? "#888" : "#555", lineHeight: 1.5 }}>{s.description}</div>
            {sophistication === s.id && <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid #222", fontSize: 12, color: "#7ab87a", lineHeight: 1.5 }}>Hook approach: {s.hookMod}</div>}
          </button>
        ))}
        <div style={{ marginTop: 16 }}><PrimaryBtn onClick={() => setView("emotion")} disabled={!sophistication}>Next: Dominant Emotion →</PrimaryBtn></div>
      </div>
    </PageWrap>
  );

  // ─── VIEW: EMOTION ────────────────────────────────────────────────────────
  if (view === "emotion") return (
    <PageWrap>
      <TopBar title={mode?.label} onBack={() => setView("sophistication")} right="3 of 5" />
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "32px 20px 0" }}>
        <Eyebrow text="Step 3 of 5 — Breakthrough Advertising" />
        <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.4px", margin: "0 0 10px" }}>What is your prospect feeling right now?</h2>
        <p style={{ fontSize: 13, color: "#666", lineHeight: 1.6, marginBottom: 8 }}>Schwartz said the most powerful ads don't create desire, they channel existing desire. Name the emotion your prospect is already carrying.</p>
        <div style={{ background: "#141414", border: "1px solid #1e1e1e", borderLeft: "3px solid #e8500a", borderRadius: 8, padding: "12px 14px", marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#555", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 6 }}>Examples</div>
          <div style={{ fontSize: 12, color: "#666", lineHeight: 1.8 }}>Frustrated that other coaches are scaling and I'm stuck... Embarrassed I can't charge what I'm worth... Scared I'll be trading hours for dollars forever...</div>
        </div>
        <textarea value={dominantEmotion} onChange={e => setDominantEmotion(e.target.value)} placeholder="Describe the emotion in your prospect's own words..." rows={4} style={{ width: "100%", background: "#111", border: "1px solid #222", borderRadius: 10, color: "#f0ede8", fontSize: 16, padding: "14px 16px", resize: "vertical", lineHeight: 1.6, outline: "none", boxSizing: "border-box", fontFamily: "'Inter', system-ui, sans-serif" }} onFocus={e => e.target.style.borderColor = "#e8500a"} onBlur={e => e.target.style.borderColor = "#222"} />
        <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
          <PrimaryBtn onClick={() => setView("duration")} disabled={!dominantEmotion.trim()}>Next: Ad Length →</PrimaryBtn>
          <GhostBtn onClick={() => setView("duration")}>Skip this step</GhostBtn>
        </div>
      </div>
    </PageWrap>
  );

  // ─── VIEW: DURATION ───────────────────────────────────────────────────────
  if (view === "duration") return (
    <PageWrap>
      <TopBar title={mode?.label} onBack={() => setView("emotion")} right="4 of 5" />
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "32px 20px 0" }}>
        <Eyebrow text="Step 4 of 5" />
        <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.4px", margin: "0 0 10px" }}>How long is this ad?</h2>
        <p style={{ fontSize: 13, color: "#666", lineHeight: 1.6, marginBottom: 20 }}>The script will be calibrated to hit your target duration. Shorter scripts need tighter copy. Longer scripts need stronger proof and story to hold attention.</p>
        {AD_DURATIONS.map(d => (
          <button key={d.id} onClick={() => setAdDuration(d.id)} style={{ width: "100%", background: adDuration === d.id ? "#161616" : "#111", border: `1px solid ${adDuration === d.id ? "#e8500a" : "#1e1e1e"}`, borderRadius: 10, padding: "16px 18px", cursor: "pointer", textAlign: "left", marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#f0ede8", marginBottom: 4 }}>{d.label}</div>
                <div style={{ fontSize: 12, color: adDuration === d.id ? "#888" : "#555", lineHeight: 1.5 }}>{d.description}</div>
                {adDuration === d.id && <div style={{ marginTop: 10, fontSize: 12, color: "#7ab87a", lineHeight: 1.5 }}>{d.spokenNotes}</div>}
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, color: adDuration === d.id ? "#e8500a" : "#444", background: "#1a1a1a", padding: "4px 10px", borderRadius: 20, flexShrink: 0, marginLeft: 12 }}>{d.wordCount}</div>
            </div>
          </button>
        ))}
        <div style={{ marginTop: 16 }}><PrimaryBtn onClick={() => setView("framework")} disabled={!adDuration}>Next: Choose Framework →</PrimaryBtn></div>
      </div>
    </PageWrap>
  );

  // ─── VIEW: FRAMEWORK ──────────────────────────────────────────────────────
  if (view === "framework") {
    const allFwIds = FRAMEWORKS_BY_MODE[adMode] || [];
    const recIds = (awarenessStage && adMode) ? (RECOMMENDED[adMode]?.[awarenessStage] || []) : [];
    const otherIds = allFwIds.filter(id => !recIds.includes(id));
    return (
      <PageWrap>
        <TopBar title={mode?.label} onBack={() => setView("duration")} right="5 of 5" />
        <div style={{ maxWidth: 560, margin: "0 auto", padding: "32px 20px 0" }}>
          <Eyebrow text="Step 5 of 5" />
          <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.4px", margin: "0 0 6px" }}>Pick your framework</h2>
          <p style={{ fontSize: 13, color: "#666", lineHeight: 1.6, marginBottom: 20 }}>Recommended options are based on your awareness stage and ad mode.</p>
          {recIds.length > 0 && <>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#4a8a4a", letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 10 }}>Recommended for {stage?.label} + {mode?.label}</div>
            {recIds.map(id => { const fw = FRAMEWORKS[id]; if (!fw) return null; return (
              <button key={id} onClick={() => startBuild(id)} style={{ width: "100%", background: "#0d1a0d", border: "1px solid #1a2e1a", borderRadius: 10, padding: "16px 18px", cursor: "pointer", textAlign: "left", marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#4a8a4a"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#1a2e1a"}>
                <div><div style={{ fontSize: 14, fontWeight: 700, color: "#f0ede8", marginBottom: 3 }}>{fw.label}</div><div style={{ fontSize: 12, color: "#7ab87a" }}>{fw.description}</div></div>
                <div style={{ fontSize: 10, color: "#4a8a4a", fontWeight: 700, background: "#1a2e1a", padding: "4px 10px", borderRadius: 20, flexShrink: 0, marginLeft: 12 }}>RECOMMENDED</div>
              </button>
            ); })}
            {otherIds.length > 0 && <div style={{ fontSize: 11, fontWeight: 700, color: "#444", letterSpacing: "1.2px", textTransform: "uppercase", margin: "20px 0 10px" }}>Other Options</div>}
          </>}
          {otherIds.map(id => { const fw = FRAMEWORKS[id]; if (!fw) return null; return (
            <button key={id} onClick={() => startBuild(id)} style={{ width: "100%", background: "#111", border: "1px solid #1e1e1e", borderRadius: 10, padding: "16px 18px", cursor: "pointer", textAlign: "left", marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#e8500a"; e.currentTarget.style.background = "#161616"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e1e1e"; e.currentTarget.style.background = "#111"; }}>
              <div><div style={{ fontSize: 14, fontWeight: 700, color: "#f0ede8", marginBottom: 3 }}>{fw.label}</div><div style={{ fontSize: 12, color: "#555" }}>{fw.description}</div></div>
              <div style={{ fontSize: 11, color: "#444", background: "#1a1a1a", padding: "4px 10px", borderRadius: 20, flexShrink: 0, marginLeft: 12 }}>{fw.steps.length} steps</div>
            </button>
          ); })}
        </div>
      </PageWrap>
    );
  }

  // ─── VIEW: BUILD ──────────────────────────────────────────────────────────
  if (view === "build" && step) {
    const modeColor = mode?.color || "#e8500a";
    return (
      <PageWrap>
        <div style={{ background: "#111", borderBottom: "1px solid #1e1e1e", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={handleBack} style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 13, padding: 0 }}>← Back</button>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: modeColor, background: "#1a1a1a", padding: "3px 8px", borderRadius: 20 }}>{mode?.emoji} {mode?.label}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#888" }}>{framework?.label}</div>
          </div>
          <div style={{ fontSize: 12, color: "#444" }}>{currentStep + 1}/{steps.length}</div>
        </div>
        <div style={{ height: 3, background: "#1a1a1a" }}>
          <div style={{ height: "100%", background: `linear-gradient(90deg, ${modeColor}, ${modeColor}cc)`, width: `${((currentStep + 1) / steps.length) * 100}%`, transition: "width 0.3s ease" }} />
        </div>
        <div style={{ maxWidth: 560, margin: "0 auto", padding: "28px 20px" }}>
          <div style={{ display: "flex", gap: 5, marginBottom: 24 }}>
            {steps.map((s, i) => <div key={s.id} style={{ height: 3, borderRadius: 2, flex: 1, background: i <= currentStep ? modeColor : "#1e1e1e" }} />)}
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", color: modeColor, textTransform: "uppercase", marginBottom: 8 }}>Step {currentStep + 1} of {steps.length}</div>
          <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.4px", margin: "0 0 16px" }}>{step.label}</h2>
          <div style={{ background: "#141414", border: "1px solid #1e1e1e", borderLeft: `3px solid ${modeColor}`, borderRadius: 8, padding: "12px 14px", marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#555", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 6 }}>Writing Tip</div>
            <p style={{ fontSize: 13, color: "#888", lineHeight: 1.6, margin: 0 }}>{step.tip}</p>
          </div>
          {step.specificity && (
            <div style={{ background: "#0d1a0d", border: "1px solid #1a2e1a", borderRadius: 8, padding: "12px 14px", marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#4a8a4a", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 6 }}>Specificity Check</div>
              <p style={{ fontSize: 13, color: "#668866", lineHeight: 1.6, margin: 0 }}>Name the actual thing, not a description of it. "The Freedom Coach Method" beats "my unique approach". "3 clients in 8 weeks" beats "fast results". If you can say it vaguely, say it specifically instead.</p>
            </div>
          )}
          {step.ctaOptions && (() => {
            const ctaData = CTA_OPTIONS[step.ctaOptions];
            if (!ctaData) return null;
            return (
              <div style={{ background: "#0d0d0d", border: "1px solid #1e1e1e", borderRadius: 10, padding: "14px 16px", marginBottom: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: modeColor, letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 6 }}>{ctaData.label}</div>
                <div style={{ fontSize: 12, color: "#555", lineHeight: 1.6, marginBottom: 12 }}>{ctaData.note}</div>
                {ctaData.groups.map((group, gi) => (
                  <div key={gi} style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#444", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 6 }}>{group.heading}</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      {group.options.map((opt, oi) => (
                        <button key={oi} onClick={() => setAnswers(prev => ({ ...prev, [step.id]: opt }))}
                          style={{ background: answers[step.id] === opt ? "#1a1a2e" : "#141414", border: `1px solid ${answers[step.id] === opt ? modeColor : "#222"}`, borderRadius: 7, padding: "8px 12px", cursor: "pointer", textAlign: "left", fontSize: 12, color: answers[step.id] === opt ? "#aac" : "#777", lineHeight: 1.5 }}>{opt}</button>
                      ))}
                    </div>
                  </div>
                ))}
                <div style={{ fontSize: 11, color: "#444", marginTop: 8, fontStyle: "italic" }}>Tap any option to use it, or write your own below.</div>
              </div>
            );
          })()}
          <textarea value={answers[step.id] || ""} onChange={e => setAnswers(prev => ({ ...prev, [step.id]: e.target.value }))} placeholder={step.placeholder} rows={step.ctaOptions ? 3 : 5} style={{ width: "100%", background: "#111", border: "1px solid #222", borderRadius: 10, color: "#f0ede8", fontSize: 16, padding: "14px 16px", resize: "vertical", lineHeight: 1.6, outline: "none", boxSizing: "border-box", fontFamily: "'Inter', system-ui, sans-serif" }} onFocus={e => e.target.style.borderColor = modeColor} onBlur={e => e.target.style.borderColor = "#222"} />
          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
            <PrimaryBtn onClick={handleNext} disabled={!answers[step.id]?.trim()}>
              {currentStep < steps.length - 1 ? "Next Step →" : "Generate Hooks ⚡"}
            </PrimaryBtn>
            {!answers[step.id]?.trim() && (
              <button onClick={handleNext} style={{ background: "none", border: "none", color: "#444", fontSize: 12, cursor: "pointer", padding: "8px" }}>Skip this step</button>
            )}
          </div>
        </div>
      </PageWrap>
    );
  }

  // ─── VIEW: HOOKS ──────────────────────────────────────────────────────────
  if (view === "hooks") {
    const modeColor = mode?.color || "#e8500a";
    return (
      <PageWrap>
        <div style={{ background: "#111", borderBottom: "1px solid #1e1e1e", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={() => { setView("build"); setCurrentStep(steps.length - 1); }} style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 13, padding: 0 }}>← Back</button>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#888" }}>Pick Your Hook</div>
          <div style={{ width: 50 }} />
        </div>
        <div style={{ maxWidth: 560, margin: "0 auto", padding: "28px 20px" }}>
          {loading ? (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <div style={{ width: 40, height: 40, border: "3px solid #1e1e1e", borderTop: `3px solid ${modeColor}`, borderRadius: "50%", margin: "0 auto 20px", animation: "spin 1s linear infinite" }} />
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              <div style={{ fontSize: 14, color: "#555" }}>{loadingMessage}</div>
            </div>
          ) : apiError ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>⚠️</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#f0ede8", marginBottom: 10 }}>Hook generation failed</div>
              <div style={{ fontSize: 13, color: "#666", lineHeight: 1.6, marginBottom: 24, maxWidth: 380, margin: "0 auto 24px" }}>{apiError}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 320, margin: "0 auto" }}>
                <button onClick={generateHooks} style={{ padding: "14px", background: "linear-gradient(135deg, #e8500a, #c43a00)", border: "none", color: "#fff", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Try Again</button>
                <button onClick={() => { setView("build"); setCurrentStep(steps.length - 1); }} style={{ padding: "14px", background: "#111", border: "1px solid #1e1e1e", color: "#888", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>← Go Back</button>
              </div>
            </div>
          ) : (
            <>
              <Eyebrow text="Choose Your Hook" />
              <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.4px", margin: "0 0 8px" }}>Pick the hook that fits best</h2>
              <p style={{ fontSize: 13, color: "#666", lineHeight: 1.6, marginBottom: 24 }}>Each hook uses a different angle. Pick the one that sounds most like you and best matches where your audience is at.</p>
              {generatedHooks.map((hook, i) => {
                const hookLabels = ["Pain-Led", "Result-Led", "Contrarian"];
                const hookColors = ["#e8500a", "#4a7aff", "#c84ab0"];
                const isSelected = selectedHook === hook;
                return (
                  <button key={i} onClick={() => setSelectedHook(isSelected ? null : hook)} style={{ width: "100%", background: isSelected ? "#141414" : "#111", border: `1px solid ${isSelected ? hookColors[i] || modeColor : "#1e1e1e"}`, borderRadius: 12, padding: "18px", cursor: "pointer", textAlign: "left", marginBottom: 10 }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                      <div style={{ width: 26, height: 26, borderRadius: "50%", flexShrink: 0, background: isSelected ? hookColors[i] || modeColor : "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: isSelected ? "#fff" : "#555", marginTop: 1 }}>{i + 1}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: hookColors[i] || modeColor, letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 6 }}>{hookLabels[i] || `Option ${i + 1}`}</div>
                        <div style={{ fontSize: 14, color: "#e0ddd8", lineHeight: 1.7, fontStyle: "italic" }}>"{hook}"</div>
                      </div>
                      {isSelected && <div style={{ color: hookColors[i] || modeColor, fontSize: 18, flexShrink: 0 }}>✓</div>}
                    </div>
                  </button>
                );
              })}
              <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 8 }}>
                <PrimaryBtn onClick={() => generateScript(selectedHook)} disabled={!selectedHook}>Build My Script With This Hook ⚡</PrimaryBtn>
                <GhostBtn onClick={generateHooks}>Generate Different Hooks</GhostBtn>
              </div>
            </>
          )}
        </div>
      </PageWrap>
    );
  }

  // ─── VIEW: RESULT ─────────────────────────────────────────────────────────
  return (
    <PageWrap>
      <div style={{ background: "#111", borderBottom: "1px solid #1e1e1e", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button onClick={reset} style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 13, padding: 0 }}>← Start Over</button>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#888" }}>Your Script</div>
        <div style={{ width: 60 }} />
      </div>
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "28px 20px" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div style={{ width: 40, height: 40, border: "3px solid #1e1e1e", borderTop: `3px solid ${mode?.color || "#e8500a"}`, borderRadius: "50%", margin: "0 auto 20px", animation: "spin 1s linear infinite" }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <div style={{ fontSize: 14, color: "#555" }}>{loadingMessage}</div>
            <div style={{ fontSize: 12, color: "#333", marginTop: 6 }}>Calibrating for {stage?.label} awareness, {duration?.label} target</div>
          </div>
        ) : apiError ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div style={{ fontSize: 32, marginBottom: 16 }}>⚠️</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#f0ede8", marginBottom: 10 }}>Script generation failed</div>
            <div style={{ fontSize: 13, color: "#666", lineHeight: 1.6, marginBottom: 24, maxWidth: 380, margin: "0 auto 24px" }}>{apiError}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 320, margin: "0 auto" }}>
              <button onClick={() => generateScript(selectedHook)} style={{ padding: "14px", background: "linear-gradient(135deg, #e8500a, #c43a00)", border: "none", color: "#fff", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Try Again</button>
              <button onClick={() => setView("hooks")} style={{ padding: "14px", background: "#111", border: "1px solid #1e1e1e", color: "#888", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>← Go Back to Hook Selection</button>
              <button onClick={reset} style={{ padding: "12px", background: "none", border: "none", color: "#444", fontSize: 12, cursor: "pointer" }}>Start Over</button>
            </div>
          </div>
        ) : (
          <>
            <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 10, padding: "12px 16px", marginBottom: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[{ label: `${mode?.emoji} ${mode?.label}`, color: mode?.color }, { label: stage?.label, color: "#888" }, { label: soph?.label, color: "#888" }, { label: duration?.label, color: "#888" }, { label: framework?.label, color: "#888" }].filter(t => t.label).map((tag, i) => (
                <div key={i} style={{ fontSize: 11, fontWeight: 600, color: tag.color, background: "#1a1a1a", padding: "4px 10px", borderRadius: 20 }}>{tag.label}</div>
              ))}
            </div>
            {selectedHook && (
              <div style={{ background: "#0d0d0d", border: "1px solid #1e1e1e", borderRadius: 10, padding: "12px 16px", marginBottom: 16 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#444", letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 6 }}>Hook Used</div>
                <div style={{ fontSize: 13, color: "#666", fontStyle: "italic", lineHeight: 1.6 }}>"{selectedHook}"</div>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0, letterSpacing: "-0.3px" }}>Your Script</h2>
              <button onClick={handleCopy} style={{ background: copied ? "#1a3a1a" : "#1a1a1a", border: `1px solid ${copied ? "#2a5a2a" : "#2a2a2a"}`, color: copied ? "#4caf50" : "#888", borderRadius: 8, padding: "8px 16px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                {copied ? "Copied ✓" : "Copy Script"}
              </button>
            </div>
            <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 12, padding: "20px", marginBottom: 16 }}>
              <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", fontSize: 13, lineHeight: 1.9, color: "#c8c5c0", margin: 0, fontFamily: "'Inter', system-ui, sans-serif" }}>
                {generatedScript.split("\n").map((line, i) => {
                  const isLabel = line.trim().startsWith("[") && line.includes("]");
                  const isNotes = line.includes("STRATEGY NOTES");
                  return (
                    <span key={i}>
                      {isLabel ? <span style={{ color: isNotes ? "#4a8a4a" : (mode?.color || "#e8500a"), fontWeight: 700, fontSize: 11, letterSpacing: "1px" }}>{line}</span> : line}
                      {"\n"}
                    </span>
                  );
                })}
              </pre>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <GhostBtn onClick={reset}>New Script</GhostBtn>
              <button onClick={() => setView("hooks")} style={{ flex: 1, background: `linear-gradient(135deg, ${mode?.color || "#e8500a"}, ${mode?.color || "#c43a00"}cc)`, border: "none", color: "#fff", borderRadius: 10, padding: "14px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Try Different Hook</button>
            </div>
          </>
        )}
      </div>
    </PageWrap>
  );
}
