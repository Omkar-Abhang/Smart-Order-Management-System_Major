import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import RegistrationPage from "./RegistrationPage";

const Login = ({ onClose }) => {

  const [loginType, setLoginType] = useState("Customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [registershow, setRegisterShow] = useState(false);

  // Login function 
  const handleLogin = async (e) => {
    e.preventDefault();

    const loginPayload = {
      email,
      password,
      role: loginType === "Admin" ? role : "Customer",
    };
    console.log(loginPayload);

    try {
      const response = await axios.post("http://localhost:8080/auth/login",loginPayload );
      if (response.data.token && response.data.role) {
        alert("Login successful!");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("id", response.data.id);



        if (loginType === "Admin") {
          navigate(role === "Admin" ? "/admin" : "/storeOwner");
        } else {
          navigate("/");
        }

        onClose(); // Close modal after successful login
        // Refresh the page to reflect login changes (Navbar updates, etc.)
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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-md z-50">
      {/* Popup Container */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
        {/* Close Button */}
        <button
          className="absolute top-2 right-3 text-gray-600 text-xl"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <hr />
        <br />

        <div className="flex justify-center mb-4">
          <button
            type="button"
            className={`px-4 py-2 rounded-l ${
              loginType === "Customer"
                ? "bg-[#FAC638] text-red-500 font-bold"
                : "bg-gray-200"
            }`}
            onClick={() => {
              setLoginType("Customer");
              setRole("");
            }}
          >
            Customer Login
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-r ${
              loginType === "Admin"
                ? "bg-[#FAC638] text-red-500 font-bold"
                : "bg-gray-200"
            }`}
            onClick={() => setLoginType("Admin")}
          >
            Admin/Store Owner Login
          </button>
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

          {loginType === "Admin" && (
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
          )}

          <button
            type="submit"
            className="w-full bg-[#FAC638] text-red-500 font-bold py-2 rounded"
          >
            Login
          </button>
        </form>

        <br />
        <button onClick={() => setRegisterShow(true)}>
          <p>
            Don't have an account?{" "}
            <span className="text-gray-500 m-2 font-semibold">
              Register Here..
            </span>
          </p>
        </button>
        {registershow && (<RegistrationPage onClose={() => setRegisterShow(false)} />)
        }
      </div>
    </div>
  );
};

export default Login;
