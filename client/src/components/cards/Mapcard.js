import React, { useEffect } from "react";
import GoogleMapReact from 'google-map-react';
import { mapapikey } from "../../config";

const Mapcard = ({ad})=>{


 
    
       
    const defaultProps = {
        center: {
          lat:ad?.location?.coordinates[1],
          lng: ad?.location?.coordinates[0]
        },
        zoom: 11
      };
     if(ad?.location?.coordinates){return(
        <>
        <div className="mt-5" style={{height:'350px',width:'100%',border:'2px solid grey'}}>
            <GoogleMapReact    bootstrapURLKeys={{ key:mapapikey }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom} >
            <div lat={ad?.location?.coordinates[1]} lng ={ad?.location?.coordinates[0]}>
                <span style={{fontSize:'1.4rem'}}>📍</span>
            </div>
        </GoogleMapReact>
        </div>
        </>
    )}
}

export default Mapcard;