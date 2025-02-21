import express from 'express';
import { requiresSignIn } from '../middlewares/auth.js';
import { uploadImage,removeImage,createAd, getAllAds,getSingleAd } from '../controllers/ad.js';
const router = express.Router();


router.post('/upload-image',requiresSignIn,uploadImage)
router.post('/remove-image',requiresSignIn,removeImage)
router.post('/ad',requiresSignIn,createAd)
router.get('/ads',getAllAds);
router.get('/ads/:slug',getSingleAd)

export default router;