import React from "react";
import { useParams } from "react-router-dom";
const AdView = ()=>{
const params = useParams();
    return(
        <>
<pre>{params.slug}</pre>
        </>
    )
}

export default AdView;