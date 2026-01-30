// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// const clientid="212411857305-mspd3sm5956b6sbcrlcd7hrk8bnvtevc.apps.googleusercontent.com";
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <GoogleOAuthProvider clientId={clientid}>
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   </GoogleOAuthProvider>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
);
