import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const agentSchema = new mongoose.Schema({
    // Base Auth
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false
    },

    // Profile Config
    businessName: {
        type: String,
        trim: true
    },
    tagline: {
        type: String,
        maxlength: [100, 'Tagline cannot be more than 100 characters']
    },
    whatsapp: {
        type: String,
        match: [/^[0-9+]{10,15}$/, 'Please add a valid WhatsApp number']
    },
    logo: {
        type: String,
        default: 'no-photo.jpg'
    },
    theme: {
        type: String,
        enum: ['navy', 'red', 'cyan', 'default'],
        default: 'default'
    },

    resetPasswordOTP: String,
    resetPasswordExpire: Date,

    // Domains
    subdomain: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        sparse: true 
    },
    customDomain: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        sparse: true
    },

    // Subscription
    planType: {
        type: String,
        enum: ['trial', '6_months', 'yearly', 'lifetime'],
        default: 'trial'
    },
    planExpiry: {
        type: Date
    },
    trialEndsAt: {
        type: Date,
        default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from registration
    },
    totalSpent: {
        type: Number,
        default: 0
    },

    isActive: {
        type: Boolean,
        default: true
    },
    isOnboarded: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Hash password
agentSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Issue JWT
agentSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

// Validate password
agentSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

agentSchema.methods.getResetPasswordOTP = function () {
    const resetOTP = Math.floor(100000 + Math.random() * 900000).toString();
    this.resetPasswordOTP = crypto.createHash('sha256').update(resetOTP).digest('hex');
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    return resetOTP;
};

export default mongoose.model('Agent', agentSchema);
