import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Login function
  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!role || (role !== "Admin" && role !== "StoreOwner")) {
      alert("Please select a valid role: Admin or Store Owner");
      return;
    }
  
    const loginPayload = {
      email,
      password,
      role,
    };
  
    console.log("Login Payload:", loginPayload);
  
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        loginPayload
      );
  
      if (response.data.token && response.data.role) {
        if (response.data.role !== "Admin" && response.data.role !== "StoreOwner") {
          alert("Access denied: only Admin or Store Owner can log in.");
          return;
        }
  
        alert("Login successful!");
  
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("id", response.data.id);
  
        if (response.data.role === "Admin") {
          navigate("/admin");
        } else if (response.data.role === "StoreOwner") {
          navigate("/storeOwner");
        }
  
        window.location.reload();
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred while logging in.");
    }
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-400 z-50">
      {/* Popup Container */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative border-2 border-black border-solid box-shodow-lg">
        <div className="flex justify-center mb-4 bg-[#FAC638] text-red-500 font-bold p-3 text-xl rounded border-2 border-black border-solid">
          Admin/Store Owner Login
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border rounded"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-gray-700 mb-1">
              Password
            </label>
            <div className="flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full p-2 border rounded"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 mt-4 ml-4 transform -translate-y-1/2 text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="role" className="block text-gray-700 mb-1">
              Role
            </label>
            <select
              id="role"
              className="w-full p-2 border rounded"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="StoreOwner">Store Owner</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-[#FAC638] text-red-500 font-bold py-2 rounded"
          >
            Login
          </button>
        </form>

        <br />
      </div>
    </div>
  );
};

export default Login;
