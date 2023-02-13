import React from "react";

const CustomButton = ({ btyType, title, styles, handleClick, disable }) => {
  return (
    <button
      disabled={disable}
      type={btyType}
      className={`${styles} font-epilogue disabled:cursor-not-allowed disabled:bg-opacity-50 disabled:text-opacity-25 font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px]`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default CustomButton;
