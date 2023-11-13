import React from "react";

import image from "../../assets/img/felipe-giacometti-4i5ToPi4K_c-unsplash.jpg";

const EmailSent = () => {
  return (
    <div className="row" style={{ height: "100vh", overflow: "hidden" }}>
      <div
        className="col-12 col-md-6"
        style={{
          background: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div
        className="col-12 col-md-6 d-flex justify-content-center align-items-center"
        style={{ flexDirection: "column" }}
      >
        <h1 className="styled-font">Sports Pulse</h1>
        <br />
        <h4>Email Sent</h4>
        <br />
        <p className="w-50 text-center">
          A verification code has been sent to your registered email with a link
          to change your password.
        </p>
      </div>
    </div>
  );
};

export default EmailSent;
