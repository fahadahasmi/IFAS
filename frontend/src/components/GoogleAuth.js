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
        render={(renderProps) => (
          <button
            style={{ background: "#50bbba",width: 'max-content',
            margin: '20px 45px' }}
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "100%",
                alignItems: "center",
                padding: "10px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width={23}
                height={23}
                viewBox="0 0 172 172"
                style={{ fill: "#000000" }}
              >
                <g
                  fill="none"
                  fillRule="nonzero"
                  stroke="none"
                  strokeWidth={1}
                  strokeLinecap="butt"
                  strokeLinejoin="miter"
                  strokeMiterlimit={10}
                  strokeDasharray
                  strokeDashoffset={0}
                  fontFamily="none"
                  fontWeight="none"
                  fontSize="none"
                  textAnchor="none"
                  style={{ mixBlendMode: "normal" }}
                >
                  <path d="M0,172v-172h172v172z" fill="none" />
                  <g fill="#ecf0f1">
                    <path d="M156.27275,71.96408h-5.77275v-0.29742h-64.5v28.66667h40.50242c-5.90892,16.68758 -21.78667,28.66667 -40.50242,28.66667c-23.74675,0 -43,-19.25325 -43,-43c0,-23.74675 19.25325,-43 43,-43c10.96142,0 20.93383,4.13517 28.52692,10.88975l20.27092,-20.27092c-12.79967,-11.92892 -29.92083,-19.2855 -48.79783,-19.2855c-39.57792,0 -71.66667,32.08875 -71.66667,71.66667c0,39.57792 32.08875,71.66667 71.66667,71.66667c39.57792,0 71.66667,-32.08875 71.66667,-71.66667c0,-4.80525 -0.4945,-9.49583 -1.39392,-14.03592z" />
                    <path d="M22.5965,52.64275l23.54608,17.26808c6.37117,-15.77383 21.801,-26.91083 39.85742,-26.91083c10.96142,0 20.93383,4.13517 28.52692,10.88975l20.27092,-20.27092c-12.79967,-11.92892 -29.92083,-19.2855 -48.79783,-19.2855c-27.52717,0 -51.39933,15.54092 -63.4035,38.30942z" />
                    <path d="M86,157.66667c18.5115,0 35.33167,-7.08425 48.04892,-18.60467l-22.18083,-18.7695c-7.19533,5.45025 -16.13933,8.7075 -25.86808,8.7075c-18.6405,0 -34.46808,-11.88592 -40.43075,-28.47317l-23.3705,18.00625c11.86083,23.20925 35.948,39.13358 63.80125,39.13358z" />
                    <path d="M156.27275,71.96408h-5.77275v-0.29742h-64.5v28.66667h40.50242c-2.838,8.01592 -7.99442,14.92817 -14.64508,19.96275c0.00358,-0.00358 0.00717,-0.00358 0.01075,-0.00717l22.18083,18.7695c-1.5695,1.42617 23.61775,-17.22508 23.61775,-53.05842c0,-4.80525 -0.4945,-9.49583 -1.39392,-14.03592z" />
                  </g>
                </g>
              </svg>

              <h4 style={{ margin: "34px",color:'#ecf0f1' }}>Sign with Google</h4>
            </div>
          </button>
        )}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </>
  );
};

export default GoogleAuth;
