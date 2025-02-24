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
import timeAgo from 'time-ago-formatter'

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
        console.log(data);
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

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col col-lg-4 mt-4">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <button
                style={{ width: "12rem", position: "relative", left: "-60px" }}
                className={`btn ${
                  ad.action === "sell" ? "btn-primary" : "btn-danger"
                }  disabled`}
              >
                {ad.type} for {ad.action}
              </button>
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
    </>
  );
};

export default AdView;
