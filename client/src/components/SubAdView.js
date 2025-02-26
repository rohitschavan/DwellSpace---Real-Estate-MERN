import React from "react";


const SubAdView = ({ad})=>{
    return(
        <>
        <div className="container">
        <div className="row">
          <div className="col col-lg-4 mt-4">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <div className="d-flex justify-content-between">
              <button
                style={{ width: "12rem", position: "relative", left: "-60px" }}
                className={`btn ${
                  ad.action === "sell" ? "btn-primary" : "btn-danger"
                }  disabled`}
              >
                {ad.type} for {ad.action}
              </button>
              <LikeandUnlike ad={ad}/>
              </div>
             
              <div className="mt-3">
                {ad?.sold ? (
                  <h5 style={{ color: "red" }}>❌ Sold</h5>
                ) : (
                  <h5 style={{ color: "green" }}>✅ Available</h5>
                )}
                <div
                  style={{ gap: "10px" }}
                  className="d-flex justify-content-center align-items-center"
                >
                  {" "}
                  <FaMapMarkerAlt />{" "}
                  <h2 style={{ position: "relative", top: "5px" }}>
                    {ad.address}
                  </h2>
                </div>
                <div className="d-flex mt-2">
                  <Adfeatures ad={ad} />
                </div>
                <h1 style={{ color: "red" }}>
                  <span
                    style={{
                      color: "black",
                    }}
                  >
                    Price :{" "}
                  </span>{" "}
                  &nbsp; &#8377;{formatNumber(ad.price ? ad.price : 0)}
                </h1>
                <h4>{timeAgo(ad.createdAt ? ad.createdAt : 'little while ago')}</h4>
              </div>
            </div>
          </div>
          <div className="col col-lg-8 mt-4">
           
            <Gallery onClick={openLightBox} photos={generatePhotosArray()} />
            <ModalGateway>
              {modalIsOpen ? (
                <Modal onClose={closeLightBox}>
                  <Carousel
                    currentIndex={current}
                    views={photos.map((photo) => ({
                      source: photo.src, // Correct key used
                      caption: photo.title || "", // Ensure compatibility
                    }))}
                  />
                </Modal>
              ) : null}
            </ModalGateway>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col col-lg-8 offset-2">
            <Mapcard ad={ad}/>
            <CustomCard ad={ad}/>
            <br/>
            
          </div>
        </div>
      </div>
        </>
    )
}

export default SubAdView;