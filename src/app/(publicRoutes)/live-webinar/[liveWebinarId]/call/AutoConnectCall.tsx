"use client";
import React, { useEffect, useState } from "react";
import { WebinarWithPresenter } from "@/lib/type";

const CallStatus = {
  CONNECTING: "CONNECTING",
  ACTIVE: "ACTIVE",
  FINISHED: "FINISHED",
};

type Props = {
  userName?: string;
  assistantId: string;
  assistantName?: string;
  callTimeLimit?: number;
  webinar: WebinarWithPresenter;
  userId: string;
};

const AutoConnectCall = ({
  userName = "User",
  assistantId,
  assistantName = "Ai Assistant",
  callTimeLimit = 180,
  webinar,
  userId,
}: Props) => {
  const [callStatus, setCallStatus] = useState<string>(CallStatus.CONNECTING);
  const [assistantIsSpeaking, setAssistantIsSpeaking] =
    useState<boolean>(false);
  const [userIsSpeaking, setUserIsSpeaking] = useState<boolean>(false);
  const [micMuted, setMicMuted] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(callTimeLimit);

  useEffect(() => {
    const onCallStart = async () => {
      console.log("Call started");
      setCallStatus(CallStatus.ACTIVE);
      setupAudio();

      // Start countdown timer
      setTimeRemaining(callTimeLimit);
      refs.current.countdownTimer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(refs.current.countdownTimer);
            stopCall();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    };
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-background"></div>
  );
};

export default AutoConnectCall;
