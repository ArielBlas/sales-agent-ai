"use client";
import { Assistant } from "@vapi-ai/server-sdk/api";
import React, { useState } from "react";

type Props = {
  aiAgents: Assistant[] | [];
};

const AiAgentSidebar = ({ aiAgents }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { assistant, setAssistant } = useAiAgentStore();

  return <div>AiAgentSidebar</div>;
};

export default AiAgentSidebar;
