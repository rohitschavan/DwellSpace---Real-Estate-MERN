import React from "react";

const Footer = ()=>{
    return(
        <>
        <div style={{
            width:'100% !important',
          
        }} className=" my-3 ">
  <footer className="text-center text-lg-start" style={{backgroundColor: '#222'}}>
    <div className="container d-flex justify-content-center py-5">
    
    </div>
    {/* Copyright */}
    <div className="text-center text-white p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
     &copy; {new Date ().getFullYear()} &nbsp;

      <h2 className="text-white" >Dwellspace</h2>
    </div>
    {/* Copyright */}
  </footer>
</div>

        </>
    )
}

export default Footer;