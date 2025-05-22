import React, { useState } from "react";
import logo from "../assets/BLogo.png";
import { useNavigate } from "react-router-dom";
import Login from "../_Auth/Login";

function Navbar() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const username = localStorage.getItem("username");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.clear(); // or remove specific keys
      setIsLoggedIn(false);
      navigate("/"); // Redirect to home or login
    }
  };

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#F5EFDB]  border-black shadow-lg sticky top-0 z-50 bg-white">
      <div className="flex items-center gap-2 text-[#201A09]">
        <div>
          <img src={logo} alt="Description of image" className="w-40 h-20" />
        </div>
      </div>

      <h2 className="text-xl font-semibold text-[#201A09] ml-10">
        Welcome to Bakery Smart{" "}
        <span className="font-bold decoration-slate-900 text-uppercase text-2xl">
          {username}
        </span>
      </h2>

      {/* Navbar Right Side */}
      <div className="flex items-center gap-8 md:gap-4">
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-9">
        <a
            className="text-[#201A09] text-sm font-medium leading-normal"
            href="/"
          >
            Home
          </a>
          <a
            className="text-[#201A09] text-sm font-medium leading-normal"
            href="/about"
          >
            About
          </a>
          <a
            className="text-[#201A09] text-sm font-medium leading-normal"
            href="/allproducts"
          >
            Products
          </a>
          <a
            className="text-[#201A09] text-sm font-medium leading-normal"
            href="/orderhistory"
          >
            Order History
          </a>
          <a
            className="text-[#201A09] text-sm font-medium leading-normal"
            href="/cart"
          >
            Cart
          </a>
        </div>

        <div className="hidden md:block">
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-full bg-[#FAC638] text-[#AB2217] font-bold text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full 
    h-10 px-4 bg-[#FAC638] text-[#AB2217] text-sm font-bold"
              onClick={() => setShowLogin(true)}
            >
              <span className="truncate">Login/Register</span>
            </button>
          )}
          {showLogin && <Login onClose={() => setShowLogin(false)} />}
        </div>

        {/* Hamburger Icon (Mobile) */}
        <button
          className="md:hidden flex items-center justify-center text-[#201A09] z-10"
          onClick={toggleMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:hidden absolute top-0 left-0 w-full bg-white p-4 shadow-lg z-20`}
      >
        <h2 className="text-xl font-semibold text-[#201A09]">
          Welcome {username}
        </h2>

        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-[#201A09] text-3xl"
          onClick={closeMenu}
        >
          &times;
        </button>

        <div className="flex flex-col gap-4">
          <a className="text-[#201A09] text-sm font-medium" href="/about">
            About
          </a>

          <a className="text-[#201A09] text-sm font-medium" href="/allproducts">
            Products
          </a>

          <a
            className="text-[#201A09] text-sm font-medium"
            href="/orderhistory"
          >
            Order History
          </a>

          <a className="text-[#201A09] text-sm font-medium" href="/cart">
            Cart
          </a>

          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-full bg-red-500 text-white font-bold text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full 
                h-10 px-4 bg-[#FAC638] text-[#AB2217] text-sm font-bold"
              onClick={() => setShowLogin(true)}
            >
              <span className="truncate">Login/Register</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
