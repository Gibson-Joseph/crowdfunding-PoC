import React, { useEffect } from "react";
import { useStateContext } from "../context";
import { DisplayCampaigns } from "../components";
import { useFetchContext } from "../provider/UseFetchProvider";

const Profile = () => {
  const { address, contract } = useStateContext();
  const { fetchFilterCampaigns } = useFetchContext();

  useEffect(() => {
    if (contract) fetchFilterCampaigns();
  }, [address, contract]);

  return (
    <>
      <div className={!address ? `flex justify-center items-center h-4/5` : ""}>
        <div>
          <h1 className="flex justify-center w-full font-epilogue text-white text-[18px]">
            {address ? "Wallet Connected!" : "OOPS! Your wallet not connected!"}
          </h1>
          <div className="flex py-2 w-full justify-center mb-4">
            <h1 className="font-epilogue font-semibold text-[16px] text-white text-left whitespace-nowrap">
              {address ? "Wallet Address :" : "Please connect your wallet"}
            </h1>{" "}
            <span className="font-epilogue font-normal text-[#818183] ml-2 truncate">
              {address}
            </span>
          </div>
        </div>
      </div>
      {address && <DisplayCampaigns title="Yours Campaigns" />}
    </>
  );
};

export default Profile;
