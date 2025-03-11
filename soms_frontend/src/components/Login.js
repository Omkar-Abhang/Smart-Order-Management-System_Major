import React from "react";
import Logo from '../assets/BLogo.png'
const Login = () => {
  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Epilogue, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
       
            <img src={Logo} className="w-40 h-30 flex flex-1 justify-center"></img>
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
            <h1 className="text-[#181411] tracking-light text-[32px] font-bold leading-tight px-4 text-center pb-3 pt-6">
              Welcome to Sweet Treats
            </h1>
            <p className="text-[#181411] text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">
              Order your favorite sweets and treats online now!
            </p>
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#181411] text-base font-medium leading-normal pb-2">Email</p>
                <input
                  type="email"
                  placeholder="Email"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl border border-[#e6e0db] bg-white h-14 placeholder:text-[#8a7560] p-[15px]"
                />
              </label>
            </div>
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#181411] text-base font-medium leading-normal pb-2">Password</p>
                <input
                  type="password"
                  placeholder="Password"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl border border-[#e6e0db] bg-white h-14 placeholder:text-[#8a7560] p-[15px]"
                />
              </label>
            </div>
            <div className="flex px-4 py-3 justify-start">
              <button className="flex min-w-[84px] max-w-[480px] items-center justify-center rounded-full h-10 px-4 bg-[#f2800d] text-[#181411] text-sm font-bold">
                Log In
              </button>
            </div>
            <p className="text-[#8a7560] text-sm font-normal text-center underline cursor-pointer">Forgot Password?</p>
            <p className="text-[#8a7560] text-sm font-normal text-center">OR</p>
            <div className="flex px-4 py-3 justify-start">
              <button className="flex min-w-[84px] max-w-[480px] items-center justify-center rounded-full h-10 px-4 bg-[#f5f2f0] text-[#181411] gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 256 256">
                  <path d="M224,128a96,96,0,1,1-21.95-61.09,8,8,0,1,1-12.33,10.18A80,80,0,1,0,207.6,136H128a8,8,0,0,1,0-16h88A8,8,0,0,1,224,128Z"></path>
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>
            <p className="text-[#8a7560] text-sm font-normal text-center underline cursor-pointer">
              Don't have an account? Sign up here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
