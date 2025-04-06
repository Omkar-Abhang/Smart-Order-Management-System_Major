import React from "react";
import { FaMailBulk, FaPhoneAlt, FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';


function Footer() {
  return (
    <footer className="flex justify-center">
      <div className="flex max-w-[960px] flex-1 flex-col">
        <div className="flex flex-col gap-6 px-5 py-10 text-center @container">
          <div className="flex flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-around">
            <a
              className="text-[#A07D1C] text-base font-normal leading-normal min-w-40"
              href="#"
            >
              +91 7249843468
            </a>
            <a
              className="text-[#A07D1C] text-base font-normal leading-normal min-w-40"
              href="#"
            >
              omkarabhang36@gmail.com
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:omkarabhang@gmail.com" aria-label="Email">
              <div className="text-[#A07D1C]">
                <FaMailBulk size={24} />
              </div>
            </a>
            <a href="tel:+123456789" aria-label="Phone">
              <div className="text-[#A07D1C]">
                <FaPhoneAlt size={24} />
              </div>
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <div className="text-[#A07D1C]">
                <FaInstagram size={24} />
              </div>
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <div className="text-[#A07D1C]">
                <FaFacebook size={24} />
              </div>
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <div className="text-[#A07D1C]">
                <FaLinkedin size={24} />
              </div>
            </a>
          </div>
          <p className="text-[#A07D1C] text-base font-normal leading-normal">
            ©2025 Smart Ordering Management System
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
