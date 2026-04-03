import Agent from '../models/Agent.model.js';
import Package from '../models/Package.model.js';
import crypto from 'crypto';
import sendEmail from '../utils/sendEmail.js';
import { getOtpEmailTemplate } from '../utils/emailTemplate.js';

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

        const agent = await Agent.create({
            name,
            email,
            password,
            businessName
        });

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
            Date.now() + (process.env.JWT_COOKIE_EXPIRE || 30) * 24 * 60 * 60 * 1000
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
