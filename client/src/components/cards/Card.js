import React, { useState } from "react";

import formatNumber from "currency-number-formatter";
import { Badge } from "antd";
import { NavLink } from "react-router-dom";
import Adfeatures from "./Adfeatures";
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

                        <Adfeatures ad={ad}/>
                    </div>
                </div>
            </Badge.Ribbon>
            </NavLink>
            </div>
        </>
    );
};

export default Card;
