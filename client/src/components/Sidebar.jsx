import { navlinks } from "../constants";

import { logo, sun } from "../assets";
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Icon = ({
  styles,
  imgUrl,
  name,
  disabled,
  handleClick,
  isActivePath,
}) => {
  const location = useLocation();

  return (
    <div
      className={`w-[48px] h-[48px] rounded-[10px] ${
        isActivePath === location.pathname && "bg-[#2c2f32]"
      }  flex justify-center items-center ${
        !disabled && "cursor-pointer"
      } ${styles}`}
      onClick={handleClick}
    >
      {!isActivePath ? (
        <img src={imgUrl} alt="fund_log" className="w-1/2 h-1/2" />
      ) : (
        <img
          src={imgUrl}
          alt="fund_log"
          className={`w-1/2 h-1/2 ${
            isActivePath !== location.pathname && "grayscale"
          }`}
        />
      )}
    </div>
  );
};

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <Icon styles="w-[52px] h-[52px] bg-[#2c2f32]" imgUrl={logo} />

      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <Icon
              imgUrl={link.imgUrl}
              key={link.name}
              {...link}
              isActivePath={link.link}
              handleClick={() => {
                if (!link.disabled) {
                  navigate(link.link);
                }
              }}
            />
          ))}
        </div>
        {/* <Icon styles="bg-[#1c1c24]" imgUrl={sun} boxShadow-secondary /> */}
      </div>
    </div>
  );
};

export default Sidebar;
