import React from "react";
import { GoogleLogin } from "react-google-login";
import { useHistory } from "react-router";
const GoogleAuth = () => {
  const history = useHistory();
  
  const responseGoogle = (resp) => {
    console.log(resp.tokenId);
    fetch("http://localhost:4000/api/auth/googleAuth", {
      method: "POST",
      body: JSON.stringify({
        token: resp.tokenId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          alert(data.error);
        } else {
          localStorage.setItem("token", data.authToken);
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <GoogleLogin
        clientId="729665954198-81fudj2fk3fd5il8jdha5suvej5r412c.apps.googleusercontent.com"
        buttonText="SignUp with Google  "
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </>
  );
};

export default GoogleAuth;
