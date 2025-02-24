import React, { useState } from "react";
import { TbBath } from "react-icons/tb";
import { BiArea } from "react-icons/bi";
import { MdOutlineBedroomChild } from "react-icons/md";
import formatNumber from "currency-number-formatter";
import { Badge } from "antd";
import { NavLink } from "react-router-dom";
const Card = ({ ad }) => {
    return (
        <>
            <div className="col-lg-4 p-4 gx-4 gy-4">
        <NavLink to={`/ad/${ad.slug}`}>
                <Badge.Ribbon text={`${ad.type.charAt(0).toUpperCase() + ad.type.slice(1)} for ${ad.action.charAt(0).toUpperCase() + ad.action.slice(1) }`} color={ad?.action === 'rent' ? 'red':'blue'}>

               
                <div className="card shadow">
                    <img style={{ height: '250px', objectFit: 'cover' }} src={`${ad?.photos?.[0].Location}`} />
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <h3> {formatNumber(ad?.price, 2, "₹")}</h3>
                        </div>
                    </div>
                    <h5>{ad.title}</h5>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        flexDirection: 'row',

                    }}>

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
                    </div>
                </div>
            </Badge.Ribbon>
            </NavLink>
            </div>
        </>
    );
};

export default Card;
