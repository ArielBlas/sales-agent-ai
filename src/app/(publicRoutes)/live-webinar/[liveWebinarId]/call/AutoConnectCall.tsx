"use client";
import React, { useEffect, useRef, useState } from "react";
import { WebinarWithPresenter } from "@/lib/type";
import { vapi } from "@/lib/vapi/vapiclient";
import { toast } from "sonner";
import { changeCallStatus } from "@/actions/attendance";
import { CallStatusEnum } from "@prisma/client";

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
  const [isMicMuted, setIsMicMuted] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(callTimeLimit);
  const refs = useRef({
    countdownTimer: undefined as NodeJS.Timeout | undefined,
    audioStream: null as MediaStream | null,
    userSpeakingTimeout: undefined as NodeJS.Timeout | undefined,
  });

  const cleanup = () => {
    if (refs.current.countdownTimer) {
      clearInterval(refs.current.countdownTimer);
      refs.current.countdownTimer = undefined;
    }

    if (refs.current.userSpeakingTimeout) {
      clearInterval(refs.current.userSpeakingTimeout);
      refs.current.userSpeakingTimeout = undefined;
    }

    if (refs.current.audioStream) {
      refs.current.audioStream.getTracks().forEach((track) => track.stop());
      refs.current.audioStream = null;
    }
  };

  const setupAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      refs.current.audioStream = stream;

      // Simple speech detection using AudioContext
      const audioContext = new AudioContext();
      const analyzer = audioContext.createAnalyser();
      analyzer.fftSize = 256;

      const microphone = audioContext.createMediaStreamSource(stream);
      microphone.connect(analyzer);

      // Monitor audio levels
      const checkAudioLevel = () => {
        const dataArray = new Uint8Array(analyzer.frequencyBinCount);
        analyzer.getByteFrequencyData(dataArray);

        // Calculate average volume
        const average =
          dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
        const normalizedVolume = average / 256;

        // Detect speech based on volume
        if (normalizedVolume > 0.15 && !assistantIsSpeaking && !isMicMuted) {
          setUserIsSpeaking(true);

          // Clear previous timeout
          if (refs.current.userSpeakingTimeout) {
            clearInterval(refs.current.userSpeakingTimeout);
          }

          // Reset after short delay
          refs.current.userSpeakingTimeout = setTimeout(() => {
            setUserIsSpeaking(false);
          }, 1000);

          // Continue monitoring
          requestAnimationFrame(checkAudioLevel);
        }
        checkAudioLevel();
      };
    } catch (error) {
      console.error("Failed to initialize audio:", error);
    }
  };

  const stopCall = async () => {
    try {
      vapi.stop();
      setCallStatus(CallStatus.FINISHED);
      cleanup();
      const res = await changeCallStatus(userId, CallStatusEnum.COMPLETED);
      if (!res.success) {
        throw new Error("Failed to update call status");
      }
      toast.success("Call ended successfully");
    } catch (error) {
      console.error("Error stopping call:", error);
    }
  };

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

    const onCallEnd = () => {
      console.log("Call ended");
      setCallStatus(CallStatus.FINISHED);
      cleanup();
    };

    const onSpeechStart = () => {
      setAssistantIsSpeaking(true);
    };

    const onSpeechEnd = () => {
      setAssistantIsSpeaking(false);
    };

    const onError = (error: Error) => {
      console.error("Call error:", error);
      setCallStatus(CallStatus.FINISHED);
      cleanup();
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, [userName, callTimeLimit]);

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-background"></div>
  );
};

export default AutoConnectCall;
