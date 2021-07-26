import React, { useState } from "react";
import { signout } from "../actions/auth";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);

  const userIsLoggedIn = !!user;

  const loginHandler = (user) => {
    setUser(user);
  };

  const logoutHandler = () => {
    signout(() => setUser(null));
  };

  const contextValue = {
    user: user,
    isLoggedIn: userIsLoggedIn,
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
