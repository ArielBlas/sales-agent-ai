"use server";

import { vapiServer } from "@/lib/vapi/vapiServer";

export const getAllAssistants = async () => {
  try {
    const getAllAgents = await vapiServer.assistants.list();
    return {
      success: true,
      status: 200,
      data: getAllAgents,
    };
  } catch (error) {
    console.error("Error fetching assistants:", error);
    return {
      success: false,
      status: 500,
      message: "Error fetching assistants",
    };
  }
};
