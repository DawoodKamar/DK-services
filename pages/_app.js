import "../styles/global.css";
import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { UserProvider } from "../components/UserProvider";

export default function App({ Component, pageProps }) {
  return (
    <ClerkProvider {...pageProps}>
      <UserProvider>
        <Component {...pageProps} />{" "}
      </UserProvider>
    </ClerkProvider>
  );
}
