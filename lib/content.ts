export const MEMBERSHIP = {
  name: "BIAB Membership",
  price: "CHF 300",
  unit: "/month",
  features: [
    "Access to your Business Box",
    "Tools and systems",
    "Business resources",
    "Training",
    "Community",
    "Ongoing updates",
    "Support",
  ],
} as const;

export const WEBSITE_BOX_EXAMPLE = {
  name: "Website Box",
  description:
    "250 scored Swiss trade-business leads every month. Real companies. Outdated websites. Ready to pitch.",
  pricing: "CHF 300/month solo, CHF 250/person as a Duo.",
} as const;

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Choose your business",
    description:
      "Pick a Business Box that matches what you want to build. You don't need to invent the business model yourself.",
  },
  {
    step: "02",
    title: "Get your system",
    description:
      "Your Box gives you the processes, tools, templates, training and resources needed to operate.",
  },
  {
    step: "03",
    title: "Start building",
    description:
      "Reach out to potential customers, hold meetings, make offers and deliver your service.",
  },
  {
    step: "04",
    title: "Improve and grow",
    description:
      "Use the community, new resources and additional Boxes to keep developing your business.",
  },
] as const;

export const WHAT_YOU_GET = [
  {
    title: "Qualified opportunities",
    description:
      "Start with companies and potential customers that actually fit what you're selling.",
  },
  {
    title: "Sales systems",
    description:
      "Use structured approaches for prospecting, appointment setting, meetings, offers and follow-ups.",
  },
  {
    title: "Business tools",
    description:
      "Work with simple tools such as CRM systems and operational workflows without immediately paying for an expensive software stack.",
  },
  {
    title: "Templates",
    description:
      "Contracts, offers, presentations, emails, documents and other resources you would otherwise have to create yourself.",
  },
  {
    title: "Training",
    description:
      "Understand what you're selling, how to deliver it and how to improve.",
  },
  {
    title: "Ongoing support",
    description:
      "Get help when you're stuck instead of spending days searching for answers.",
  },
] as const;

export const FAQS = [
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
