import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const agentSchema = new mongoose.Schema({
    // Auth & Basic Info
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

    // Brand Setup (From your BrandSetup.tsx)
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

    // Multi-tenant Domain Logic
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

    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Encrypt password using bcrypt
agentSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
agentSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

// Match user entered password to hashed password in database
agentSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('Agent', agentSchema);
