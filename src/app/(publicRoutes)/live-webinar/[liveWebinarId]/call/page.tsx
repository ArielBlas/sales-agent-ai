import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: Promise<{ liveWebinarId: string }>;
  searchParams: Promise<{ attendeeId: string }>;
};

const page = async ({ params, searchParams }: Props) => {
  const { liveWebinarId } = await params;
  const { attendeeId } = await searchParams;

  if (!liveWebinarId || !attendeeId) {
    redirect("/404");
  }

  const attende = await getAttendeeById(attendeeId, liveWebinarId);

  return <div>page</div>;
};

export default page;
