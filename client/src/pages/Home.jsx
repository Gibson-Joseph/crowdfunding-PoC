import React, { useState, useEffect } from 'react'
import { useStateContext } from '../context'
import { DisplayCampaigns } from "../components"
import { useFetchContext } from "../provider/UseFetchProvider"
const Home = () => {
  const { isLoading, campaigns, fetchCampaigns } = useFetchContext()
  const { address, contract, getCampaigns } = useStateContext()

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract])
  return (
    <DisplayCampaigns title="All Campaigns" />
  )
}

export default Home