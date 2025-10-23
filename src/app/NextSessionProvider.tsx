"use client";

import { SessionProvider } from "next-auth/react";
import { JSX } from "react";

const NextSessionProvider = ({ children }: { children: JSX.Element }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default NextSessionProvider;
