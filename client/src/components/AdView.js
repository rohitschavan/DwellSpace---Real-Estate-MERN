import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
const AdView = () => {
    const {slug} = useParams();
    const [ad, setAd] = useState([]);
    const [related, setRelated] = useState([]);
    useEffect(() => {
     
        const fetchAd = async () => {
            try {
                const { data } = await axios.get(`/ads/${slug}`);
                setAd(data.ad);
                setRelated(data.related);
                console.log(data)
            } catch (err) {
                console.log(err, 'Error in fetching the API')
            }
           
        }
        if (slug) {
            fetchAd();
        }
    }, [slug])
    return (
        <>
            <pre>{JSON.stringify({ad,related},null,4)}</pre>
        </>
    )
}

export default AdView;