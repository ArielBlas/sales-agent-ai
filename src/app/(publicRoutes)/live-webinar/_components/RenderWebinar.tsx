import React from "react";

type Props = {
  error: string | undefined;
  user: User | null;
  webinarDate: Webinar;
  apiKey: string;
  token: string;
  callId: string;
};

const RenderWebinar = (props: Props) => {
  return <div>RenderWebinar</div>;
};

export default RenderWebinar;
