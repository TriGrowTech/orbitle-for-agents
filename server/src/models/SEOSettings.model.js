import mongoose from 'mongoose';

const seoSettingsSchema = new mongoose.Schema(
    {
        agentId: {
            type: mongoose.Schema.ObjectId,
            ref: 'Agent',
            required: true,
            unique: true,
            index: true
        },
        metaTitle: {
            type: String,
            trim: true,
            maxlength: [70, 'Meta title should be under 70 characters for SEO']
        },
        metaDescription: {
            type: String,
            trim: true,
            maxlength: [160, 'Meta description should be under 160 characters for SEO']
        },
        metaKeywords: {
            type: [String],
            default: []
        },
        ogImage: {
            type: String,
            default: ''
        },
        // Google Analytics / tracking
        googleAnalyticsId: {
            type: String,
            trim: true
        },
        // Custom scripts (for pixel tracking etc.)
        headScripts: {
            type: String,
            default: ''
        }
    },
    { timestamps: true }
);

export default mongoose.model('SEOSettings', seoSettingsSchema);
