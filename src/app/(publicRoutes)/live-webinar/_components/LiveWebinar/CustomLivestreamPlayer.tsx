import {
  useStreamVideoClient,
  Call,
  StreamCall,
} from "@stream-io/video-react-sdk";
import { WebinarWithPresenter } from "@/lib/type";
import React, { useEffect, useState } from "react";

type Props = {
  callId: string;
  callType: string;
  webinar: WebinarWithPresenter;
  username: string;
  token: string;
};

const CustomLivestreamPlayer = ({
  callId,
  callType,
  webinar,
  username,
  token,
}: Props) => {
  const client = useStreamVideoClient();
  const [call, setCall] = useState<Call>();
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    if (!client) return;
    const myCall = client.call(callId, callType);
    setCall(myCall);
    myCall.join().catch((e) => {
      console.error("Failed to join call:", e);
    });
    return () => {
      myCall.leave().catch((e) => {
        console.error("Failed to leave call:", e);
      });
      setCall(undefined);
    };
  }, [client, callId, callType]);

  if (!call) return null;

  return (
    <StreamCall call={call}>
      <LiveWebinarView
        showChat={showChat}
        setShowChat={setShowChat}
        webinar={webinar}
        isHost={true}
        username={username}
        userId={process.env.NEXT_PUBLIC_STREAM_USER_ID!}
        userToken={token}
      />
    </StreamCall>
  );
};

export default CustomLivestreamPlayer;
