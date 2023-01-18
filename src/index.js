import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo/client";
import { BrowserRouter } from "react-router-dom";
import { ModalProvider } from "./hooks/modalContext";
import { ServerProvider } from "./context/ServerContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <ServerProvider>
      <ModalProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ModalProvider>
    </ServerProvider>
  </ApolloProvider>
);
