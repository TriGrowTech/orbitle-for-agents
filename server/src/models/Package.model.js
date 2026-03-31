import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema(
    {
        // Multi-tenant ref
        agentId: {
            type: mongoose.Schema.ObjectId,
            ref: 'Agent',
            required: true,
            index: true
        },

        // Basic info
        title: {
            type: String,
            required: [true, 'Please add a package title'],
            trim: true,
            maxlength: [100, 'Title cannot be more than 100 characters']
        },
        description: {
            type: String,
            required: [true, 'Please add a description']
        },
        location: {
            type: String,
            required: [true, 'Please add a destination'],
            trim: true
        },
        duration: {
            type: String,
            required: [true, 'Duration is required (e.g. 7 Days / 6 Nights)'],
            trim: true
        },

        // Category & type
        category: {
            type: String,
            enum: ['domestic', 'international'],
            default: 'domestic'
        },
        packageType: {
            type: String,
            enum: ['beach', 'mountain', 'pilgrimage', 'honeymoon', 'adventure', 'wildlife', 'cultural', 'cruise', 'desert', 'city', 'other'],
            default: 'other'
        },

        // Image URLs
        imageUrl1: { type: String, default: '' },
        imageUrl2: { type: String, default: '' },

        // Day-wise itinerary
        itinerary: [
            {
                dayNumber: { type: Number, required: true },
                title: { type: String, required: true, trim: true },
                description: { type: String, required: true }
            }
        ],

        // Pricing
        originalPrice: {
            type: Number,
            required: [true, 'Please add an original price']
        },
        discountedPrice: {
            type: Number,
            default: null
        },

        // Toggles
        isTrending: { type: Boolean, default: false },
        hasOffer: { type: Boolean, default: false },

        // Badges
        badges: {
            type: [{ type: String, enum: ['bestseller', 'hot', 'new', 'limited', 'premium', 'familyFriendly'] }],
            default: []
        },

        // Inclusions & exclusions
        inclusions: { type: [String], default: [] },
        exclusions: { type: [String], default: [] },

        // Terms & conditions
        termsAndConditions: { type: String, default: '' },

        // List / unlist
        isActive: { type: Boolean, default: true }
    },
    { timestamps: true }
);

// Indexes
packageSchema.index({ agentId: 1, isActive: 1 });
packageSchema.index({ isTrending: 1 });
packageSchema.index({ category: 1, packageType: 1 });

export default mongoose.model('Package', packageSchema);
