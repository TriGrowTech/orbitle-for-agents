import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema(
    {
        agentId: {
            type: mongoose.Schema.ObjectId,
            ref: 'Agent',
            required: true,
            index: true
        },
        title: {
            type: String,
            trim: true,
            maxlength: [100, 'Title cannot be more than 100 characters']
        },
        subtitle: {
            type: String,
            trim: true,
            maxlength: [200, 'Subtitle cannot be more than 200 characters']
        },
        imageUrl: {
            type: String,
            default: ''
        },
        linkUrl: {
            type: String,
            default: ''
        },
        // 'hero_slide' = hero carousel images, 'promotional' = main banner cards
        bannerType: {
            type: String,
            enum: ['hero_slide', 'promotional'],
            default: 'promotional'
        },
        // Position order for drag-and-drop reordering
        position: {
            type: Number,
            default: 0
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

bannerSchema.index({ agentId: 1, isActive: 1, position: 1 });

export default mongoose.model('Banner', bannerSchema);
