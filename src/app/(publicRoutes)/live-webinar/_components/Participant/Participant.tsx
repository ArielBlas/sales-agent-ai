"use client";
import React, { useEffect, useRef, useState } from "react";
import { WebinarWithPresenter } from "@/lib/type";
import { useAttendeeStore } from "@/store/useAttendeeStore";
import { Call, StreamVideoClient, type User } from "@stream-io/video-react-sdk";
import { getStreamIoToken } from "@/actions/streamIo";

type Props = {
  apiKey: string;
  callId: string;
  webinar: WebinarWithPresenter;
};

const Participant = ({ apiKey, callId, webinar }: Props) => {
  const { attendee } = useAttendeeStore();
  const [showChat, setShowChat] = useState(true);
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<
    "connecting" | "failed" | "reconnecting" | "connected"
  >("connecting");

  const clientInitialized = useRef<boolean>(false);

  useEffect(() => {
    if (clientInitialized.current) return;

    const initClient = async () => {
      try {
        setConnectionStatus("connecting");
        const user: User = {
          id: attendee?.id || "guest",
          name: attendee?.name || "Guest",
          image: `https://api.dicebear.com/7.x/initials/svg?seed=${
            attendee?.name || "Guest"
          }`,
        };

        const userToken = await getStreamIoToken(attendee);
        setToken(userToken);
      } catch (error) {}
    };
    initClient();
  }, [apiKey, callId, attendee, call, client]);

  return <div>Participant</div>;
};

export default Participant;
