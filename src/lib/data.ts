import { CallStatusEnum } from "@prisma/client";

export const sidebarData = [
  {
    id: 1,
    title: "Home",
    icon: "home",
    link: "/home",
  },
  {
    id: 2,
    title: "Webinars",
    icon: "webinar",
    link: "/webinars",
  },
  {
    id: 3,
    title: "Leads",
    icon: "leads",
    link: "/leads",
  },
  {
    id: 4,
    title: "AI Agents",
    icon: "ai-agent",
    link: "/ai-agents",
  },
  {
    id: 5,
    title: "Settings",
    icon: "settings",
    link: "/settings",
  },
];

export const onBoardingSteps = [
  { id: 1, title: "Create a webinar", complete: false, link: "" },
  { id: 2, title: "Get leads", complete: false, link: "" },
  { id: 3, title: "Conversion status", complete: false, link: "" },
];

export const potentialCustomer = [
  {
    id: "1",
    name: "John Doe",
    email: "johndoe@gmail.com",
    clerkId: 1,
    profileImage: "/vercel.svg",
    isActive: true,
    lastLoginAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    tags: ["New", "Hot Leads"],
    callStatus: CallStatusEnum.COMPLETED,
  },
  {
    id: "2",
    name: "John Doe",
    email: "johndoe@gmail.com",
    clerkId: 1,
    profileImage: "/vercel.svg",
    isActive: true,
    lastLoginAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    tags: ["New", "Hot Leads"],
    callStatus: CallStatusEnum.COMPLETED,
  },
  {
    id: "3",
    name: "John Doe",
    email: "johndoe@gmail.com",
    clerkId: 1,
    profileImage: "/vercel.svg",
    isActive: true,
    lastLoginAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    tags: ["New", "Hot Leads"],
    callStatus: CallStatusEnum.COMPLETED,
  },
];

export const subscriptionPriceId = `price_1N4tY2K0b8Yk1JzXhXhXhXhX`;

export const aiAgentPrompt = `# Lead
## Scenario Handling

### For Interested But Busy Prospects
1. Acknowledge their interest and busy schedule.
2. Offer to send more information via email or schedule a follow-up call at their convenience.

### For Price-Sensitive Prospects
1. Highlight the value and ROI of our product.
2. Mention any available discounts, payment plans, or financing options.

### For Competitor Comparison
1. Emphasize our unique selling points and advantages over competitors.
2. Provide testimonials or case studies that showcase our product's effectiveness.

### For Indecisive Prospects
1. Ask open-ended questions to understand their concerns better.
2. Offer a free trial or demo to help them experience the product firsthand.

### For Technical Concerns
1. Provide detailed technical information and specifications.
2. Offer to connect them with a technical expert for further discussion.

### For General Objections
1. Listen actively and empathize with their concerns.
2. Address each objection with clear, concise, and relevant information.

## Closing Techniques
1. Summarize the key benefits discussed during the conversation and how they align with the prospect's needs.
2. Create a sense of urgency by mentioning limited-time offers or upcoming price increases.
3. Ask for the sale directly, using assumptive language that presumes the prospect is ready to move forward.
4. Offer multiple options for moving forward, such as different packages or payment plans, to make it easier for the prospect to say yes.
5. Follow up promptly after the call with a personalized email summarizing the discussion and next steps.  
`;
