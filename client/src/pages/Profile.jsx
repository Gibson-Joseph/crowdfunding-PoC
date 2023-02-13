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
    <>
      <h1 className='flex justify-center w-full font-epilogue text-white text-[18px]'>Wallet Connected!</h1>
      <div className='flex py-2 w-full justify-center mb-4'><h1 className='font-epilogue font-semibold text-[16px] text-white text-left whitespace-nowrap'>Wallet Address :</h1> <span className='font-epilogue font-normal text-[#818183] ml-2 truncate'>{address}</span></div>
      <DisplayCampaigns title="All Campaigns" />
    </>
  )
}


export default Profile

