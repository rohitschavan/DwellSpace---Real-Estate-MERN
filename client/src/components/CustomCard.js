import React from "react";
import './Customcard.css';
import Adfeatures from "./cards/Adfeatures";
import timeAgo from "time-ago-formatter";
import HTMLRenderer from 'react-html-renderer'
const CustomCard = ({ad})=>{
    return(
        <>
        <div className="container">
  <div className="row">
    <div className="col-lg-12">
      <br/>
      <div style={{width:'100%'}} className="d-flex justify-content-center flex-row align-items-center">

    
      <div className="card card-margin">
        <div className="card-header no-border">
          <h5 className="card-title h3 mt-2 lead">{ad?.type} for {ad?.action} in <span className="fw-bold h3">{ad?.address}</span> </h5>
        </div>
        <div className="card-body pt-0">
          <div className="widget-49">
            <div className="widget-49-title-wrapper">
              <div className="widget-49-date-primary">
                <span style={{
                  fontSize:'1rem',
                  textAlign:'center'
                }} className="widget-49-date-day">{timeAgo(ad?.createdAt ? ad.createdAt : Date.now())}</span>
                
              </div>
              <div className="widget-49-meeting-info d-flex flex-row">
              <Adfeatures ad={ad}/>
              </div>
            </div>
            <ul className="widget-49-meeting-points">
              <h3 className="f-bold mt-3">Highlights</h3>
              <br/>
              <li className="widget-49-meeting-item h5"><span>{ad?.title}</span></li>
              <li className="widget-49-meeting-item lead"><span><HTMLRenderer html={ad?.description?.replaceAll('.','<br/> <br/>')}/></span></li>
              <li className="widget-49-meeting-item"><span>{ad?.address}</span></li>
            </ul>
            <div className="widget-49-meeting-action">
              <a href="#" className="btn btn-sm btn-flash-border-primary">Contact</a>
            </div>
          </div>
          </div>
        </div>
       
      </div>
    </div>
    
    
  </div>
</div>

        </>
    )
}

export default CustomCard;