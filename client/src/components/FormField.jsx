import React from "react";

const FormField = ({
  lableName,
  placeholder,
  inputType,
  value,
  handleChange,
  isTextArea,
}) => {
  return (
    <label className="flex-1 w-full flex flex-col">
      {lableName && (
        <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
          {lableName}
        </span>
      )}
      {isTextArea ? (
        <textarea
          required
          rows={5}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
        />
      ) : (
        <input
          required
          type={inputType}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          step="0.1"
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
        />
      )}
    </label>
  );
};

export default FormField;
