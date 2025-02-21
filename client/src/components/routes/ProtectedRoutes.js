import React from "react";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ProtectedRoutes = () => {
    // eslint-disable-next-line
    const [auth, setAuth] = useAuth();
    const [ok, setOk] = useState(false);
    const [timer, setTimer] = useState(3);
    const navigate = useNavigate();
  
    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                // eslint-disable-next-line
                const { data } = await axios.get('/current-user', {
                    headers: {
                        Authorization: auth?.token
                    }
                })

                setOk(true);
            } catch (err) {
                setOk(false);

            }
        }


        if (auth?.token) getCurrentUser();

    }, [auth?.token])
   
    return (
        <>
            {ok ? <Outlet /> : <h1 style={{margin:'auto'}}>{`Unauthorised! Redirecting to safety in  ${timer}`}</h1>}
        </> 
    )
}

export default ProtectedRoutes