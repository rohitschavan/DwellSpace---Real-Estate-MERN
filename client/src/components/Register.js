import React from "react";
import { useState } from "react";
import axios from "axios";
import { API } from "../config";
import toast from "react-hot-toast";
import {useNavigate} from 'react-router-dom'
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        setLoading(true);
        const {data} = await axios.post(`/pre-register`,{email,password});
        console.log(data);
        if(data?.error){
            toast.error(data.error);
            setLoading(false)
        }
        toast.success('Please Check Your Email To Activate your Account')
        setLoading(false)
        navigate('/');
      
    } catch (err) {
      console.log(err);
      toast.error('Something Went Wrong, Please Try again')
      setLoading(false);
    }
  };
  return (
    <>
      <h1 className="display-p1 text-light bg-primary">Register</h1>
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
              <button disabled={loading} className="btn btn-primary col-12">{loading?"Wait...!":"Register"}</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
