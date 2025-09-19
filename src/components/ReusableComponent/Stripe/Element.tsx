import React from "react";

type Props = {
  children: React.ReactNode;
};

export const StripeElements = ({ children }: Props) => {
  return <div>{children}</div>;
};
