import React, { useState } from "react";
import logo from "../assets/BLogo.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#F5EFDB]  border-black shadow-lg">
      <div className="flex items-center gap-4 text-[#201A09]">
        <div>
          <img src={logo} alt="Description of image" className="w-40 h-20" />
        </div>

      </div>

      {/* Navbar Right Side */}
      <div className="flex items-center gap-8 md:gap-4">
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-9">
          <a
            className="text-[#201A09] text-sm font-medium leading-normal"
            href="#"
          >
            About
          </a>
          <a
            className="text-[#201A09] text-sm font-medium leading-normal"
            href="#"
          >
            Products
          </a>
          <a
            className="text-[#201A09] text-sm font-medium leading-normal"
            href="#"
          >
            Order History
          </a>
          <a
            className="text-[#201A09] text-sm font-medium leading-normal"
            href="#"
          >
            Cart
          </a>
        
        </div>

        {/* Order Now Button (Desktop) */}
        <div className="hidden md:block">
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#FAC638] text-[#AB2217] text-sm font-bold">
            <span className="truncate">Login/Register</span>
          </button>
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
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-[#201A09] text-3xl"
          onClick={closeMenu}
        >
          &times;
        </button>
        <div className="flex flex-col gap-4">
          <a className="text-[#201A09] text-sm font-medium" href="#">
            About
          </a>
          <a className="text-[#201A09] text-sm font-medium" href="#">
            Products
          </a>
          <a className="text-[#201A09] text-sm font-medium" href="#">
            Order History
          </a>
          <a className="text-[#201A09] text-sm font-medium" href="#">
            Cart
          </a>
        
          <button className="w-full mt-4 px-4 py-2 bg-[#FAC638] text-[#AB2217] text-sm font-bold rounded-full">
            Login/Register
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
