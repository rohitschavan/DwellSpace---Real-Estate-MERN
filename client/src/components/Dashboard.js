import React, { useEffect, useState } from "react";
import SideBar from "./Navigation/Sidebar";
import { useAuth } from "./context/auth";
import axios from "axios";
import UserAdCard from "./cards/UserAdCard";
import { NavLink } from "react-router-dom";
const Dashboard = () => {
  const [auth, setAuth] = useAuth();
  const [total, setTotal] = useState();
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState();
  const [page, setPage] = useState(1);

  const seller = auth.user?.role.includes('Seller');

  useEffect(() => {
    fetchAds();
  }, [auth.token !== ''])

  useEffect(()=>{
    if(page === 1) return;
    fetchMoreAds();
  },[page])

  const fetchMoreAds = async()=>{
    try{
      setLoading(true);
  
   const {data} = await axios.get(`/user-ads/${page}`);
   setAds([...ads,...data.ads]);
   setTotal(data.total);
   setLoading(false);
    }catch(err){
      console.log(err);
    }
  }
  
  const fetchAds = async () => {
    try {
      const { data } = await axios.get(`/user-ads/${page}`);
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
              <div className="col-lg-12 offset-2">
                <h2>List of ads {total}</h2>
              </div>
            </div>
            <div className="row">

              {
                ads?.map((e) => {
                  return (
                    <>
                    
                     <NavLink style={{
                      width:'100%'
                     }} to={`/ad/${e.slug}`}key={e._id}>
                      <UserAdCard ad={e} />
                            </NavLink>
           
            
                    
                    </>
                  )
                })
              }

            </div>
            <div className="row">
              <div className="col col-lg-12">
                <button className="btn btn-warning" onClick={(e) => {
                  e.preventDefault()
                  setPage(page + 1)

                }
                }>{loading ? 'Loading...' : `Load More ${ads.length}/${total}`}</button>
              </div>
            </div>
          </div>
        </>
      )}</div>
    </>
  )



}

export default Dashboard;