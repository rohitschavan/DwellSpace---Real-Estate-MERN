import React from "react";
import { useAuth } from "./context/auth";
import { useState, useEffect } from "react";
import axios from "axios";


const Home = () => {
    //context
    const [auth, setAuth] = useAuth();

    const [adsForSell, setAdsForSell] = useState('');
    const [adsForRent, setAdsForRent] = useState('');

    useEffect(() => {
        fetchAllAds()
    }, []);

    const fetchAllAds = async () => {
        const { data } = await axios.get('/ads');
        setAdsForRent(data.adsForRent)
        setAdsForSell(data.adsForSell)
    }

    return (
        <>
            <h1 className="display-p1 text-light bg-primary">Home</h1>
            

        </>
    )
}

export default Home;