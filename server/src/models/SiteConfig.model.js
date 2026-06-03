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
        },

        // ── About Us page content ──────────────────────────────
        aboutUs: {
            heroTitle: { type: String, default: '' },
            heroSubtitle: { type: String, default: '' },
            heroBackgroundImage: { type: String, default: '' },
            stats: [{
                value: { type: String, default: '' },
                label: { type: String, default: '' }
            }],
            storyTitle: { type: String, default: '' },
            storyParagraph1: { type: String, default: '' },
            storyParagraph2: { type: String, default: '' },
            storyBullets: [{ type: String }],
            storyImage1: { type: String, default: '' },
            storyImage2: { type: String, default: '' },
            yearsBadgeText: { type: String, default: '' },
            credentials: [{
                label: { type: String, default: '' },
                number: { type: String, default: '' },
                description: { type: String, default: '' },
                color: { type: String, enum: ['blue', 'green', 'amber', 'purple'], default: 'blue' }
            }],
            awards: [{
                year: { type: String, default: '' },
                title: { type: String, default: '' },
                org: { type: String, default: '' }
            }]
        },

        // ── Destinations ────────────────────────────────────────
        destinations: [{
            name: { type: String, required: true },
            category: { type: String, enum: ['domestic', 'international'], required: true },
            active: { type: Boolean, default: true },
            trending: { type: Boolean, default: false },
            image: { type: String, default: '' }
        }]
    },
    { timestamps: true }
);

export default mongoose.model('SiteConfig', siteConfigSchema);
