import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import axios from "axios";

const ProtectedRoutes = () => {
    const [auth] = useAuth(); // Get authentication state
    const [ok, setOk] = useState(null); // `null` prevents flickering
    const [timer, setTimer] = useState(3);
    const navigate = useNavigate();

    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const { data } = await axios.get("/current-user", {
                    headers: { Authorization: auth?.token },
                });
                setOk(true);
            } catch (err) {
                setOk(false);
            }
        };

        if (auth?.token) {
            getCurrentUser();
        } else {
            setOk(false); // No token, set explicitly
        }
    }, [auth?.token]);

    useEffect(() => {
        if (ok === false && timer > 0) {
            const timeout = setTimeout(() => setTimer((prev) => prev - 1), 1000);
            return () => clearTimeout(timeout);
        }

        if (ok === false && timer === 0) {
            navigate("/login");
        }
    }, [ok, timer, navigate]);

    // ✅ Fix: Wait until auth check is done before rendering
    if (ok === null) {
        return (
            <div className="d-flex justify-content-center align-items-center w-100" style={{ height: "100vh" }}>
                <h2>Checking authentication...</h2>
            </div>
        );
    }

    return ok ? (
        <Outlet />
    ) : (
        <div className="d-flex justify-content-center align-items-center w-100 flex-column" style={{ height: "100vh" }}>
            <img
                style={{ height: "25rem" }}
                src="https://img.freepik.com/free-vector/401-error-unauthorized-concept-illustration_114360-1934.jpg"
                alt="Unauthorized Access"
            />
            <h1>Unauthorized! Redirecting to login in {timer}...</h1>
        </div>
    );
};

export default ProtectedRoutes;
