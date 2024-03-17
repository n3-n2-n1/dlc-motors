import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { UserProvider } from "./contexts/UserContext.tsx";

const props = {};

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <BrowserRouter>
    <UserProvider {...(props as any)}>
      <App />
    </UserProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
