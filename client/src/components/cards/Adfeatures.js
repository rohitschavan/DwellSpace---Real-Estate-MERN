import React from "react";
import { TbBath } from "react-icons/tb";
import { BiArea } from "react-icons/bi";
import { MdOutlineBedroomChild } from "react-icons/md";

const Adfeatures = ({ad})=>{
    return(
        <>
        <p style={{
                            fontSize: '17px'
                        }} className="card-text mb-2 ml-2">
                            {
                                ad?.landsize ? (<span><BiArea /> : {ad.landsize}</span>) : ''
                            }

                        </p>
                        <p style={{
                            fontSize: '17px'
                        }} className="card-text mb-2 ml-2">
                            {
                                ad?.bathrooms ? (<span><TbBath /> : {!ad.bedrooms ? '0' : ad.bedrooms}</span>) : ''
                            }

                        </p>
                        <p style={{
                            fontSize: '17px'
                        }} className="card-text mb-2 ml-2">
                            {
                                ad?.bedrooms ? (<span><MdOutlineBedroomChild /> : {ad.bedrooms}</span>) : ''
                            }

                        </p>
        </>
    )
}

export default Adfeatures;