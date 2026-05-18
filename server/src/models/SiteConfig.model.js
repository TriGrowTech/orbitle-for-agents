import mongoose from 'mongoose';

const siteConfigSchema = new mongoose.Schema(
    {
        agentId: {
            type: mongoose.Schema.ObjectId,
            ref: 'Agent',
            required: true,
            unique: true
        },

        // ── Branding / Company Info ──────────────────────────────
        companyName: { type: String, default: '' },
        contactEmail: { type: String, default: '' },
        contactPhone: { type: String, default: '' },
        address: { type: String, default: '' },
        facebookUrl: { type: String, default: '' },
        instagramUrl: { type: String, default: '' },
        defaultWhatsappMessage: {
            type: String,
            default: "Hi! I'm interested in your travel packages. Can you help me plan my trip?"
        },
        currency: { type: String, default: 'INR' },
        timezone: { type: String, default: 'IST' },

        // ── Topbar offer banner ─────────────────────────────────
        topbarOffer: {
            text: { type: String, default: '' },
            ctaText: { type: String, default: '' },
            ctaLink: { type: String, default: '' },
            isActive: { type: Boolean, default: false }
        },

        // ── Package card offer strip ────────────────────────────
        cardOffer: {
            text: { type: String, default: '' },
            bgColor: { type: String, default: 'red' },
            isActive: { type: Boolean, default: false }
        }
    },
    { timestamps: true }
);

export default mongoose.model('SiteConfig', siteConfigSchema);
