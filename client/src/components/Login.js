import React from "react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/auth";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
const Login = ()=>{
const [auth,setAuth] = useAuth();
const [email,setEmail] = useState('');
const [password,setPassword] = useState('');
const [loading,setLoading]= useState(false);
const location = useLocation();
const navigate = useNavigate();
const handleSubmit = async (e)=>{
    e.preventDefault();
try{
  const {data} = await axios.post('/login',{email,password});

  if(data?.token){
    setAuth(data);
    localStorage.setItem('auth',JSON.stringify(data));
    toast.success('Login Successful');
   location?.state !== null ? navigate(location.state) : navigate('/dashboard')
  }
  if(data?.error){
    toast.error(data.error);
  }

}catch(err){
    console.log('Error, Something went wrong',err);
    toast.error(err);
  
}
}
    return(
        <>
        <div className="container">
        <div className="row">
          <div className="col-lg-4 offset-lg-4">
            <form onSubmit={handleSubmit}>
              <input
                autoFocus
                className="form-control mb-4"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
              />
              <input
              type="password"
                className="form-control mb-4"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
              />
              <button disabled={loading} className="btn btn-primary col-12">{loading?"Wait...!":"Login"}</button>
            </form>
            <br/>
            <Link to='/auth/forgot-password'>Forgot Password</Link>
          </div>
        </div>
      </div>
    

        </>
    )
}

export default Login;