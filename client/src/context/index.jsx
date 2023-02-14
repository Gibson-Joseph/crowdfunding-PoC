// Web3 logics ( YT: 1:54:00 )

import React, { useContext, createContext } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    // "0xf5e79bC244e9151b0BeD75De0110262B29B08ABF",
    "0xd75fF550669F227C26b9Bf1399101f6e206F6c4b",
  ); // provide contract address of smart contract ( ThirdWeb )

  const { mutateAsync: createcampaign } = useContractWrite(
    contract,
    "createcampaign",
  ); // not understand

  const address = useAddress(); // address of the wallet
  const connect = useMetamask(); // connect to the wallet

  const publishCampaign = async (form) => {
    try {
      const data = await createcampaign([
        address,
        form.title,
        form.description,
        form.target,
        new Date(form.deadline).getTime(), // deadline
        form.image,
      ]);
    } catch (error) {
      console.log("contract call failer", error);
    }
  };

  const getCampaigns = async () => {
    const campaigns = await contract.call('getCampaigns')
    const parsedCampaigns = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
      image: campaign.image,
      pId: i
    }));
    return parsedCampaigns;
  }

  const getUserCampaigns = async () => {
    const allcampaigns = await getCampaigns();
    const filteredCampagins = allcampaigns.filter((campaign) => campaign.owner === address);
    return filteredCampagins;
  }

  const donate = async (pId, amount) => {
    // YT: 3:11:13
    const data = await contract.call('donateToCampaign', pId, {
      value: ethers.utils.parseEther(amount)
    });
    return data;
  }

  // YT: 3:12:06
  const getDonations = async (pId) => {
    const donations = await contract.call('getDonators', pId);
    const numberOfDonations = donations[0].length;
    const parseDonations = [];
    for (let i = 0; i < numberOfDonations; i++) {
      parseDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString())
      })
    }
    return parseDonations;
  }

  return (
    <StateContext.Provider
      value={{ address, contract, connect, createCampaign: publishCampaign, getCampaigns, getUserCampaigns, donate, getDonations }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext); //( YT: 2:01:20 ) not understand
