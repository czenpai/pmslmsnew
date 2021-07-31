import React, { useState } from "react";
import { signout } from "../actions/auth";

const AuthContext = React.createContext({
  user: "",
  isLoggedIn: false,
  APIToken: "",
  googleToken: "",
  handleAPIToken: (token) => {},
  handleGoogleToken: (token) => {},
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [res, setRes] = useState(null);
  const [apiToken, setAToken] = useState(null);
  const [googleToken, setGToken] = useState(null);

  const userIsLoggedIn = !!res;

  const loginHandler = (res) => {
    setRes(res);
    console.log(res);
  };

  const logoutHandler = () => {
    signout(() => {
      setRes(null);
      setAToken(null);
      setGToken(null);
    });
  };

  const setAPIToken = (token) => {
    setAToken(token);
  };

  const setGoogleToken = (token) => {
    setGToken(token);
  };

  const contextValue = {
    user: res,
    isLoggedIn: userIsLoggedIn,
    APIToken: apiToken,
    googleToken: googleToken,
    handleAPIToken: setAPIToken,
    handleGoogleToken: setGoogleToken,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
