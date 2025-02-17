import React from "react";
import { useAuth } from "./context/auth";


const Home = ()=>{
const [auth,setAuth] = useAuth();

    return (
        <>
        <h1 className="display-p1 text-light bg-primary">Home</h1>
    
        </>
    )
}

export default Home;