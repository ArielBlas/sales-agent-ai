import {
  StreamVideo,
  StreamVideoClient,
  User as StreamUser,
} from "@stream-io/video-react-sdk";
import { User } from "@prisma/client";
import { WebinarWithPresenter } from "@/lib/type";
import React, { useEffect, useState } from "react";
import CustomLivestreamPlayer from "./CustomLivestreamPlayer";

type Props = {
  apiKey: string;
  callId: string;
  webinar: WebinarWithPresenter;
  user: User;
};

const hostUser: StreamUser = { id: process.env.NEXT_PUBLIC_STREAM_USER_ID! };

const LiveStreamState = ({ apiKey, callId, webinar, user }: Props) => {
  const [hostToken, setHostToken] = useState<string | null>(null);
  const client = new StreamVideoClient({ apiKey, user: hostUser });

  useEffect(() => {
    const init = async () => {
      try {
        const token = await getTokenForHost();
      } catch (error) {}
    };
    init();
  }, [apiKey, webinar]);

  return (
    <StreamVideo client={client}>
      <CustomLivestreamPlayer
        callId={callId}
        callType="livestream"
        webinar={webinar}
        username={user.name}
        token={token}
      />
    </StreamVideo>
  );
};

export default LiveStreamState;
