import React, { useEffect, useState } from "react";
import SideBar from "./Navigation/Sidebar";
import { useAuth } from "./context/auth";
import axios from "axios";
import UserAdCard from "./cards/UserAdCard";
const Wishlist = () => {
  const [auth, setAuth] = useAuth();

  const [ads, setAds] = useState([]);


  useEffect(() => {
    fetchAds();
  }, [auth.token !== ''])


  const fetchAds = async () => {
    try {
      const { data } = await axios.get('/wishlist');
      console.log(data);
      if (data?.err) {
        console.log(data?.err);

      }

      setAds(data)


    } catch (err) {
      console.log(err);
    }
  }


  return (
    <>
      <h1 className="display-p1 text-light bg-primary">Wishlist</h1>
      <SideBar />
      <div>{!ads?.length ? (
        <>
          <h2 className="d-flex justify-content-center align-content-center">You haven't like any properties</h2>
        </>
      ) : (

        <>
          <div className="container mt-2 ">
            <div className="row">
              <div className="col-lg-8 offset-2">
                <h2>List of ads {ads?.length}</h2>
              </div>
            </div>
            <div className="row">

              {
                ads?.map((e) => {
                  return (
                    <>
                      <UserAdCard ad={e} />
                    </>
                  )
                })
              }

            </div>
      
          </div>
        </>
      )}</div>
    </>
  )



}

export default Wishlist;