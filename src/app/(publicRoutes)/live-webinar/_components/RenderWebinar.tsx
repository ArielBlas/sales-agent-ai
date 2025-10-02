"use client";

import React, { useEffect } from "react";
import { User, Webinar, WebinarStatusEnum } from "@prisma/client";
import { useRouter, usePathname } from "next/navigation";
import { useAttendeeStore } from "@/store/useAttendeeStore";
import { toast } from "sonner";
import WebinarUpcomingState from "./WebinarUpcoming/WebinarUpcomingState";

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
  const router = useRouter();
  const pathname = usePathname();

  const { attendee } = useAttendeeStore();

  useEffect(() => {
    if (error) {
      toast.error(error);
      router.push(pathname);
    }
  }, [error]);

  return (
    <React.Fragment>
      {webinar.webinarStatus === WebinarStatusEnum.SCHEDULED ? (
        <WebinarUpcomingState webinar={webinar} currentUser={User || null} />
      ) : webinar.webinarStatus === WebinarStatusEnum.WAITING_ROOM ? (
        <WebinarUpcomingState webinar={webinar} currentUser={User || null} />
      ) : webinar.webinarStatus === WebinarStatusEnum.LIVE ? (
        <React.Fragment>
          {user?.id === webinar.presenterId ? (
            // <LiveStreamState apiKey={apiKey} token={token} callId={callId} />
            "Livestream for presenter"
          ) : attendee ? (
            // <Participant apiKey={apiKey} token={token} callId={callId} />
            "Livestream for participant"
          ) : (
            <WebinarUpcomingState
              webinar={webinar}
              currentUser={User || null}
            />
          )}
        </React.Fragment>
      ) : webinar.webinarStatus === WebinarStatusEnum.CANCELLED ? (
        <div className="flex justify-center items-center h-full w-full">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-semibold text-primary">
              {webinar?.title}
            </h3>
            <p className="text-muted-foreground text-xs">
              This webinar has been cancelled.
            </p>
          </div>
        </div>
      ) : (
        <WebinarUpcomingState webinar={webinar} currentUser={User || null} />
      )}
    </React.Fragment>
  );
};

export default RenderWebinar;
