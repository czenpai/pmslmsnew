import { useState, useEffect, useContext } from "react";
import GoogleLogin from "react-google-login";
import { loginWithGoogle, authenticate, isAuth } from "../../actions/auth";
import { GOOGLE_CLIENT_ID } from "../../config";
import React from "react";
import AuthContext from "../../store/auth-context";

const LoginGoogle = () => {
  const authCtx = useContext(AuthContext);

  const responseGoogle = (response) => {
    const tokenId = response.tokenId;
    const user = { tokenId };
    authCtx.handleGoogleToken(tokenId);

    loginWithGoogle(user).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        authenticate(data, () => {
          authCtx.handleAPIToken(data.token);
          authCtx.login(isAuth());
        });
      }
    });
  };

  return (
    <div className="pb-3">
      <GoogleLogin
        clientId={`${GOOGLE_CLIENT_ID}`}
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        theme="dark"
      />
    </div>
  );
};

export default LoginGoogle;
