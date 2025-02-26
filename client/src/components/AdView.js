import React, { useCallback, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { height, width } from "@mui/system";
import logo from "../logo.svg";
import { FaMapMarkerAlt } from "react-icons/fa";
import Adfeatures from "./cards/Adfeatures";
import formatNumber from "currency-number-formatter";
import timeAgo from 'time-ago-formatter';
import LikeandUnlike from "./LikeandUnlike";
import Mapcard from "./cards/Mapcard";
import CustomCard from "./CustomCard";
import { NavLink } from "react-router-dom";

import './Bigcard.css';


const AdView = () => {
  
  const photos = [
    {
      src: "https://realist-realestate.s3.eu-north-1.amazonaws.com/RYDvetDL0ilL3xFWFPNpM.jpeg",
      width: 4,
      height: 3,
    },
    {
      src: "https://realist-realestate.s3.eu-north-1.amazonaws.com/5IQWxxSYu--I6BOIZ3mAh.jpeg",
      width: 1,
      height: 1,
    },
  ];

  const { slug } = useParams();
  const [ad, setAd] = useState([]);
  const [related, setRelated] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const { data } = await axios.get(`/ads/${slug}`);
        setAd(data.ad);
        setRelated(data.related);
        console.log(data.related)

      } catch (err) {
        console.error("Error in fetching the API:", err);
      }
    };
    if (slug) {
      fetchAd();
    }
  }, [slug]);

  const generatePhotosArray = () => {
    if (ad.photos?.length > 0) {
      const x = ad.photos?.length === 1 ? 2 : 4;
      let arr = [];

      ad.photos.map((photo) =>
        arr.push({
          src: photo.Location,
          width: x,
          height: x,
        })
      );

      return arr;
    } else {
      return [
        {
          src: logo,
          width: 2,
          height: 1,
        },
      ];
    }
  };

  // Open the modal with the selected image
  const openLightBox = useCallback((event, { photo, index }) => {
    setCurrent(index);
    setModalIsOpen(true);
  }, []);

  // Close the modal
  const closeLightBox = () => {
    setCurrent(0);
    setModalIsOpen(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]); 

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col col-lg-6 mt-4">
            <div className="d-flex justify-content-center mb-2">
              <button
                style={{ width: "12rem", position: "relative", left: "-60px" }}
                className={`btn ${ad.action === "sell" ? "btn-primary" : "btn-danger"
                  }  disabled`}
              >
                {ad.type} for {ad.action}
              </button>
            </div>
            <article className="postcard light green">

              <a className="postcard__img_link" href="#">

              </a>
              <div className="postcard__text t-dark">
                <h1 className="postcard__title green"><a href="#">{ad?.title}</a></h1>
                <div className="d-flex flex-row align-items-center ">
                  <Adfeatures ad={ad} />
                  <div className="mb-2 ml-2">
                    <LikeandUnlike ad={ad} />
                  </div>

                </div>

                <div className="postcard__subtitle small">
                  <time dateTime="2020-05-25 12:00:00">
                    <i className="fas fa-calendar-alt mr-2" />{timeAgo(ad.createdAt ? ad.createdAt : 'little while ago')}
                  </time>
                </div>
                <div className="postcard__bar" />
                <div className="postcard__preview-txt">{ad?.sold ? (
                  <h5 style={{ color: "red" }}>❌ Sold</h5>
                ) : (
                  <h5 style={{ color: "green" }}>✅ Available</h5>
                )}</div>
                <ul className="postcard__tagbox">
                  <li style={{
                    height: '80px'
                  }} className="tag__item  "><i className="fas fa-tag mr-2" /><h1 style={{ color: "red", }}>
                      <span
                        style={{
                          color: "black",
                          padding: '2rem',


                        }}
                      >
                        Price :{" "}
                      </span>{" "}
                      &nbsp; &#8377;{formatNumber(ad.price ? ad.price : 0)}
                    </h1></li>

                </ul>
              </div>
            </article>

          </div>
          <div className="col col-lg-6 mt-4">

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
            <Mapcard ad={ad} />
            <CustomCard ad={ad} />
            <br />

          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col col-lg-12">
          <h3 className="mb-2" style={{
              color:'black'
            }}>Related Properties</h3>
                <hr/>
            <div style={{gap:'2rem'}} className="d-flex flex-row">

            {related.length > 0 ? (related?.map((e,index) => {
              return (
                <>
                <NavLink key={index} to={`/ad/${e?.slug}`}>
                  <div className="card" style={{ width: '18rem' }}>
                    <img style={{minHeight:'10rem',}} className="card-img-top" src={e?.photos?.[0]?.Location || ""} alt="Card image cap" />
                    <div className="card-body">
                      <p style={{color:'black'}} className="card-text">
                        <span style={{color:'black'}}>{e?.title}</span>
                      </p>
                    </div>
                  </div>
                  </NavLink>
                </>
              )
            })):(<>
            <h4 style={{color:'red'}}>No Related Properties......</h4 >
            </>)}
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default AdView;
