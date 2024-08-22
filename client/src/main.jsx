import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Routes from "./routes.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-jqdqwojbjl1r2osf.us.auth0.com"
      clientId="WZ351uGFVZ0TJmCBlWj4FXOwD0FMD3m9"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "My Collection App Identifier",
        scope: "openid profile email",
      }}
    >
      <Provider store={store}>
        <Routes />
      </Provider>
    </Auth0Provider>
  </React.StrictMode>
);
