import React from "react";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig";

const msalInstance = new PublicClientApplication(msalConfig);

export const MicrosoftAuthProvider = ({ children }) => (
  <MsalProvider instance={msalInstance}>{children}</MsalProvider>
);
