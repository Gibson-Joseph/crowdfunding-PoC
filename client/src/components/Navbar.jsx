import { navlinks } from "../constants";

import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDisconnect } from "@thirdweb-dev/react"
import { CustomButton } from "./index";

import { logo, menu, search, thirdweb, logout } from "../assets";
import { useStateContext } from "../context"
import { useFetchContext } from "../provider/UseFetchProvider";

const Navbar = () => {
  const disconnect = useDisconnect()
  const { searchFilter, isSearchPanelOpen, campaigns } = useFetchContext()
  const navigate = useNavigate();
  const { address, connect } = useStateContext();
  const [isActive, setSsActive] = useState("dashboard");
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const location = useLocation();

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="w-full flex-1 relative">
        {location.pathname !== "/create-campaign" && (
          <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
            <input
              autoComplete="off"
              onChange={(e) => {
                searchFilter(e.target.value);
              }}
              name="name"
              tabIndex={0}
              type="text"
              placeholder="Search campaigns"
              className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"
            />
            <div className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer">
              <img
                src={search}
                alt="searce"
                className="w-[15px] h-[15px] object-contain"
              />
            </div>
          </div>
        )}
      </div>
      <div className="sm:flex hidden flex-row justify-end gap-4">
        <CustomButton
          btnType="button"
          title={address ? "Create a campaign" : "Connect"}
          styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
          handleClick={() => {
            if (address) navigate("create-campaign");
            else connect();
          }}
        />
        {address && <div className="w-[42px] mt-1 h-[42px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
          <img
            onClick={disconnect}
            src={logout}
            alt="logout"
            className="w-[60%] h-[60%] object-contain"
          />
        </div>}
      </div>
      {/* Small screen navigation */}
      <div className="sm:hidden flex justify-between items-center relative">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
          <img
            src={logo}
            alt="user"
            className="w-[60%] h-[60%] object-contain"
          />
        </div>
        <img
          src={menu}
          alt="menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => setToggleDrawer(!toggleDrawer)}
        />
        <div
          className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${!toggleDrawer ? "-translate-y-[150vh]" : "translate-y-0"
            }  translate-all duration-700`}
        >
          <ul className="mb-4">
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4 ${isActive === link.name && "bg-[#3a3a43]"
                  }`}
                onClick={() => {
                  setSsActive(link.name);
                  setToggleDrawer(false);
                  navigate(link.link);
                }}
              >
                <img
                  src={link.imgUrl}
                  alt={link.name}
                  className={`h-[24px] w-[24px] object-contain ${isActive === link.name ? "grayscale-0" : "grayscale"
                    }`}
                />
                <p
                  className={`ml-[20px] font-epilogue font-semibold text-[14px] ${isActive === link.name ? "text-[#1dc071]" : "text-[#808191]"
                    }`}
                >
                  {link.name}
                </p>
              </li>
            ))}
          </ul>
          <div className="flex mx-4 justify-between">
            <CustomButton
              btnType="button"
              title={address ? "Create a campaign" : "Connect"}
              styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
              handleClick={() => {
                if (address) navigate("create-campaign");
                else connect();
              }}
            />
            {address && <div className="w-[42px] mt-1 h-[42px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
              <img
                onClick={disconnect}
                src={logout}
                alt="logout"
                className="w-[60%] h-[60%] object-contain"
              />
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
