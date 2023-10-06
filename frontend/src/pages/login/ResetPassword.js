import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Fragment } from "react";
import "./ResetPassword.css";
import { useAlert } from "react-alert";
import { publicRequest } from '../../requestMethods';

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const alert = useAlert();

  const handleResetPassword = async () => {
    try {
      if (password !== confirmPassword) {
        alert.error("Invalid password");
        return;
      }
      const response = await publicRequest.post(
        `/auth/reset/password/${token}`,
        {
          newPassword: password,
        }
      );
      alert.success(response.data.message);
    } catch (error) {
      alert.error(
        error.response ? error.response.data.error : "Internal server error"
      );
    }
  };

  return (
    <Fragment>
      <div className="reset-password-container">
        <form className="reset-password-form">
          <h2 className="reset-password-title">Reset Your Password</h2>
          <input
            className="reset-password-input"
            type="password"
            placeholder="New Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="reset-password-input"
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            className="reset-password-button"
            type="button"
            onClick={handleResetPassword}
          >
            Reset Password
          </button>
        </form>
      </div>
    </Fragment>
  );
}

export default ResetPassword;
