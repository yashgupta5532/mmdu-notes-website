import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Fragment } from "react";
import "./ResetPassword.css";
import { useAlert } from "react-alert";

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const alert = useAlert();

  const handleResetPassword = async () => {
    try {
      // axios.defaults.baseURL = "http://localhost:4000";
      if (password !== confirmPassword) {
        alert.error("Invalid password");
        return;
      }
      const response = await axios.post(
        `http://52.66.241.163:4000/api/auth/reset/password/${token}`,
        {
          newPassword: password,
        }
      );
      console.log("Success:", response.data.message);
      alert.success(response.data.message);
    } catch (error) {
      console.error("Error:", error);
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
