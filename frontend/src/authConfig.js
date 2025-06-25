export const msalConfig = {
  auth: {
    clientId: "b5025b74-c0f9-4a2e-8ce1-fb8d7825dcbc", // From Azure Portal
    authority: "https://login.microsoftonline.com/dd29eaeb-83f0-4524-bbfb-079f7b46756f", // Replace with your tenant ID
    redirectUri: "http://localhost:3000/auth/callback",
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: ["openid", "profile", "email"],
};
