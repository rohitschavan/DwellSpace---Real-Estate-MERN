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
        if (!ok && timer > 0) {
            const timeout = setTimeout(() => {
                setTimer((prev) => prev - 1);
            }, 1000);

            return () => clearTimeout(timeout); // Cleanup to prevent multiple timeouts
        }

        if (timer === 0) {
            navigate('/login'); // Navigate when timer reaches 0
        }

    }, [ok, timer, navigate]);
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

        
        
{ok ? (
    <Outlet />
) : (
    <div
        style={{ height: "100vh" }}
        className="d-flex justify-content-center align-items-center w-100 flex-column"
    >
        <img
            style={{ height: "25rem" }}
            src="https://img.freepik.com/free-vector/401-error-unauthorized-concept-illustration_114360-1934.jpg"
            alt="Unauthorized Access"
        />
        <h1 style={{ margin: "auto" }}>
            Unauthorised! Redirecting to safety in {timer}
        </h1>
    </div>
)}

          
        </> 
    )
}

export default ProtectedRoutes