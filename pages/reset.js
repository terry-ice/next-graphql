import React from "react";
import ResetPassword from "../components/ResetPassword.js";
const reset = props => {
  return (
    <div>
      <h3>reset password {props.query.resetToken} </h3>
      <ResetPassword resetToken={props.query.resetToken} />
    </div>
  );
};

export default reset;
