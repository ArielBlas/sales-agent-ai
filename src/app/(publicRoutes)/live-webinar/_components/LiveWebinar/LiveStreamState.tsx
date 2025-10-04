import {
  StreamVideo,
  StreamVideoClient,
  User as StreamUser,
} from "@stream-io/video-react-sdk";
import { User } from "@prisma/client";
import { WebinarWithPresenter } from "@/lib/type";
import React from "react";

type Props = {
  apiKey: string;
  token: string;
  callId: string;
  webinar: WebinarWithPresenter;
  user: User;
};

const hostUser: StreamUser = { id: process.env.NEXT_PUBLIC_STREAM_USER_ID! };

const LiveStreamState = ({ apiKey, token, callId, webinar, user }: Props) => {
  const client = new StreamVideoClient({ apiKey, user: hostUser, token });
  return <StreamVideo client={client}>{/* Your app code here */}</StreamVideo>;
};

export default LiveStreamState;
