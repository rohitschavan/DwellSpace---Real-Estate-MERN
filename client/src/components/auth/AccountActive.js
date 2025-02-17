import React from "react";
import { useParams,useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth";
const AccountActive = ()=>{
const [auth,setAuth] = useAuth();
const {token} = useParams();
const navigate = useNavigate();


useEffect(() => {
    const reqActivation = async () => {
      try {
        if (!token) {
          toast.error("Invalid token");
          return;
        }

        const { data } = await axios.post(`/register`, { token });

        if (data?.error) {
          toast.error(data.error);
        } else {
          localStorage.setItem('auth',JSON.stringify(data));
          toast.success("Account Activated Successfully");
          setAuth(data); // Ensure `data` matches your auth context structure
          navigate("/");
        }
      } catch (err) {
        console.error(err);
        toast.error("Something Went Wrong, Please Try Again");
        
      }
    };

    reqActivation();
  }, [token, navigate, setAuth]);
console.log(token);
return(
    <>
    <div style={{marginTop:'-5%'}} className="display-1 d-flex justify-content-center align-items-center vh-100">Please Wait</div>
    
    </>
)
}

export default AccountActive;