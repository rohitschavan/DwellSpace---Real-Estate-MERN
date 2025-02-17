import React from "react";
import SideBar from "../../Navigation/Sidebar";
import Adform from "../../forms/Adform";

const SellLand = ()=>{
    return(
        <>
        <SideBar/>
        <h1>SellLand </h1>
        <Adform action = 'sell' type= 'land'/>
        </>
    )
}

export default SellLand;