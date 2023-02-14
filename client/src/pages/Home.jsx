import React, { useEffect } from "react";
import { useStateContext } from "../context";
import { DisplayCampaigns } from "../components";
import { useFetchContext } from "../provider/UseFetchProvider";

const Home = () => {
  const { fetchCampaigns } = useFetchContext();
  const { address, contract } = useStateContext();

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  return <DisplayCampaigns title="All Campaigns" />;
};

export default Home;
