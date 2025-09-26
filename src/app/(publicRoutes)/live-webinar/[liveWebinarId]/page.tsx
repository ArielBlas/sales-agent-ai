import { onAuthenticateUser } from "@/actions/auth";
import { getWebinarById } from "@/actions/webinar";
import React from "react";

type Props = {
  params: Promise<{ liveWebinarId: string }>;
  searchParams: Promise<{ error: string }>;
};

const page = async ({ params, searchParams }: Props) => {
  const { liveWebinarId } = await params;
  const { error } = await searchParams;

  const webinarDate = await getWebinarById(liveWebinarId);

  if (!webinarDate) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center text-lg sm:txt-4xl">
        Webinar not found
      </div>
    );
  }

  return <div>page</div>;
};

export default page;
