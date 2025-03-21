import express from 'express';
import { requiresSignIn } from '../middlewares/auth.js';
import { uploadImage,removeImage,createAd, getAllAds,getSingleAd,addToWishlist,removeFromWishlist, userAds } from '../controllers/ad.js';
const router = express.Router();


router.post('/upload-image',requiresSignIn,uploadImage)
router.post('/remove-image',requiresSignIn,removeImage)
router.post('/ad',requiresSignIn,createAd)
router.get('/ads',getAllAds);
router.get('/ads/:slug',getSingleAd);
router.post('/wishlist',requiresSignIn,addToWishlist)
router.delete('/wishlist/:adId',requiresSignIn,removeFromWishlist)
router.get('/user-ads',requiresSignIn,userAds);

export default router;