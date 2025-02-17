import React from "react";
import SideBar from "../../Navigation/Sidebar";
import Adform from "../../forms/Adform";

const RentHouse = ()=>{
    return(
        <>
        <SideBar/>
        <h1>Rent House </h1>
        <Adform action = 'rent' type= 'house'/>
        </>
    )
}

export default RentHouse;