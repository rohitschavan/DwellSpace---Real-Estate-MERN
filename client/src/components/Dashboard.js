import React, { useEffect, useState } from "react";
import SideBar from "./Navigation/Sidebar";
import { useAuth } from "./context/auth";
import axios from "axios";
import UserAdCard from "./cards/UserAdCard";
const Dashboard = () => {
  const [auth, setAuth] = useAuth();
  const [total, setTotal] = useState();
  const [ads, setAds] = useState();

  const seller = auth.user?.role.includes('Seller');

  useEffect(() => {
    fetchAds();
  }, [auth.token !== ''])

  const fetchAds = async () => {
    try {
      const { data } = await axios.get('/user-ads');
      if (data?.err) {
        console.log(data?.err);
      }
      setTotal(data.total);
      setAds(data.ads)


    } catch (err) {
      console.log(err);
    }
  }


  return (
    <>
      <h1 className="display-p1 text-light bg-primary">Dashboard</h1>
      <SideBar />
      <div>{!seller ? (
        <>
          <h2 className="d-flex justify-content-center align-content-center">Welcome To Realist App</h2>
        </>
      ) : (

        <>
          <div className="container mt-2 ">
            <div className="row">
              <div className="col-lg-8 offset-2">
                <h2>List of ads {total}</h2>
              </div>
            </div>
            <div className="row">
             
                {
                  ads?.map((e)=>{
                    return(
                      <>
                      <UserAdCard ad ={e}/>
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

export default Dashboard;