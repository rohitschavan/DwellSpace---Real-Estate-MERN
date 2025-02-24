import React from "react";
import { useAuth } from "./context/auth";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./cards/Card";
import { NavLink } from "react-router-dom";
const Home = () => {
    //context
    const [auth, setAuth] = useAuth();

    const [adsForSell, setAdsForSell] = useState([]);
    const [adsForRent, setAdsForRent] = useState([]);

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

            <div className="container">
                <div className="row">
                 
                    {
                        adsForSell.map((e) => {
                            return (
                                <>
                               
                                    <Card ad={e} />
                              

                                </>
                            )
                        })
                    }


                </div>

            </div>


            <div className="container">
                <div className="row">
                  
                    <br></br>
               
                    {
                        adsForRent.map((e) => {
                            return (
                                <>

                                 <Card ad={e} />

                                </>
                            )
                        })
                    }


                </div>
            </div>









        </>
    )
}

export default Home;