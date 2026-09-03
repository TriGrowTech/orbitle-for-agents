import Agent from '../models/Agent.model.js';
import Package from '../models/Package.model.js';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import sendEmail from '../utils/sendEmail.js';
import { getOtpEmailTemplate, getSignupOtpEmailTemplate } from '../utils/emailTemplate.js';

// In-memory OTP store for signup (before account creation)
// Structure: { email -> { otp: hashedOtp, expiry: Date, name: string } }
const signupOtpStore = new Map();

// Send OTP for signup email verification
export const sendSignupOtp = async (req, res) => {
    try {
        const { email, name } = req.body;
        if (!email) {
            return res.status(400).json({ success: false, message: 'Email is required.' });
        }
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
        }

        // Check if already registered
        const exists = await Agent.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');
        const expiry = Date.now() + 10 * 60 * 1000; // 10 minutes

        // Store in memory
        signupOtpStore.set(email.toLowerCase(), { hashedOtp, expiry, name: name || '' });

        // Send email
        const htmlBody = getSignupOtpEmailTemplate(otp, name);
        await sendEmail({
            email,
            subject: 'Verify your email — Orbitle',
            message: `Your Orbitle signup OTP is ${otp}. It expires in 10 minutes.`,
            html: htmlBody
        });

        console.log(`[SIGNUP OTP] Sent to ${email}`);
        res.status(200).json({ success: true, message: 'OTP sent to your email.' });
    } catch (err) {
        console.error('[SIGNUP OTP ERROR]', err);
        res.status(500).json({ success: false, message: 'Failed to send OTP. Please try again.' });
    }
};

// Verify OTP for signup email verification
export const verifySignupOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({ success: false, message: 'Email and OTP are required.' });
        }

        const record = signupOtpStore.get(email.toLowerCase());
        if (!record) {
            return res.status(400).json({ success: false, message: 'OTP not found. Please request a new one.' });
        }

        if (Date.now() > record.expiry) {
            signupOtpStore.delete(email.toLowerCase());
            return res.status(400).json({ success: false, message: 'OTP has expired. Please request a new one.' });
        }

        const hashedInput = crypto.createHash('sha256').update(otp).digest('hex');
        if (hashedInput !== record.hashedOtp) {
            return res.status(400).json({ success: false, message: 'Invalid OTP. Please try again.' });
        }

        // Mark verified (keep record so register can confirm)
        record.verified = true;
        signupOtpStore.set(email.toLowerCase(), record);

        res.status(200).json({ success: true, message: 'Email verified successfully.' });
    } catch (err) {
        console.error('[VERIFY OTP ERROR]', err);
        res.status(500).json({ success: false, message: 'Verification failed. Please try again.' });
    }
};

// Register Agent
export const register = async (req, res, next) => {
    try {
        const { name, email, password, businessName } = req.body;

        // Check for required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required. Please provide your name, email, and password.'
            });
        }

        // Validate email format
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
        }

        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long.' });
        }

        // Prevent duplicate registrations
        const exists = await Agent.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: 'An account with this email address already exists.' });
        }

        // Confirm email was verified via OTP
        const otpRecord = signupOtpStore.get(email.toLowerCase());
        if (!otpRecord || !otpRecord.verified) {
            return res.status(400).json({ success: false, message: 'Email not verified. Please verify your email with OTP first.' });
        }

        const agent = await Agent.create({
            name,
            email,
            password,
            businessName
        });

        // Cleanup OTP record after successful registration
        signupOtpStore.delete(email.toLowerCase());

        sendTokenResponse(agent, 201, res);

    } catch (err) {
        // Handle unique constraint errors (like subdomain)
        if (err.code === 11000) {
            return res.status(400).json({ success: false, message: 'This email or subdomain is already registered.' });
        }

        res.status(500).json({
            success: false,
            message: 'Internal Server Error. Please try again later.'
        });
    }
};

// Login Agent
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide email and password' });
        }

        const agent = await Agent.findOne({ email }).select('+password');

        if (!agent) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const isMatch = await agent.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        sendTokenResponse(agent, 200, res);
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

// Get current user
export const getMe = async (req, res, next) => {
    try {
        const agent = await Agent.findById(req.agent.id).lean();
        if (!agent) {
            return res.status(404).json({ success: false, message: 'Agent not found' });
        }

        // Fetch real counts for dashboard stats
        const packagesCount = await Package.countDocuments({ agentId: agent._id });

        // Set dynamic properties
        agent.packagesCount = packagesCount;
        agent.leadsCount = 0; // Set to 0 until leads model is fully implemented

        res.status(200).json({
            success: true,
            agent
        });
    } catch (err) {
        res.status(400).json({ success: false, message: 'Agent not found' });
    }
};

// Logout
export const logout = async (req, res, next) => {
    const cookieOptions = {
        httpOnly: true,
        sameSite: 'lax',
        ...(process.env.NODE_ENV === 'production' && {
            secure: true,
            domain: process.env.COOKIE_DOMAIN
        })
    };

    res.clearCookie('token', cookieOptions);

    res.status(200).json({
        success: true,
        data: {}
    });
};

// Onboarding Update
export const completeOnboarding = async (req, res, next) => {
    try {
        const { businessName, tagline, whatsapp, theme, subdomain } = req.body;

        // Filter out empty strings so they don't fail regex validations or unique sparse indices
        let updateData = { isOnboarded: true, theme };

        if (businessName && businessName.trim() !== '') updateData.businessName = businessName;
        if (tagline && tagline.trim() !== '') updateData.tagline = tagline;
        if (whatsapp && whatsapp.trim() !== '') updateData.whatsapp = whatsapp;
        if (subdomain && subdomain.trim() !== '') updateData.subdomain = subdomain;

        if (req.file) {
            updateData.logo = req.file.filename;
        }

        const agent = await Agent.findByIdAndUpdate(
            req.agent.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!agent) {
            return res.status(404).json({ success: false, message: 'Agent not found' });
        }

        res.status(200).json({
            success: true,
            isOnboarded: agent.isOnboarded,
            agent
        });
    } catch (err) {
        // Handle unique constraint errors (like subdomain)
        if (err.code === 11000) {
            return res.status(400).json({ success: false, message: 'This subdomain is already taken. Please try another one.' });
        }
        res.status(400).json({ success: false, message: err.message });
    }
};

// Subdomain validation
export const checkSubdomain = async (req, res, next) => {
    try {
        const { subdomain } = req.query;
        if (!subdomain) {
            return res.status(400).json({ success: false, message: 'Subdomain is required' });
        }

        // Find if this subdomain is used by another agent
        const agent = await Agent.findOne({ subdomain: subdomain.toLowerCase() });

        if (agent && agent._id.toString() !== req.agent.id) {
            return res.status(200).json({ success: true, isAvailable: false });
        }

        res.status(200).json({ success: true, isAvailable: true });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Profile Update
export const updateProfile = async (req, res, next) => {
    try {
        const { name, email, whatsapp } = req.body;

        // Ensure email isn't taken if updating
        if (email) {
            const existingAgent = await Agent.findOne({ email });
            if (existingAgent && existingAgent._id.toString() !== req.agent.id) {
                return res.status(400).json({ success: false, message: 'Email is already in use by another account.' });
            }
        }

        const updateData = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (whatsapp !== undefined) updateData.whatsapp = whatsapp; // allow empty strictly if wanted, or valid

        const agent = await Agent.findByIdAndUpdate(
            req.agent.id,
            updateData,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            agent
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// Update user password
export const updatePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ success: false, message: 'Please provide both current and new passwords.' });
        }

        const agent = await Agent.findById(req.agent.id).select('+password');

        if (!(await agent.matchPassword(currentPassword))) {
            return res.status(401).json({ success: false, message: 'Password is incorrect.' });
        }

        agent.password = newPassword;
        await agent.save();

        sendTokenResponse(agent, 200, res);
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// Forgot Password
export const forgotPassword = async (req, res, next) => {
    try {
        const agent = await Agent.findOne({ email: req.body.email });
        if (!agent) {
            return res.status(404).json({ success: false, message: 'There is no user with that email' });
        }

        const resetOTP = agent.getResetPasswordOTP();
        await agent.save({ validateBeforeSave: false });

        const message = `Your password reset OTP is ${resetOTP}. It will expire in 10 minutes.`;
        const htmlBody = getOtpEmailTemplate(resetOTP, agent.name);

        console.log(`\n=== DEV MODE OTP FOR ${agent.email}: ${resetOTP} ===\n`);

        try {
            await sendEmail({
                email: agent.email,
                subject: 'Password Reset OTP - Orbitle',
                message,
                html: htmlBody
            });

            res.status(200).json({ success: true, message: 'OTP sent to your email.' });
        } catch (err) {
            console.error(err);
            agent.resetPasswordOTP = undefined;
            agent.resetPasswordExpire = undefined;
            await agent.save({ validateBeforeSave: false });

            return res.status(500).json({ success: false, message: 'Email could not be sent' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Reset Password
export const resetPassword = async (req, res, next) => {
    try {
        const { otp, email } = req.body;
        
        if (!otp || !email) {
             return res.status(400).json({ success: false, message: 'OTP and email are required' });
        }

        const resetPasswordOTP = crypto.createHash('sha256').update(otp).digest('hex');

        const agent = await Agent.findOne({
            email,
            resetPasswordOTP,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!agent) {
            return res.status(400).json({ success: false, message: 'Invalid OTP or OTP has expired' });
        }

        // Set new password
        agent.password = req.body.password;
        agent.resetPasswordOTP = undefined;
        agent.resetPasswordExpire = undefined;

        await agent.save();

        sendTokenResponse(agent, 200, res);
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Token helper
const sendTokenResponse = (agent, statusCode, res) => {
    const token = agent.getSignedJwtToken();

    const options = {
        expires: new Date(
            Date.now() + (parseInt(process.env.JWT_COOKIE_EXPIRE, 10) || 30) * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        domain: process.env.NODE_ENV === 'production' ? process.env.COOKIE_DOMAIN : undefined,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    };

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token,
            agent: {
                id: agent._id,
                name: agent.name,
                email: agent.email,
                businessName: agent.businessName,
                isOnboarded: agent.isOnboarded
            }
        });
};

// Google OAuth URL Generator / Redirector
export const googleAuth = async (req, res) => {
    const client_id = process.env.GOOGLE_CLIENT_ID;
    const redirect_uri = process.env.GOOGLE_CALLBACK_URL;
    
    if (!client_id || !redirect_uri) {
        return res.status(500).json({ success: false, message: 'Google OAuth is not configured on the server.' });
    }

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${encodeURIComponent(client_id)}&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=email%20profile&prompt=select_account`;

    // Check if AJAX request (expects JSON) or direct browser navigation
    if (req.headers.accept?.includes('application/json')) {
        return res.status(200).json({ success: true, url: authUrl });
    } else {
        return res.redirect(authUrl);
    }
};

// Google OAuth Callback
export const googleAuthCallback = async (req, res) => {
    try {
        const { code } = req.query;
        if (!code) {
            return res.redirect(`${process.env.CLIENT_URL || 'http://localhost:3000'}/login?error=no_code`);
        }

        const client_id = process.env.GOOGLE_CLIENT_ID;
        const client_secret = process.env.GOOGLE_CLIENT_SECRET;
        const redirect_uri = process.env.GOOGLE_CALLBACK_URL;

        // Exchange code for tokens
        const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                code,
                client_id,
                client_secret,
                redirect_uri,
                grant_type: 'authorization_code'
            })
        });

        const tokenData = await tokenRes.json();
        if (!tokenData.access_token) {
            console.error('[GOOGLE OAUTH ERROR] Failed to exchange token:', tokenData);
            return res.redirect(`${process.env.CLIENT_URL || 'http://localhost:3000'}/login?error=token_exchange_failed`);
        }

        // Get user info
        const userRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { Authorization: `Bearer ${tokenData.access_token}` }
        });

        const userData = await userRes.json();
        if (!userData.email) {
            console.error('[GOOGLE OAUTH ERROR] Failed to get user info:', userData);
            return res.redirect(`${process.env.CLIENT_URL || 'http://localhost:3000'}/login?error=user_info_failed`);
        }

        const email = userData.email.toLowerCase();
        const name = userData.name || '';

        // Check if agent already exists
        let agent = await Agent.findOne({ email });

        if (agent) {
            // Already registered - Log in
            const token = agent.getSignedJwtToken();
            const cookieOptions = {
                expires: new Date(
                    Date.now() + (parseInt(process.env.JWT_COOKIE_EXPIRE, 10) || 30) * 24 * 60 * 60 * 1000
                ),
                httpOnly: true,
                domain: process.env.NODE_ENV === 'production' ? process.env.COOKIE_DOMAIN : undefined,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax'
            };

            const dashboardUrl = process.env.DASHBOARD_URL || 'http://localhost:5174';
            const redirectPath = agent.isOnboarded ? '/dashboard' : '/onboarding';

            return res
                .cookie('token', token, cookieOptions)
                .redirect(`${dashboardUrl}${redirectPath}`);
        } else {
            // New user - redirect to signup/callback with temporary session token
            // Sign a temporary token that expires in 15 minutes
            const tempToken = jwt.sign(
                { email, name, isGooglePending: true },
                process.env.JWT_SECRET,
                { expiresIn: '15m' }
            );

            const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
            return res.redirect(`${clientUrl}/signup/callback?session=${encodeURIComponent(tempToken)}`);
        }
    } catch (err) {
        console.error('[GOOGLE CALLBACK ERROR]', err);
        return res.redirect(`${process.env.CLIENT_URL || 'http://localhost:3000'}/login?error=server_error`);
    }
};

// Complete Google Registration
export const googleCompleteRegister = async (req, res) => {
    try {
        const { sessionToken, role, phone, businessName } = req.body;

        if (!sessionToken || !role || !phone || !businessName) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }

        // Verify temporary token
        let decoded;
        try {
            decoded = jwt.verify(sessionToken, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(400).json({ success: false, message: 'Invalid or expired session. Please sign up again.' });
        }

        if (!decoded.isGooglePending || !decoded.email) {
            return res.status(400).json({ success: false, message: 'Invalid session structure.' });
        }

        const email = decoded.email.toLowerCase();

        // Prevent duplicate registration
        const exists = await Agent.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
        }

        // Generate a random secure password for Google users since it's required by schema but not used
        const randomPassword = crypto.randomBytes(16).toString('hex');

        const agent = await Agent.create({
            name: decoded.name,
            email,
            password: randomPassword,
            businessName,
            whatsapp: phone,
            planType: 'trial',
            trialEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        });

        sendTokenResponse(agent, 201, res);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ success: false, message: 'This email or phone is already registered.' });
        }
        res.status(500).json({ success: false, message: err.message });
    }
};
