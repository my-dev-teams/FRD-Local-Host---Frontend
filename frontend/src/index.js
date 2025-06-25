import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MicrosoftAuthProvider } from "./MicrosoftAuthProvider";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MicrosoftAuthProvider>
    <App />
  </MicrosoftAuthProvider>
);
