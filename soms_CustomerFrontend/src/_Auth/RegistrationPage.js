import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const RegistrationPage = ({ onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    role: "Customer",
    name: "",
    phone: "",
    email: "",
    password: "",
    address: "",
  });

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/register`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        alert("Registration successful! Please login.");
        navigate("/login");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data === "Email already exists. Please use a different one."
      ) {
        alert("Email already exists. Try logging in or use another email.");
      } else {
        console.error("Error registering:", error);
        alert("An error occurred during registration.");
      }
    }
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-md z-50">
      {/* Registration Form Container */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
        {/* Close Button */}
        <button
          className="absolute top-2 right-3 text-gray-600 text-xl"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <hr />
        <br />
        <form onSubmit={handleRegistration}>
          {/* Hidden role field */}
          <input type="hidden" value={userData.role} />

          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-2 border rounded"
              placeholder="Enter your name"
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 mb-1">
              Phone No
            </label>
            <input
              type="tel"
              id="phone"
              className="w-full p-2 border rounded"
              placeholder="+91 2342249832"
              value={userData.phone}
              onChange={(e) =>
                setUserData({ ...userData, phone: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border rounded"
              placeholder="you@example.com"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
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
              placeholder="Choose a password"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
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

          {/* <div className="mb-4 relative">
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
                    </div> */}

          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              id="address"
              className="w-full p-2 border rounded"
              placeholder="Enter your address"
              value={userData.address}
              onChange={(e) =>
                setUserData({ ...userData, address: e.target.value })
              }
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 text-red-500 font-bold py-2 rounded"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
