import express from 'express';
import { welcome } from '../controllers/auth.js';
import { preregister,register,login,forgotPassword,accessAccount,refreshTokenFunc,currentUserFunc,getProfileFunc,updatePassFunc,updateProfileFunc } from '../controllers/auth.js';
import { requiresSignIn } from '../middlewares/auth.js';
const router = express.Router();
router.get('/',requiresSignIn, welcome);

router.post('/pre-register',preregister);
router.post('/register',register);
router.post('/login',login);
router.post('/forgot-password',forgotPassword);
router.post('/access-account',accessAccount);
router.get('/refresh-token',refreshTokenFunc);
router.get('/current-user',requiresSignIn,currentUserFunc);
router.get('/profile/:username',getProfileFunc);
router.put('/update-password',requiresSignIn,updatePassFunc);
router.put('/update-profile',requiresSignIn,updateProfileFunc)
export default router;