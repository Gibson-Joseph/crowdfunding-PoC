import React, { useState, useEffect } from 'react'
import { useStateContext } from '../context'
import { DisplayCampaigns } from "../components"
import { useFetchContext } from '../provider/UseFetchProvider'

const Profile = () => {
  const { address, contract, getUserCampaigns } = useStateContext()
  const { fetchFilterCampaigns } = useFetchContext()

  useEffect(() => {
    if (contract) fetchFilterCampaigns();
  }, [address, contract])
  return (
    <DisplayCampaigns title="All Campaigns" />
  )
}


export default Profile

