import { AWSS3 } from "../config.js";
import { nanoid } from "nanoid";
import {GOOGLE_GEO_CODER} from '../config.js'
export const uploadImage = async (req, res) => {
    try {
        const { image } = req.body;

        const base64Image = new Buffer.from(
            image.replace(/^data:image\/\w+;base64,/, ""),
            "base64"
        );
        const type = image.split(";")[0].split("/")[1];
        const params = {
            Bucket: 'realist-realestate',
            Key: `${nanoid()}.${type}`,
            Body: base64Image,
            ACL: 'public-read',
            contentEncoding: 'base64',
            contentType: `image/${type}`
        };

        AWSS3.upload(params, (err, data) => {
            if (err) {
                console.log(err);
                res.sendStatus(400)
            } else {
                console.log(data);
                res.send(data)
            }

        })
    } catch (err) {
        console.log(err);
        res.json({ error: "Upload Image Failed Please Try Again" })
    }
}


export const removeImage = async (req, res) => {
    const { Bucket, Key } = req.body;

    AWSS3.deleteObject({ Bucket, Key }, (err, data) => {
        if (err) {
            console.log(err);
            res.sendStatus(400)
        } else {
            res.json({ ok: 'true' })
        }
    })
}



export const createAd = async (req, res) => {
    try {
       
      const{photos,price,address,bedrooms,bathrooms,carpark,landsize,type,title,description,action} = req.body;
      if(!photos.length){
        res.json({error:'Photos are required!'})
      }
      if(!price){
        res.json({error:'price is required!'})
      }
      if(!address){
        res.json({error:'address is required!'})
      }
      if(!title){
        res.json({error:'title is required!'})
      }
      if(!description){
        res.json({error:'description is required!'})
   
      }
      const geo =  await GOOGLE_GEO_CODER.geocode(address);
       console.log('geo=>',geo)
    } catch (err) {
        console.log(err);
    }
   

}

// photos: [],
// uploading: false,
// price: 
// address:
// bedrooms: 
// bathrooms: 
// carpark:
// landsize: 
// type:
// title:
// description: 
// loading