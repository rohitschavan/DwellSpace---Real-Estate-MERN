import React from "react";
import SideBar from "../../Navigation/Sidebar";
import Adform from "../../forms/Adform";

const RentLand = ()=>{
    return(
        <>
        <SideBar/>
        <h1>RentLand</h1>
        <Adform action = 'rent' type= 'land'/>
        </>
    )
}

export default RentLand;