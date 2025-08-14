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
