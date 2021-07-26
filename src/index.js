import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { AuthContextProvider } from "./store/auth-context";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ChakraProvider>
        <ColorModeScript initialColorMode="light"></ColorModeScript>
        <Router>
          <App />
        </Router>
      </ChakraProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
