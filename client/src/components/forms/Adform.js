import React from "react";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { mapapikey } from "../../config";
import { useState } from "react";
import CurrencyInput from 'react-currency-input-field';
import ImageUpload from "./ImageUpload";
import { Button } from "antd";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";
const Adform = ({ action, type }) => {
    const [ad, setAd] = useState({
        photos: [],
        uploading: false,
        price: "",
        address: "",
        bedrooms: "",
        bathrooms: "",
        bedrooms: "",
        carpark: "",
        landsize: "",
        type,
        action,
        title: "",
        description: "",
        loading: false
    })
const navigate = useNavigate()
    const handleClick = async () => {
        setAd({ ...ad, loading: true })
        try {
            const { data } = await axios.post('/ad',ad);
            if(data?.error){
                toast.error(data.error);
                setAd({...ad,loading:false})
            }else{
                toast.success("ad Created Successfully")
                setAd({...ad,loading:false});
                navigate('/dashboard')
            }
        

        } catch (err) {
            console.log(err);
            setAd({...ad,loading:false})
        }
    }
    return (
        <>
            <div className="container">


                <div className="mb-3 form-control ">
                    <ImageUpload ad={ad} setAd={setAd} />
                    <GooglePlacesAutocomplete selectProps={{
                        defaultInputValue: ad?.address,
                        placeholder: 'Enter any location',
                        onChange: ({ value }) => {
                            setAd({ ...ad, address: value.description })
                        }
                    }} apiOptions='in' apiKey={mapapikey} />
                </div>
               
                <div className="mb-3 form-control mt-5">
                    <CurrencyInput className='mt-5 form-control' placeholder="Please enter price" defaultValue={ad.price} onValueChange={(value) => setAd({ ...ad, price: value })} />
                    {
                        type === 'house' ? (<>
                        <input type="number" className="form-control mb-3 " placeholder="Enter How Many Bedrooms" min='0' value={ad.bedrooms} onChange={e => setAd({ ...ad, bedrooms: e.target.value })} />
                    <input type="number" className="form-control mb-3 " placeholder="Enter How Many bathrooms" min='0' value={ad.bathrooms} onChange={e => setAd({ ...ad, bathrooms: e.target.value })} />
                    <input type="number" className="form-control mb-3 " placeholder="Enter How Many carpark" min='0' value={ad.carpark} onChange={e => setAd({ ...ad, carpark: e.target.value })} />
                        </>):''
                    }
                    <input type="text" className="form-control mb-3 " placeholder="Enter Size of land" value={ad.landsize} onChange={e => setAd({ ...ad, landsize: e.target.value })} />
                    <input type="text" className="form-control mb-3 " placeholder="Enter Title" value={ad.title} onChange={e => setAd({ ...ad, title: e.target.value })} />
                    <textarea className="form-control mb-3 " placeholder="Enter Description" min='0' value={ad.description} onChange={e => setAd({ ...ad, description: e.target.value })} />
                    <Button className={`${ad.loading ? 'disabled':''}`} onClick={handleClick}>{ad.loading ? 'Saving...' : 'Submit'}</Button>
                </div>



            </div>
        </>
    )
}

export default Adform;