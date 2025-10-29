"use server";

import { Attendee } from "@prisma/client";
import { getStreamClient } from "@/lib/stream/streamClient";
import { UserRequest } from "@stream-io/video-react-sdk";

export const getStreamIoToken = async (attendee: Attendee) => {
  try {
    const newUser: UserRequest = {
      id: attendee?.id || "guest",
      name: attendee?.name || "guest",
      image: `https://api.dicebear.com/7.x/initials/svg?seed=${
        attendee?.name || "Guest"
      }`,
    };
    await getStreamClient.upsertUsers([newUser]);

    // validity is optional(by default the token is valid for an hour)
    const validity = 60 * 60 * 60;
    const token = getStreamClient.generateUserToken({
      user_id: attendee?.id || "guest",
      validity_in_seconds: validity,
    });
    return token;
  } catch (error) {
    console.error("Error generating Stream IO token:", error);
    throw new Error("Failed to generate Stream IO token");
  }
};

export const getTokenForHost = async (
  userId: string,
  username: string,
  profilePic: string
) => {
  try {
    const newUser: UserRequest = {
      id: userId,
      role: "user",
      name: username || "Guest",
      image:
        profilePic ||
        `https://api.dicebear.com/7.x/initials/svg?seed=${username}`,
    };
    await getStreamClient.upsertUsers([newUser]);

    const validity = 60 * 60 * 60;
    const token = getStreamClient.generateUserToken({
      user_id: userId,
      validity_in_seconds: validity,
    });
    return token;
  } catch (error) {
    console.error("Error generating Stream IO token for host:", error);
    throw new Error("Failed to generate Stream IO token for host");
  }
};
