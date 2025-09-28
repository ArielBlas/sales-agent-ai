import React from "react";
import { User, Webinar, WebinarStatusEnum } from "@prisma/client";

type Props = {
  error: string | undefined;
  user: User | null;
  webinar: Webinar;
  apiKey: string;
  token: string;
  callId: string;
};

const RenderWebinar = ({
  error,
  user,
  webinar,
  apiKey,
  token,
  callId,
}: Props) => {
  return (
    <React.Fragment>
      {webinar.webinarStatus === WebinarStatusEnum.SCHEDULED ? (
        <WebinarUpcomingState webinar={webinar} currentUser={User || null} />
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default RenderWebinar;
