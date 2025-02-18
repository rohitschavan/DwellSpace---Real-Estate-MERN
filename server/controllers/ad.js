import { AWSS3 } from "../config.js";
import { nanoid } from "nanoid";
import { GOOGLE_GEO_CODER } from '../config.js';
import Ad from '../model/ad.js';
import slugify from "slugify";
import User from '../model/auth.js'
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

        const { photos, price, address, bedrooms, bathrooms, carpark, landsize, type, title, description, action } = req.body;
        if (!photos.length) {
            res.json({ error: 'Photos are required!' })
        }
        if (!price) {
            res.json({ error: 'price is required!' })
        }
        if (!address) {
            res.json({ error: 'address is required!' })
        }
        if (!title) {
            res.json({ error: 'title is required!' })
        }
        if (!description) {
            res.json({ error: 'description is required!' })

        }
        const geo = await GOOGLE_GEO_CODER.geocode(address);
        console.log('geo=>', geo);

        const newad = await new Ad({
            ...req.body,
            postedBy: req.user._id,
            location: {
                type: 'Point',
                coordinates: [geo?.[0]?.longitude, geo?.[0]?.latitude]
            },
            googleMap: geo,
            slug: slugify(`${title}-${address}-${price}-${nanoid(6)}`)

        }).save();

        const user = await User.findByIdAndUpdate(req.user._id,
            {
                $addToSet: { role: 'Seller' },
            }, { new: true });

        user.password = undefined;
        user.resetCode = undefined;
        res.json({
            newad, user
        })
    } catch (err) {
        console.log(err);
    }


}


export const getAllAds = async (req, res) => {
    try {
        const adsForSell = await Ad.find({ action: 'sell' }).select('-googleMap -location -photo.key -photo.Etag -photo.Key').sort({ createdAt: -1 }).limit(12);
        const adsForRent = await Ad.find({ action: 'rent' }).select('-googleMap -location -photo.key -photo.Etag -photo.Key').sort({ createdAt: -1 }).limit(12);
        res.json({adsForSell,adsForRent})
    } catch (err) {
        console.log(err);
        res.json({ error: 'Something Went Wrong' })
    }
}
