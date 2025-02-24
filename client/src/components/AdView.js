import React, { useCallback, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Gallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from 'react-images';
import { height, width } from "@mui/system";
import logo from '../logo.svg'

const AdView = () => {
    const photos = [
        {
          src: 'https://realist-realestate.s3.eu-north-1.amazonaws.com/RYDvetDL0ilL3xFWFPNpM.jpeg',
          width: 4,
          height: 3
        },
        {
          src: 'https://realist-realestate.s3.eu-north-1.amazonaws.com/5IQWxxSYu--I6BOIZ3mAh.jpeg',
          width: 1,
          height: 1
        }
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


    const generatePhotosArray = ()=>{
        if(ad.photos?.length > 0){
            const x = ad.photos?.length === 1 ? 2 : 4
            let arr = [];

            ad.photos.map((photo)=>arr.push({
                src:photo.Location,
                width:x,
                height:x
            }))

            return arr;



        }else{
            return [
                {
                    src:logo,
                    width:2,
                    height:1
                }
            ]
        }
    }

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
            <Gallery onClick={openLightBox} photos={generatePhotosArray()} />
            <ModalGateway>
                {modalIsOpen ? (
                    <Modal onClose={closeLightBox}>
                        <Carousel 
                            currentIndex={current} 
                            views={photos.map(photo => ({
                                source: photo.src,  // Correct key used
                                caption: photo.title || '', // Ensure compatibility
                            }))}
                        />
                    </Modal>
                ) : null}
            </ModalGateway>
            <pre>{JSON.stringify({ ad, related }, null, 4)}</pre>
        </>
    );
};

export default AdView;
