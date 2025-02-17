import React from "react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
const ForgotPass = ()=>{
const [email,setEmail] = useState('');
const [loading,setLoading]= useState(false);
const navigate = useNavigate();
const handleSubmit = async (e)=>{
    e.preventDefault();
try{
  const {data} = await axios.post('/forgot-password',{email});

  if(data?.ok === true){
    toast.success('Please Check Your Email');
    navigate('/')
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
            <h1>Forgot Password</h1>
            <form onSubmit={handleSubmit}>
              <input
                autoFocus
                className="form-control mb-4"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
              />
             
              <button disabled={loading} className="btn btn-primary col-12">{loading?"Wait...!":"Submit"}</button>
            </form>
            <br/>
            <Link to='/auth/forgot-password'>Forgot Password</Link>
          </div>
        </div>
      </div>
    

        </>
    )
}

export default ForgotPass;