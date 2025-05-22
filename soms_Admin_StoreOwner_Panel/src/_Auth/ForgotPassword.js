import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSendOtp = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/forgot-password`, { email });
      alert("OTP sent to your email.");
      setStep(2);
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP.");
    }
  };

  const handleResetPassword = async () => {
    try {
      const payload = { email, otp, newPassword };
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/reset-password`, payload);
      alert("Password reset successful!");
      onClose();
    } catch (error) {
      console.error("Reset password failed:", error);
      alert("Invalid OTP or failed to reset password.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 overflow-hidden">
    <div className="bg-white p-6 rounded shadow-md w-[90%] max-w-sm relative border-2 border-black">
      <h2 className="text-xl font-bold mb-4 text-center">Forgot Password</h2>
  
      {step === 1 && (
        <>
          <label className="block mb-1 text-gray-700">Enter your email</label>
          <input
            type="email"
            className="w-full p-2 border rounded mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            className="w-full bg-blue-500 text-white p-2 rounded"
            onClick={handleSendOtp}
          >
            Send OTP
          </button>
        </>
      )}
  
      {step === 2 && (
        <>
          <label className="block mb-1 text-gray-700">Enter OTP</label>
          <input
            type="text"
            className="w-full p-2 border rounded mb-4"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <label className="block mb-1 text-gray-700">New Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded mb-4"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button
            className="w-full bg-green-500 text-white p-2 rounded"
            onClick={handleResetPassword}
          >
            Reset Password
          </button>
        </>
      )}
  
      <button
        className="absolute top-2 right-3 text-red-500 text-xl font-bold"
        onClick={onClose}
      >
        ✕
      </button>
    </div>
  </div>
  
  );
};

export default ForgotPassword;
