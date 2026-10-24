export const LAUNCH = {
  date: "2027-01-07",
  label: "7 January 2027",
  waitlistCloses: "31 December 2026",
} as const;

export const FACTS = [
  { value: "150", label: "new scored Swiss business leads per month with Solo · 250 with Duo" },
  { value: "26", label: "cantons covered" },
  { value: "1 or 2", label: "people per business — start Solo or as a Duo" },
  { value: "7 Jan", label: "2027 — launch day. The waitlist is open until 31 December" },
] as const;

export const PLAN_FEATURES = [
  "AI automation systems to sell",
  "Outreach scripts & email templates",
  "CRM to track every contact",
  "Offer, contract & pricing templates",
  "Training on selling & delivering AI automation systems",
  "Community & direct support",
  "Cancel anytime",
] as const;

export const PLANS = [
  {
    name: "Solo",
    price: "CHF 250",
    regularPrice: "CHF 300",
    leadFeature: "150 new scored leads every month",
    unit: "/month",
    tagline: "You own the whole loop — from first email to an AI automation system in use.",
    cta: "Start Solo",
    highlight: false,
  },
  {
    name: "Duo",
    price: "CHF 200",
    regularPrice: "CHF 250",
    leadFeature: "250 new scored leads every month, shared between two people",
    unit: "/person/month",
    tagline: "Two people, one business. Split the work by skill — one sells, one builds.",
    cta: "Start as a Duo",
    highlight: true,
  },
] as const;

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Get your leads",
    description:
      "Every month, get 150 new leads with Solo or 250 as a Duo. Real Swiss businesses — Sanitär, Elektro, Malerei, Garten and more — ranked to help you choose who to contact about AI automation.",
  },
  {
    step: "02",
    title: "Reach out",
    description:
      "Use the scripts and email templates to ask about repetitive tasks in their business. Track every contact in your CRM.",
  },
  {
    step: "03",
    title: "Close the project",
    description:
      "Run the meeting, send a clear offer from our templates and agree on a price — with guidance on what to charge.",
  },
  {
    step: "04",
    title: "Deliver & get paid",
    description:
      "Install the system at your client's business, the way you learned it in the training, and hand it over. Then repeat with next month's leads.",
  },
] as const;

export const PROBLEM_AREAS = [
  {
    title: "Missed calls and enquiries",
    problem:
      "The owner is on a job site or with a customer. The phone rings, nobody answers, and the customer calls the next company.",
    result: "Every missed call or enquiry gets a reply within minutes and a way to book a time.",
    industries: "Trades · Practices · Home services",
  },
  {
    title: "Quotes nobody follows up",
    problem:
      "A business sends out quotes every week and then hears nothing back. Nobody has time to follow up, so jobs are lost quietly.",
    result: "Every quote gets friendly follow-ups at the right moments, until the customer decides.",
    industries: "Roofers · Painters · Gardeners",
  },
  {
    title: "Happy customers, no reviews",
    problem:
      "Customers are satisfied but rarely leave a review. New customers compare companies online and choose the one with more.",
    result: "After each job, customers get a personal request to leave a review, at the right time.",
    industries: "Restaurants · Salons · Garages",
  },
] as const;

export const DIVISION = {
  biab: [
    "Working AI automation systems you can use and extend",
    "Training on how to install them at a client's business",
    "A detailed plan with clear processes, from first contact to paid project",
    "Leads, scripts, a CRM and templates",
    "Support and a community while you learn",
  ],
  you: [
    "Contact businesses and lead the conversations",
    "Install the system for your client, the way you learned it",
    "Look after your clients and grow your business",
  ],
} as const;

export const MILESTONES = [
  {
    title: "Understand the offer",
    text: "Learn what the AI automation systems do, who they help and how to explain them in plain words.",
  },
  {
    title: "Have your first conversations",
    text: "Contact your first leads and hold your first discovery calls. Hearing no at this stage is normal.",
  },
  {
    title: "Deliver your first project",
    text: "Agree a first project with a client and see it through until the system is in use.",
  },
  {
    title: "Repeat and improve",
    text: "Use what you learned, ask happy clients for referrals and build from there.",
  },
] as const;

export const WHAT_YOU_GET = [
  {
    title: "Qualified opportunities",
    description:
      "Start with real companies that fit what you're selling — not a cold list of random emails.",
  },
  {
    title: "Sales systems",
    description:
      "Structured approaches for prospecting, appointment setting, meetings, offers and follow-ups.",
  },
  {
    title: "Business tools",
    description:
      "A simple CRM and workflows, without paying for an expensive software stack on day one.",
  },
  {
    title: "Templates",
    description:
      "Contracts, offers, presentations and emails you would otherwise have to write yourself.",
  },
  {
    title: "Training",
    description:
      "Understand what you're selling, how to price it, how to deliver it and how to improve.",
  },
  {
    title: "Ongoing support",
    description:
      "Get help when you're stuck instead of spending days searching for answers.",
  },
] as const;

export const FAQS = [
  {
    q: "What do I get on the waitlist?",
    a: "The founding member price, the first training module in December, and an email update every two weeks until launch: what we're building, what's inside the Box and practical tips on AI automation. You can unsubscribe at any time.",
  },
  {
    q: "What is the founding member price?",
    a: "Everyone who joins the waitlist before 31 December 2026 and starts by 31 January 2027 pays CHF 250/month Solo or CHF 200/person/month as a Duo, instead of CHF 300 and CHF 250. The price stays the same for as long as you remain a member. If you cancel and come back later, the regular price applies.",
  },
  {
    q: "What business do I actually start?",
    a: "You build your own business selling AI automation systems to other businesses. BIAB gives you working systems that you can use, extend and offer to your clients, plus leads, sales scripts, a CRM, templates and training. You contact businesses, agree the work and install the system for your client.",
  },
  {
    q: "When does BIAB launch?",
    a: "On 7 January 2027. Until 31 December 2026 you can join the waitlist for free. People on the waitlist hear from us first when BIAB opens. Joining doesn't commit you to anything and you don't pay anything now.",
  },
  {
    q: "Can I join from outside Switzerland?",
    a: "Yes, you can join the waitlist from anywhere. When you sign up, choose your country with your phone number so we know where you're joining from.",
  },
  {
    q: "Do I have to build the systems myself?",
    a: "No. You receive working AI automation systems, not a blank page. You can use them as they are or extend them for your clients. The training shows you step by step how to install them at a client's business.",
  },
  {
    q: "Do I need to know how to code?",
    a: "You don't need a programming background. You do need to be willing to learn new software and to follow the training closely. The goal is that you can install and look after the systems on your own.",
  },
  {
    q: "Who helps me if something doesn't work?",
    a: "While you learn, you have BIAB support and the community. Over time you become independent: you install, adapt and look after the systems for your clients yourself.",
  },
  {
    q: "Is BIAB a course?",
    a: "No. Education is part of BIAB, but BIAB is built around execution. You receive tools, processes, templates, resources and depending on the Box, qualified business opportunities that help you actually operate your business.",
  },
  {
    q: "Does BIAB guarantee that I'll make money?",
    a: "No. Nobody can honestly guarantee that. Your results depend on your execution, market, ability to sell, quality of work and many other factors. BIAB gives you infrastructure and a starting advantage. You still have to build the business.",
  },
  {
    q: "Could I build all of this myself?",
    a: "Yes. Almost everything can be learned or built independently. BIAB exists to save you the time, cost and trial-and-error involved in putting everything together yourself.",
  },
  {
    q: "Do I need previous business experience?",
    a: "No. The system is designed so that people without years of entrepreneurial experience can understand how to get started. You do, however, need to be willing to learn and execute.",
  },
  {
    q: "Do I need a lot of starting capital?",
    a: "BIAB is specifically designed to keep the barrier to entry relatively low. Exact costs depend on the business you choose and how you decide to operate it.",
  },
  {
    q: "Do I need to quit my job?",
    a: "No. Many businesses can initially be built alongside employment, studies or another main occupation. How much time you invest is your decision.",
  },
  {
    q: "Can I start with someone else?",
    a: "Yes. You can use BIAB with a business partner or build together as a team.",
  },
  {
    q: "What happens when I already know how to run the business?",
    a: "Then BIAB should increasingly become infrastructure rather than education. Use the resources, systems, community and opportunities that continue to provide value while your business grows.",
  },
  {
    q: "Why would I stay subscribed?",
    a: "BIAB is designed to provide ongoing value through resources, tools, updates, community, support and depending on your Box, continuously relevant business opportunities. The goal is not to trap you in a subscription. The goal is to remain useful.",
  },
  {
    q: "Is this another get-rich-quick platform?",
    a: "No. If that's what you're looking for, BIAB is probably the wrong product. We're interested in helping people build real businesses that solve real problems for real customers.",
  },
] as const;
