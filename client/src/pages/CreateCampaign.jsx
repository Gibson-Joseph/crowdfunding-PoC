import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers"; // intreact to smartcontracts
import { money } from "../assets";
import { CustomButton, FormField, Loader } from "../components";
import { checkIfImage } from "../utils";
import { useStateContext } from "../context";

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { address, createCampaign } = useStateContext();
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true);
        await createCampaign({
          ...form,
          target: ethers.utils.parseUnits(form.target, 18),
        }); // ( YT: 2:04:20)
        setIsLoading(false);
        alert("Campaign created successfully");
        navigate("/");
      } else {
        alert("Provide valid image URL");
        setForm({ ...form, image: "" });
      }
    });
  };

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}

      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px] mb-5">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px]  text-white">
          Create a Campaign
        </h1>
      </div>

      <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[80px] rounded-[10px]">
        <img
          src={money}
          alt="money"
          className="w-[35px] h-[35px] object-contain"
        />
        <h4 className="font-epilogue font-bold text-white ml-[20px] sm:text-[24px]">
          You will get 100% of the raised amount
        </h4>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            lableName="Campaign Name *"
            placeholder="Write a Title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange("title", e)}
          />
        </div>
        <FormField
          lableName="Story *"
          placeholder="Write your story"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange("description", e)}
        />

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            lableName="Goal *"
            placeholder="ETH 0.50"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange("target", e)}
          />
          <FormField
            lableName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange("deadline", e)}
          />
        </div>
        <FormField
          lableName="Campaign image *"
          placeholder="Place image URL of your campaign"
          inputType="url"
          value={form.image}
          handleChange={(e) => handleFormFieldChange("image", e)}
        />
        {address && (
          <div className="flex justify-center items-center mt-[40px]">
            <CustomButton
              btyType="submit"
              title="Submit new campaign"
              styles="bg-[#1dc071]"
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateCampaign;
