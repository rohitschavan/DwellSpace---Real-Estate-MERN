import React, { useState } from "react";

const Card = ({ ad }) => {
    const [showFullTitle, setShowFullTitle] = useState(false);
    const maxTitleLength = 30; // Adjust the length as needed

    const toggleTitle = () => setShowFullTitle(!showFullTitle);

    return (
        <>
        <div className="col-lg-4 p-4 gx-4 gy-4">
            <div className="card shadow">
                <img style={{height:'250px',objectFit:'cover'}} src={`${ad?.photos?.[0].Location}`}/>
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <h3>{ad?.price}</h3>
                    </div>
                </div>
                <h5>{ad.title}</h5>
            </div>
        </div>
        </>
    );
};

export default Card;
