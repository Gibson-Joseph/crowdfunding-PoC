import React, { useContext, createContext, useState } from 'react'
import { useStateContext } from '../context'

const fetchState = createContext()

export const UseFetchProvider = ({ children }) => {
    const [isLoading, setisLoading] = useState(false)
    const [campaigns, setcampaigns] = useState([])
    const [helpingData, setHelpingData] = useState([])
    const [isSearchPanelOpen, setIsSearchPanelOpen] = useState(false)

    const { getCampaigns, getUserCampaigns } = useStateContext()

    const fetchCampaigns = async () => {
        setisLoading(true)
        setIsSearchPanelOpen(false)
        const data = await getCampaigns();
        setcampaigns(data)
        setHelpingData(data)
        setisLoading(false)
    }

    const fetchFilterCampaigns = async () => {
        setisLoading(true)
        setIsSearchPanelOpen(false)
        const data = await getUserCampaigns();
        setcampaigns(data)
        setHelpingData(data)
        setisLoading(false)
    }

    let filterArray = []
    const searchFilter = (searchData) => {
        if (searchData.length >= 3) {
            setIsSearchPanelOpen(true)
            filterArray = helpingData.filter((item) => item.title.toLocaleLowerCase().indexOf(searchData) === 0)
            setcampaigns(filterArray)
        } else {
            setIsSearchPanelOpen(false)
            setcampaigns(helpingData)
        }
    }

    return (
        <fetchState.Provider value={{ isLoading, campaigns, isSearchPanelOpen, fetchCampaigns, fetchFilterCampaigns, searchFilter, setIsSearchPanelOpen,setcampaigns }}>
            {children}
        </fetchState.Provider>
    )
}

export const useFetchContext = () => useContext(fetchState)