import mongoose from 'mongoose';

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
        sparse: true // Allows nulls to be unique if they haven't set it yet
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

export default mongoose.model('Agent', agentSchema);
