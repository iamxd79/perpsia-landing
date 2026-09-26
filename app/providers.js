"use client";

import { PrivyProvider } from "@privy-io/react-auth";

export default function Providers({ children }) {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;
  if (!appId) return children;

  return (
    <PrivyProvider
      appId={appId}
      config={{
        loginMethods: ["email", "google", "wallet"],
        appearance: {
          theme: "dark",
          accentColor: "#35a7ff",
          logo: "/images/perpsia-logo.svg",
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
