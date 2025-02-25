import React from "react";
import { useAuth } from "./context/auth";
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LikeandUnlike = ({ad})=>{
const [auth,setAuth] = useAuth();
const navigate = useNavigate('/')
const handleLike = async()=>{
    try{
     if(auth?.user === null){
        navigate('/login',{
            state:`ad/${ad.slug}`
        })
        return
     }
     const {data} = await axios.post('/wishlist',{adId:ad._id});
     setAuth({...auth,user:data});
     const fromLs = JSON.parse(localStorage.getItem('auth'));
     fromLs.user = data;
     localStorage.setItem('auth',JSON.stringify(fromLs));
     toast.success('Item added To Wishlist')
    }catch(err){
        console.log(err);
    }
}
const handleUnLike = async()=>{
    try{
     if(auth?.user === null){
        navigate('/login',{
            state:`ad/${ad.slug}`
        })
        return
     }
     const {data} = await axios.delete(`/wishlist/${ad._id}`);
     setAuth({...auth,user:data});
     const fromLs = JSON.parse(localStorage.getItem('auth'));
     fromLs.user = data;
     localStorage.setItem('auth',JSON.stringify(fromLs))
    toast.success('Item Removed To Wishlist')
    }catch(err){
        console.log(err);
    }
}


    return(
        <>
        {auth?.user?.wishlist?.includes(ad?._id)? (
            <>
              <><FcLike onClick={handleUnLike} className="h2 pointer mt-2"/></>
            </>
        ) : (
            <FcLikePlaceholder onClick={handleLike} className="h2 pointer mt-2"/>
         
        )}
        </>
    )
}

export default LikeandUnlike;