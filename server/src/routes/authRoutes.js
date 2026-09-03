import express from 'express';
import { 
    register, login, getMe, logout, 
    completeOnboarding, checkSubdomain, 
    updateProfile, updatePassword, 
    forgotPassword, resetPassword,
    sendSignupOtp, verifySignupOtp,
    googleAuth, googleAuthCallback, googleCompleteRegister
} from '../controllers/authController.js';
import { isAuthenticated } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Signup OTP (public — no auth required)
router.post('/send-signup-otp', sendSignupOtp);
router.post('/verify-signup-otp', verifySignupOtp);

router.post('/register', register);
router.post('/login', login);
router.get('/me', isAuthenticated, getMe);
router.get('/logout', logout);
router.get('/check-subdomain', isAuthenticated, checkSubdomain);
router.put('/complete-onboarding', isAuthenticated, upload.single('logo'), completeOnboarding);
router.put('/profile', isAuthenticated, updateProfile);
router.put('/password', isAuthenticated, updatePassword);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword', resetPassword);

// Google OAuth
router.get('/google', googleAuth);
router.get('/google/callback', googleAuthCallback);
router.post('/google/complete-register', googleCompleteRegister);

export default router;
