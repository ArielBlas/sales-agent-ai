import { Assistant } from "@vapi-ai/server-sdk/api";
import { create } from "zustand";

type AiAgentStore = {
  assistant: Assistant | null;
  setAssistant: (assistant: Assistant | null) => void;
  clearAiAgentStore: () => void;
};

export const useAiAgentStore = create<AiAgentStore>((set) => ({
  assistant: null,
  setAssistant: (assistant) => set({ assistant }),
  clearAiAgentStore: () => set({ assistant: null }),
}));
