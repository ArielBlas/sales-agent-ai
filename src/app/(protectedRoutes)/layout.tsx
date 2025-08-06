import { onAuthenticateUser } from "@/actions/auth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  const userExist = await onAuthenticateUser();

  if (!userExist.user) {
    redirect("/sign-in");
  }

  return <div className="flex w-full min-h-screen">{children}</div>;
};

export default Layout;
