export const AD_MODES = {
  direct: {
    id: "direct", label: "Direct Offer", emoji: "🎯",
    tagline: "Convert viewers into paying clients.",
    description: "The goal is a sale or a booked call. You're asking someone to invest money or time. Needs the most trust, the strongest proof, and a clear risk reversal. Best for warm or solution-aware audiences.",
    bestFor: "Stage 3-5 audiences. Retargeting, warm followers, people who already know you or your niche.",
    notFor: "Cold traffic who've never heard of you. Pitching too early is the #1 reason ads don't convert.",
    color: "#e8500a", recommendedStages: [3, 4, 5]
  },
  follower: {
    id: "follower", label: "Follow Me", emoji: "👥",
    tagline: "Grow your audience with the right people.",
    description: "The goal is the follow. No pitch, no offer, no risk reversal. You're selling your content and your perspective. The CTA is always: follow me for daily content on their pain or desired outcome.",
    bestFor: "Stage 1-2 cold audiences. People who feel the pain but aren't ready to buy. Build the audience first, sell later.",
    notFor: "People who are ready to buy. Don't waste a hot lead on a follow ad.",
    color: "#4a7aff", recommendedStages: [1, 2]
  },
  indirect: {
    id: "indirect", label: "Indirect Offer", emoji: "🎁",
    tagline: "Give value first. Earn the right to sell later.",
    description: "The goal is an opt-in, a free training claim, or a lead magnet download. Lower commitment than a direct offer so it works on colder audiences. The risk reversal is implicit: it's free.",
    bestFor: "Stage 2-3 audiences. Cold traffic who feel the pain and are open to solutions but aren't ready to invest yet.",
    notFor: "Stage 4-5 audiences who already know you. Don't send warm leads to a freebie when they're ready for the real thing.",
    color: "#4a8a4a", recommendedStages: [2, 3]
  }
};

export const AWARENESS_STAGES = [
  {
    id: "unaware", level: 1, label: "Unaware",
    tagline: "They don't know they have a problem yet.",
    description: "Your audience hasn't connected their situation to a problem that needs solving. They're living with a hidden pain they haven't named yet.",
    whoLivesHere: "The broadest possible audience. Scrollers who've never searched for a solution, never complained about the problem out loud, but are quietly living it every day.",
    whenToUse: "Rarely worth advertising here unless you have a large budget and a long-term brand play. Most small businesses can't afford the slow ROI. Follower ads work better here than offers.",
    commonMistake: "Jumping straight to a solution. If they don't know they have a problem, an offer means nothing.",
    hookStrategy: "Lead with a bold, provocative statement about their world. Make them feel seen before they know why.",
    bestModes: ["follower"]
  },
  {
    id: "problem_aware", level: 2, label: "Problem Aware",
    tagline: "They feel the pain, but don't know a solution exists.",
    description: "They know something is wrong. They're frustrated, stuck, or burned out. But they haven't started searching for answers yet.",
    whoLivesHere: "The majority of your cold traffic on Meta. People scrolling their feed who feel the problem daily but haven't gone looking for a fix. Highest volume stage.",
    whenToUse: "Where most of your cold ad spend should go. Lead with the pain, introduce the idea that a solution exists. Follower ads and indirect offers work best here.",
    commonMistake: "Leading with your offer or credentials. They don't care yet. They need to feel heard first.",
    hookStrategy: "Name the exact pain they feel every day. Agitate it so they lean in, then introduce the idea that a solution exists.",
    bestModes: ["follower", "indirect"]
  },
  {
    id: "solution_aware", level: 3, label: "Solution Aware",
    tagline: "They know solutions exist, but haven't found you.",
    description: "They've been looking. They've maybe tried a few things. They're actively comparing options and in research mode.",
    whoLivesHere: "Warmer cold traffic. They've Googled the problem, followed accounts in the niche, maybe bought something that didn't work. High intent, still wide audience.",
    whenToUse: "The sweet spot for direct response. Your unique mechanism matters most here. Indirect offers also work well to capture leads who aren't quite ready to buy.",
    commonMistake: "Making the same claims as everyone else. A solution-aware buyer will scroll past if your ad sounds like every other coach.",
    hookStrategy: "Lead with your unique mechanism or method. Why is YOUR approach different from everything else they've seen?",
    bestModes: ["direct", "indirect"]
  },
  {
    id: "product_aware", level: 4, label: "Product Aware",
    tagline: "They know you, but haven't committed.",
    description: "They've seen your content or your offer. Something is stopping them. An objection, doubt, timing, or price.",
    whoLivesHere: "Retargeting audiences. People who've watched your videos, visited your page, or clicked an ad but didn't convert. Smaller audience, significantly higher intent.",
    whenToUse: "Retargeting campaigns. Much higher conversion rates. This is where you resolve the objection and make the decision easy. Direct offer only.",
    commonMistake: "Re-explaining what you do. They already know. They need their objection resolved and a reason to act now.",
    hookStrategy: "Address the objection head-on. Name the thing stopping them, then dismantle it with proof and risk reversal.",
    bestModes: ["direct"]
  },
  {
    id: "most_aware", level: 5, label: "Most Aware",
    tagline: "They know you and your offer. They just need a reason to act now.",
    description: "They're warm. They've been following you, they trust you. They just need urgency, a new result, or a final push.",
    whoLivesHere: "Your existing community, email list, past buyers. Tiny audience, highest conversion rate of any stage.",
    whenToUse: "Launches, promos, re-engagement. Keep it short. Get straight to the reason to act now. Skip all education.",
    commonMistake: "Over-explaining to someone who already knows. Length kills urgency here. Get in, make the case, get out.",
    hookStrategy: "Lead straight to the offer. Use scarcity, urgency, or a new result. Don't re-explain what you do.",
    bestModes: ["direct"]
  }
];

export const SOPHISTICATION_LEVELS = [
  { id: "low", label: "Fresh Market", description: "Your niche hasn't seen many offers like yours. A simple, direct claim works.", hookMod: "Make a bold, direct promise. The market hasn't heard it yet, so it lands hard." },
  { id: "medium", label: "Competitive Market", description: "Your niche has seen similar offers. You need a unique mechanism to stand out.", hookMod: "Lead with what makes your method different. Name your system. Contrast it against the norm." },
  { id: "high", label: "Saturated Market", description: "Your niche has seen everything. Jaded buyers need a completely new angle.", hookMod: "Lead with a counterintuitive idea, a surprising result, or a disruptive belief. Avoid any claim they've heard before." }
];

export const FRAMEWORKS = {
  direct_short: {
    id: "direct_short", mode: "direct", label: "Direct Offer (Short)",
    description: "Gets to the offer fast. Best for warm or solution-aware audiences.",
    steps: [
      { id: "hook", label: "Hook", tip: "Stop the scroll in 3 seconds. Call out your exact target or their #1 pain. Never open with 'I'.", placeholder: "e.g. If you're a PT stuck charging $60 an hour with no way to scale...", example: "If you're a PT stuck charging $60 an hour with no way to scale, this is for you." },
      { id: "promise_risk", label: "Promise + Risk Reversal", tip: "Bold specific promise first. Then kill the risk with a guarantee. The bolder the promise, the stronger the reversal needs to be.", placeholder: "e.g. I'll get you signing 3 new online clients a month, or you don't pay.", example: "I'll show you how to sign 3 to 5 online clients every month, guaranteed, or I'll refund every cent." },
      { id: "qualify", label: "Qualify", tip: "Who is this for and who isn't it for? Filtering out the wrong people increases close rate and saves your time.", placeholder: "e.g. This is for PTs already working with clients who want to move online...", example: "This is for coaches already working with clients who are serious about building an online income." },
      { id: "proof", label: "Proof", tip: "One strong result. Real name, specific outcome, timeframe. Numbers beat adjectives every time.", placeholder: "e.g. Last month, James went from 4 clients to 14 in 8 weeks.", example: "Last month, Tom went from 5 local clients to 14 online clients and his first $10k month in 9 weeks." },
      { id: "cta", label: "Call to Action", tip: "One action only. Match the verbal CTA to your destination. Choose from the options below or write your own.", placeholder: "e.g. Click the link below to apply for a free strategy call...", example: "", ctaOptions: "direct" }
    ]
  },
  direct_long: {
    id: "direct_long", mode: "direct", label: "Direct Offer (Long)",
    description: "More trust-building before the ask. Best for higher-ticket or product-aware audiences.",
    steps: [
      { id: "hook", label: "Hook", tip: "Call out the exact person you want watching. Make it feel personal.", placeholder: "e.g. If you're a PT tired of trading hours for dollars...", example: "If you're a personal trainer stuck at a ceiling, working more hours than you want and earning less than you deserve, keep watching." },
      { id: "introduce_yourself", label: "Introduce Yourself", tip: "One or two sentences. Who you are and why you're credible to solve this specific problem.", placeholder: "e.g. My name is Jake, I've helped 50+ PTs go online...", example: "My name is Jake. I've been coaching online for 5 years and helped over 50 PTs build six-figure online businesses." },
      { id: "promise_risk", label: "Promise + Risk Reversal", tip: "Big promise first. Kill the risk immediately. The guarantee should be as bold as the promise.", placeholder: "e.g. I can show you how to sign 3 new online clients a month, or I'll refund you.", example: "I can show you how to consistently sign online clients every month, or I'll give you a full refund. No questions asked." },
      { id: "introduce_method", label: "Introduce Your Method", tip: "Name your system. Explain what makes it different. The mechanism separates you from every other coach making the same promise.", placeholder: "e.g. The Freedom Coach Method is a 3-step system that...", example: "The Freedom Coach Method is a 3-part system built for PTs, covering your offer, your outreach, and your delivery so you can scale without burning out." },
      { id: "qualify", label: "Qualify", tip: "Be honest about who this is and isn't for. It builds trust and improves lead quality.", placeholder: "e.g. This is for PTs already working with clients who want to move online...", example: "This is for coaches already in the game who want to build something bigger online. Not for complete beginners." },
      { id: "proof_1", label: "Proof #1", tip: "Strong client result. Specific name, numbers, timeframe. Paint the before and after.", placeholder: "e.g. James came to me with 3 local clients and no online presence...", example: "James came to me working 45 hours a week with 6 clients. Ten weeks later he had 16 online clients and was earning $13k a month." },
      { id: "proof_2", label: "Proof #2", tip: "Second result, different angle or client type. Builds pattern recognition.", placeholder: "e.g. Sarah was on the verge of quitting PT altogether...", example: "Sarah was burning out and close to leaving the industry. Now she coaches 20 clients online from anywhere and earns more than she ever did in a gym." },
      { id: "cta", label: "Primary CTA", tip: "Clear, low friction, one action. Match the verbal CTA to your destination.", placeholder: "e.g. Click the link below and book your free call...", example: "", ctaOptions: "direct" },
      { id: "cta_2", label: "Secondary CTA", tip: "Reinforce the same action a different way. Address a final hesitation or add urgency. Never introduce a second destination.", placeholder: "e.g. If you've been on the fence, now is the time. The link is below.", example: "", ctaOptions: "direct_secondary" }
    ]
  },
  hso_direct: {
    id: "hso_direct", mode: "direct", label: "HSO (Hook, Story, Offer)",
    description: "Builds trust through story before selling. Great for problem-aware or product-aware audiences.",
    steps: [
      { id: "hook", label: "Hook", tip: "A bold statement, relatable situation, or surprising moment. Make them need to hear what comes next.", placeholder: "e.g. I almost quit coaching before I figured this out...", example: "I was two weeks away from shutting down my coaching business when everything changed." },
      { id: "story_before", label: "The Before", tip: "Paint the before state in their words. The pain, frustration, the stuck feeling. Make it feel like you're describing their life.", placeholder: "e.g. I was posting every day, grinding, and had almost nothing to show for it...", example: "I'd been posting every day for 18 months. Working 60-hour weeks. Taking every client I could. Still barely making rent." },
      { id: "story_turn", label: "The Turning Point", tip: "The moment of change. What did you discover, try, or realise? Specific and believable.", placeholder: "e.g. Then I stopped trying to grow an audience and started making direct offers...", example: "Then I stopped trying to go viral and made my first direct offer to 200 followers. I signed 4 clients in a week." },
      { id: "story_after", label: "The After", tip: "What does life look like now? Be specific. This is the desire you're selling.", placeholder: "e.g. Now I sign clients every month without ads, without going viral...", example: "Now I sign clients consistently every month, work when I want, from wherever I want, and earn more than I ever did in a gym." },
      { id: "offer", label: "Offer + CTA", tip: "Bridge the story to your offer naturally. Then close with the CTA matched to your destination.", placeholder: "e.g. That's why I built [your method]. Click the link below and let's talk...", example: "", ctaOptions: "direct" }
    ]
  },
  pas_direct: {
    id: "pas_direct", mode: "direct", label: "PAS (Problem, Agitate, Solution)",
    description: "Meets them in their pain and leads to relief. Great for problem or solution-aware audiences.",
    steps: [
      { id: "problem", label: "Problem", tip: "Name the exact problem your audience is experiencing right now. The more precisely you name it, the more they feel understood.", placeholder: "e.g. Most PTs are stuck trading hours for dollars with no way to scale...", example: "Most personal trainers hit a ceiling. There are only so many hours in a day and only so much you can charge per session." },
      { id: "agitate", label: "Agitate", tip: "Make the problem feel real and costly. What does it cost them in time, money, freedom, missed life? Don't lecture, just reflect the truth.", placeholder: "e.g. You're exhausted, you can't take holidays without your income dropping...", example: "You're working 50-hour weeks. You haven't had a proper holiday in years. And every time a client cancels, you feel it. Meanwhile coaches with half your experience earn double online." },
      { id: "solution", label: "Solution + CTA", tip: "Present your offer as the direct relief to everything they just felt. Make the transition feel inevitable.", placeholder: "e.g. [Your method] solves this by... Click the link below to find out how.", example: "", ctaOptions: "direct" }
    ]
  },
  big_domino: {
    id: "big_domino", mode: "direct", label: "Big Domino",
    description: "One core belief that, if established, makes your offer inevitable. Best for skeptical or unaware audiences.",
    steps: [
      { id: "domino_belief", label: "The One Belief", tip: "What single belief, if your prospect truly held it, would make saying yes to your offer completely obvious? Start there.", placeholder: "e.g. If you believe your knowledge is worth more than an hourly rate...", example: "If you genuinely believe the expertise in your head is worth $3k, $5k, even $10k to the right person, then building an online business becomes completely obvious." },
      { id: "challenge_old_belief", label: "Challenge the Old Belief", tip: "What false belief is blocking them right now? Name it and dismantle it with logic or evidence.", placeholder: "e.g. Most PTs think you need 100k followers to sell premium coaching. You don't...", example: "Most coaches think you need a massive following to charge premium prices. I had under 2000 followers when I hit my first $10k month." },
      { id: "new_story", label: "Build the New Story", tip: "Replace the old belief with evidence and a new frame. Proof plus logic. Show them the world through your lens.", placeholder: "e.g. What you actually need is a clear offer, a direct message, and a system...", example: "What you actually need is a clear offer, a direct message, and a repeatable system. That's it. I've seen it work for 50 plus coaches across every niche." },
      { id: "cta", label: "CTA", tip: "Now that the belief is shifted, the action should feel like a natural conclusion, not a pitch.", placeholder: "e.g. If that shifted something for you, click the link below and let's talk.", example: "", ctaOptions: "direct" }
    ]
  },
  aida_direct: {
    id: "aida_direct", mode: "direct", label: "AIDA",
    description: "Classic four-part arc. Works across all awareness levels with the right hook.",
    steps: [
      { id: "attention", label: "Attention", tip: "Grab them in the first second. Bold claim, surprising stat, provocative question. Interrupt the scroll.", placeholder: "e.g. Most PTs who try to go online fail in the first 6 months...", example: "Most personal trainers who try to go online give up within 6 months." },
      { id: "interest", label: "Interest", tip: "Build curiosity. Tease what's coming. Why should they keep watching?", placeholder: "e.g. But the ones who succeed all have one thing in common...", example: "But the ones who make it all have one thing in common, and it's not followers, ads, or even a great product." },
      { id: "desire", label: "Desire", tip: "Paint the outcome in vivid, specific terms. Make it tangible.", placeholder: "e.g. Imagine signing 3 to 5 new clients every month, working from anywhere...", example: "Imagine signing clients consistently every month, working from wherever you want, earning more than you ever did in person." },
      { id: "action", label: "Action", tip: "One clear instruction matched to your destination.", placeholder: "e.g. Click the link below to get access...", example: "", ctaOptions: "direct" }
    ]
  },
  follow_value_promise: {
    id: "follow_value_promise", mode: "follower", label: "Value Promise",
    description: "The simplest follow ad. Name who you help, the pain you speak to, what you post about, and ask for the follow.",
    steps: [
      { id: "hook", label: "Hook", tip: "Call out the exact person you want following you. Be specific enough that the wrong person self-selects out.", placeholder: "e.g. If you're a PT trying to figure out how to go online...", example: "If you're a personal trainer who wants to go online but has no idea where to start, this is for you." },
      { id: "pain_desire", label: "Their Pain or Desired Outcome", tip: "Name the specific thing they're struggling with or the outcome they want. This is what your content speaks to. Be precise, not broad.", placeholder: "e.g. The struggle: stuck trading hours for dollars, no system, no scale...", example: "You're probably grinding through 50-hour weeks wondering if there's a better way. Working harder isn't the answer. The model needs to change." },
      { id: "content_promise", label: "What You Post About", tip: "Tell them exactly what they'll get if they follow you. Topics, frequency, format. Make it feel like an obvious yes.", placeholder: "e.g. I post daily on how to build an online coaching business without a big following...", example: "I post every day on how to sign online coaching clients, build a scalable offer, and create income that doesn't depend on you showing up in a gym." },
      { id: "credibility", label: "Why You (Brief)", tip: "One sentence of credibility. Not a bio, just enough to establish you're worth following.", placeholder: "e.g. I've helped 50+ PTs go from local coaching to full-time online income.", example: "I've helped over 50 PTs build online coaching businesses from scratch, many from zero followers." },
      { id: "cta_follow", label: "Follow CTA", tip: "The only CTA is the follow. Tie it back to their pain or outcome. Choose from the options below or write your own.", placeholder: "Write your follow CTA here...", example: "", ctaOptions: "follower" }
    ]
  },
  follow_contrarian: {
    id: "follow_contrarian", mode: "follower", label: "Contrarian Hook",
    description: "Challenge a common belief in your niche. Position yourself as the person who tells the truth others won't.",
    steps: [
      { id: "hook", label: "Contrarian Hook", tip: "Challenge something your audience believes that's keeping them stuck. Be direct, not diplomatic.", placeholder: "e.g. You don't need more followers to sign high-ticket clients...", example: "You don't need 10,000 followers to build a six-figure coaching business. That's the advice keeping most PTs broke." },
      { id: "why_theyre_wrong", label: "Why the Common Belief Is Wrong", tip: "Back up your contrarian claim with a specific reason or example. This is where you build credibility fast.", placeholder: "e.g. Most coaches chase content reach before they have a proven offer...", example: "Most coaches spend months building an audience before they have a working offer. Then they launch to crickets. The audience was never the problem." },
      { id: "what_actually_works", label: "What Actually Works", tip: "Give them the real answer. Brief, specific, and tied directly to your content. This is the value that earns the follow.", placeholder: "e.g. What actually works is a direct offer to a small, targeted audience...", example: "What actually works is a direct offer to a small specific audience. I signed my first 5 online clients with under 300 followers using this exact approach." },
      { id: "content_promise", label: "Content Promise", tip: "What do you post about? Tie it directly to the belief you just challenged.", placeholder: "e.g. I post daily on the stuff nobody else in this space is talking about...", example: "I post daily on what's actually working for online coaches right now. No fluff, no theory, just what's getting results." },
      { id: "cta_follow", label: "Follow CTA", tip: "The only CTA is the follow.", placeholder: "Write your follow CTA here...", example: "", ctaOptions: "follower" }
    ]
  },
  follow_story: {
    id: "follow_story", mode: "follower", label: "Story to Follow",
    description: "A mini HSO where the offer is your account. Best for audiences who need to see themselves in you first.",
    steps: [
      { id: "hook", label: "Hook", tip: "Open on a moment or a before state your audience will immediately recognise in themselves.", placeholder: "e.g. Two years ago I was working 60-hour weeks and couldn't afford a holiday...", example: "Two years ago I was working 60-hour weeks, had 8 clients, and hadn't taken a proper holiday in over a year." },
      { id: "story", label: "The Story", tip: "Short version of your journey. Specific, honest, relatable. Make it feel like their story.", placeholder: "e.g. I tried everything. More clients, group sessions, online programs that flopped...", example: "I tried everything. More clients. Group sessions. An online program that made me $400. Then I stopped guessing and built a proper system. Now I coach 20 clients online from wherever I want." },
      { id: "bridge", label: "The Bridge", tip: "Connect your story to what you now post about. Why does your experience make your content worth following?", placeholder: "e.g. Now I document everything I learn about building an online coaching business...", example: "Now I document everything I learn about building a location-independent coaching business, the exact stuff I wish I'd known two years ago." },
      { id: "content_promise", label: "Content Promise", tip: "What will they get from following you? Specific topics, daily or regular posting, real value.", placeholder: "e.g. I post daily on offers, outreach, and building an online income as a PT...", example: "I post every day on how to sign online clients, build an offer that sells, and create income that works without you being stuck in a gym." },
      { id: "cta_follow", label: "Follow CTA", tip: "Direct, simple. One ask.", placeholder: "Write your follow CTA here...", example: "", ctaOptions: "follower" }
    ]
  },
  follow_content_preview: {
    id: "follow_content_preview", mode: "follower", label: "Content Preview",
    description: "Show them a real sample of your content or thinking. Let the value speak, then ask for the follow.",
    steps: [
      { id: "hook", label: "Hook", tip: "Open with the most valuable thing you're about to share. Treat this like the first line of your best post.", placeholder: "e.g. Here are the 3 things that helped me go from 5 to 20 online clients...", example: "Here are the 3 things I did to go from 5 local clients to 20 online clients in under 6 months." },
      { id: "value_content", label: "The Value", tip: "Deliver the actual content. Real, specific, actionable. Don't hold back.", placeholder: "e.g. First: I stopped selling sessions and started selling outcomes. Second: I made direct offers...", example: "First, I stopped selling sessions and started selling outcomes. Second, I made direct offers instead of waiting for referrals. Third, I built a delivery system that didn't need me to show up every hour." },
      { id: "tie_to_content", label: "Tie It to Your Content", tip: "Tell them this is what you post about regularly. Connect the value you just gave to your ongoing content.", placeholder: "e.g. This is the kind of thing I share every day on my page...", example: "This is the kind of thing I post every single day. Real frameworks, real results, no recycled advice." },
      { id: "cta_follow", label: "Follow CTA", tip: "Simple. They already got value. Now just ask for the follow.", placeholder: "Write your follow CTA here...", example: "", ctaOptions: "follower" }
    ]
  },
  indirect_pas: {
    id: "indirect_pas", mode: "indirect", label: "PAS to Freebie",
    description: "Name the pain, agitate it, then present your free resource as the relief. Best for cold problem-aware audiences.",
    steps: [
      { id: "hook", label: "Hook", tip: "Name the pain immediately. Cold audiences need to feel seen before they'll care what you're offering.", placeholder: "e.g. Most PTs have no idea how to sign their first online client...", example: "Most personal trainers who try to go online have no idea how to sign their first client without a big following or a big ad budget." },
      { id: "agitate", label: "Agitate", tip: "Make the cost of the problem feel real. What are they missing or losing because they don't have the solution yet?", placeholder: "e.g. So they post content, get some likes, and wonder why nobody's buying...", example: "So they post content, get some likes, maybe a few comments, and then wonder why nobody's actually paying them. Months go by. Nothing changes." },
      { id: "introduce_freebie", label: "Introduce the Freebie", tip: "Present your free resource as the direct solution. Name it specifically. Make it sound valuable, not generic.", placeholder: "e.g. That's why I put together a free guide called...", example: "That's why I put together a free training called The First 5 Clients Formula, which shows you exactly how to sign your first online clients without running a single ad." },
      { id: "freebie_value", label: "What They'll Get", tip: "Two or three specific outcomes. Not features, outcomes. What will they know or be able to do after consuming it?", placeholder: "e.g. Inside you'll learn: how to write a direct offer that converts, how to find your first clients...", example: "Inside you'll learn how to write an offer that actually converts, where to find your first clients without ads, and how to close them on a call without feeling salesy." },
      { id: "cta_indirect", label: "CTA", tip: "One action. As low friction as possible. Match the language to your destination.", placeholder: "e.g. Click the link below to get instant access...", example: "", ctaOptions: "indirect" }
    ]
  },
  indirect_direct_value: {
    id: "indirect_direct_value", mode: "indirect", label: "Direct Value Offer",
    description: "Lead straight with the free resource and its value. Best for solution-aware audiences who are actively looking.",
    steps: [
      { id: "hook", label: "Hook", tip: "Lead with the free thing and what it does. Solution-aware audiences are actively looking, so get straight to the point.", placeholder: "e.g. I just put together a free training on how to sign 3 online clients in 30 days...", example: "I just put together a free training on how to sign your first 3 online coaching clients in 30 days, even if you have no following and no ad budget." },
      { id: "who_its_for", label: "Who It's For", tip: "Qualify them. Make them feel like it was built specifically for them.", placeholder: "e.g. This is for PTs who are already working with clients locally and want to move online...", example: "This is specifically for personal trainers who are already working with clients and want to build an online income without starting from scratch." },
      { id: "what_inside", label: "What's Inside", tip: "Specific outcomes only. Not 'you'll learn about X', but 'you'll walk away with Y'. Make the value feel concrete and immediate.", placeholder: "e.g. You'll walk away with a proven offer structure, a 5-step outreach sequence...", example: "You'll walk away with a proven offer structure that converts, a 5-step outreach sequence you can use this week, and the exact script I use on sales calls." },
      { id: "credibility", label: "Why Trust You", tip: "One sentence of proof. Specific numbers only.", placeholder: "e.g. I've used this system to help 50+ PTs sign their first online clients.", example: "I've used this exact system to help over 50 personal trainers sign their first online clients, most within the first 30 days." },
      { id: "cta_indirect", label: "CTA", tip: "One frictionless action. Match the language to your destination.", placeholder: "e.g. Click the link below to grab the free training...", example: "", ctaOptions: "indirect" }
    ]
  },
  indirect_hso: {
    id: "indirect_hso", mode: "indirect", label: "HSO to Resource",
    description: "Use a story to earn trust, then present your free resource as the natural next step.",
    steps: [
      { id: "hook", label: "Hook", tip: "Open on a relatable moment or surprising result. Make them need to hear what comes next.", placeholder: "e.g. I spent 18 months trying to go online before I figured out what was actually missing...", example: "I spent 18 months trying to build an online coaching business before I figured out the one thing I was getting completely wrong." },
      { id: "story", label: "The Story", tip: "Brief, specific, relatable. Your before state, what changed, your after state.", placeholder: "e.g. I was posting every day, trying every strategy I could find...", example: "I was posting every day. Trying every strategy I could find. Getting likes but no clients. Then I stopped trying to grow an audience and started making direct offers to a small targeted group. Everything changed." },
      { id: "lesson", label: "The Lesson", tip: "What did you learn? One clear insight that bridges your story to the freebie.", placeholder: "e.g. The lesson: you don't need a big audience to sign clients, you need a clear offer...", example: "The lesson: you don't need a big audience to sign clients. You need a clear offer, a direct message, and a simple system. That's it." },
      { id: "introduce_freebie", label: "Introduce the Freebie", tip: "Present your free resource as the packaged version of everything you just shared. Name it. Make it sound worth stopping for.", placeholder: "e.g. I took everything I learned and put it into a free training called...", example: "I took everything I learned and built it into a free training called The First Client Formula, so you don't have to spend 18 months figuring it out like I did." },
      { id: "cta_indirect", label: "CTA", tip: "One action. Simple and immediate.", placeholder: "Write your CTA here, e.g. Click the link below and get instant access...", example: "", ctaOptions: "indirect" }
    ]
  }
};

export const CTA_OPTIONS = {
  direct: {
    label: "Direct Offer CTA Options",
    note: "The verbal CTA in the video points to the destination. The button on the ad does the heavy lifting. Pick the language that matches where you're sending them.",
    groups: [
      {
        heading: "Booking or application page",
        options: [
          "Click the link below to apply for a free strategy call.",
          "Hit the link below and book your free call today.",
          "Click learn more below and let's get you started.",
          "The link below will take you straight to my calendar. Book a time that works for you.",
          "Click below, fill out the short application, and we'll talk this week."
        ]
      },
      {
        heading: "VSL or sales page",
        options: [
          "Click the link below and watch the free training that breaks down exactly how this works.",
          "Hit learn more below and I'll walk you through the whole thing.",
          "Click below and watch the video. It's about 20 minutes and worth every second.",
          "The full breakdown is in the link below. Click learn more and go watch it now."
        ]
      },
      {
        heading: "Organic post (comment keyword)",
        options: [
          "Comment [KEYWORD] below and I'll send you the details.",
          "Drop [KEYWORD] in the comments and I'll reach out directly.",
          "Comment [KEYWORD] and I'll send everything you need to get started.",
          "Type [KEYWORD] below and I'll be in your DMs within the hour."
        ]
      },
      {
        heading: "DM or Messenger flow",
        options: [
          "Click the link below and send me a message. Let's talk.",
          "Hit the button below and we can figure out if this is the right fit for you.",
          "Click below and shoot me a message. I reply to everyone personally."
        ]
      }
    ]
  },
  direct_secondary: {
    label: "Secondary CTA Options",
    note: "Reinforce the same destination a different way. Add urgency or address a final hesitation. Never introduce a second destination.",
    groups: [
      {
        heading: "Urgency and scarcity",
        options: [
          "Spots are limited and they go fast. The link is below.",
          "I only take a handful of new clients each month. If you're serious, click below now.",
          "This won't be open for long. Click the link below while it's still available."
        ]
      },
      {
        heading: "Address the hesitation",
        options: [
          "If you've been sitting on the fence, this is your sign. The link is below.",
          "If you're not sure if this is right for you, click below anyway. The worst that happens is you find out it's not.",
          "Still on the fence? Click below and watch the training. You can decide after."
        ]
      },
      {
        heading: "Simple repeat",
        options: [
          "The link is below. Go click it.",
          "Everything you need is in the link below.",
          "Click below and let's talk."
        ]
      }
    ]
  },
  follower: {
    label: "Follow Me CTA Options",
    note: "The only goal is the follow. No offer, no link, no pitch. Tie the follow directly back to their pain or desired outcome.",
    groups: [
      {
        heading: "Tie the follow to their pain or outcome",
        options: [
          "I post every day about [their pain or desired outcome]. If that sounds like you, follow me.",
          "Follow me if you're trying to [desired outcome] without [the thing they want to avoid].",
          "Every day I share [content topic]. If that's what you're working on, hit follow.",
          "If [pain point] is something you deal with, follow me. That's exactly what I talk about every day."
        ]
      },
      {
        heading: "Simple and direct",
        options: [
          "Follow me and I'll show you exactly how to do it.",
          "Hit follow. I post this level every single day.",
          "Follow me for more of this.",
          "If that was useful, follow me. There's a lot more where that came from."
        ]
      },
      {
        heading: "Contrarian or bold",
        options: [
          "Follow me if you want the version of this nobody else is showing you.",
          "Follow me if you're done with the recycled advice.",
          "If you want the truth about [topic], follow me. I post it daily."
        ]
      }
    ]
  },
  indirect: {
    label: "Indirect Offer CTA Options",
    note: "The risk reversal is implicit because it's free. Make the action sound easy and the value sound immediate.",
    groups: [
      {
        heading: "Paid ad, sending to a landing page",
        options: [
          "Click the link below to get free access.",
          "Hit learn more below and grab the free training.",
          "Click below and get instant access. It's completely free.",
          "The link below takes you straight to it. Click learn more and grab your copy.",
          "Click below, drop your email, and I'll send it straight to you."
        ]
      },
      {
        heading: "Organic post (comment keyword)",
        options: [
          "Comment [KEYWORD] below and I'll send it straight to your DMs.",
          "Drop [KEYWORD] in the comments and I'll send you the link.",
          "Comment [KEYWORD] and I'll get it to you within the hour.",
          "Type [KEYWORD] below and I'll send it over. It's free."
        ]
      },
      {
        heading: "Add what happens next",
        options: [
          "Click below, grab the free training, and you'll have the full framework in under 20 minutes.",
          "Hit learn more, drop your email, and I'll send it over immediately.",
          "Click the link below. It takes 30 seconds to get access and about 20 minutes to go through."
        ]
      }
    ]
  }
};

export const FRAMEWORKS_BY_MODE = {
  direct: ["direct_short", "direct_long", "hso_direct", "pas_direct", "big_domino", "aida_direct"],
  follower: ["follow_value_promise", "follow_contrarian", "follow_story", "follow_content_preview"],
  indirect: ["indirect_pas", "indirect_direct_value", "indirect_hso"]
};

export const RECOMMENDED = {
  direct: { unaware: ["big_domino", "aida_direct"], problem_aware: ["pas_direct", "hso_direct", "aida_direct"], solution_aware: ["direct_short", "direct_long", "pas_direct"], product_aware: ["direct_long", "direct_short", "hso_direct"], most_aware: ["direct_short", "direct_long"] },
  follower: { unaware: ["follow_contrarian", "follow_story"], problem_aware: ["follow_value_promise", "follow_story", "follow_contrarian"], solution_aware: ["follow_value_promise", "follow_content_preview"], product_aware: ["follow_content_preview", "follow_value_promise"], most_aware: ["follow_content_preview"] },
  indirect: { unaware: ["indirect_hso", "indirect_pas"], problem_aware: ["indirect_pas", "indirect_hso"], solution_aware: ["indirect_direct_value", "indirect_pas"], product_aware: ["indirect_direct_value"], most_aware: ["indirect_direct_value"] }
};

export function buildPrompt({ mode, stage, soph, dominantEmotion, fw, answers }) {
  const stepDetails = fw.steps.map(s => `${s.label}: ${answers[s.id] || "(not provided)"}`).join("\n");

  const modeInstructions = {
    direct: `This is a DIRECT OFFER ad. The goal is a sale, a booked call, or an application. Include a strong risk reversal somewhere in the script. For the CTA: use the exact CTA the user has written in their inputs verbatim. If they haven't written one, use natural spoken language pointing to the link below such as "Click the link below to apply" or "Hit the link below and book your free call." Do NOT use comment keyword mechanics unless the user explicitly wrote that in their CTA input, as those are for organic posts not paid ads.`,
    follower: `This is a FOLLOW ME ad. There is NO offer, NO pitch, NO product mention, and NO risk reversal. The entire goal is the follow. Use the CTA the user has written in their inputs. If they haven't written one, use a natural follow CTA tied directly back to their pain or desired outcome from earlier in the script such as "I post every day about [their topic]. If that sounds like you, follow me." Keep it conversational. This is not a sales ad.`,
    indirect: `This is an INDIRECT OFFER ad for a free resource, lead magnet, or free training. It is free so the risk reversal is implicit, do not overstate it. Use the CTA the user has written in their inputs. If they haven't written one, use natural spoken language pointing to the destination such as "Click the link below to get free access" or "Hit learn more and grab the free training." Only use comment keyword mechanics if the user explicitly wrote that in their CTA input. Never pitch a paid offer in this script.`
  };

  return `You are an expert direct response copywriter trained in Eugene Schwartz's Breakthrough Advertising principles.

AD MODE: ${mode?.label}
${modeInstructions[mode?.id]}

CONTEXT:
- Market Awareness Stage: ${stage?.label || "not specified"} (${stage?.description || ""})
- Market Sophistication: ${soph?.label || "not specified"} (${soph?.description || ""})
- Dominant Emotion the prospect is feeling: "${dominantEmotion || "not specified"}"
- Framework: ${fw.label}
- Hook Strategy: ${stage?.hookStrategy || "lead with the audience's pain or desired outcome"}
- Sophistication Hook Adjustment: ${soph?.hookMod || "match the approach to the market"}

USER'S INPUTS:
${stepDetails}

STRICT COPY RULES:
- No em dashes or en dashes. Use commas instead.
- Rule of One: one person, one problem, one promise, one CTA.
- Never open with "I". Lead with the audience.
- Specificity beats adjectives. Use numbers, names, timeframes.
- One CTA only. Never give options.
- Write for spoken word. Short sentences. Natural rhythm. No corporate language.
- Do NOT add any preamble or explanation. Return only the script.

FORMAT: Label each section in brackets matching the ${fw.label} framework. Write spoken copy beneath each label.

After the script, add [STRATEGY NOTES] with: 1) Why this approach fits the awareness stage and ad mode, 2) One thing to test in a second version, 3) One copy rule to watch when recording.`;
}
