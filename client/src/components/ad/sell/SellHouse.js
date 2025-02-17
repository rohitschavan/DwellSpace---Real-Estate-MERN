import React from "react";
import SideBar from "../../Navigation/Sidebar";
import Adform from "../../forms/Adform";

const SellHouse = ()=>{
    return(
        <>
        <SideBar/>
        <h1>SellHouse </h1>
        <Adform action = 'sell' type= 'house'/>
        </>
    )
}

export default SellHouse;