import mongoose from 'mongoose';

const contentSectionSchema = new mongoose.Schema(
    {
        agentId: {
            type: mongoose.Schema.ObjectId,
            ref: 'Agent',
            required: true,
            index: true
        },
        // Section type determines rendering on marketplace
        sectionType: {
            type: String,
            enum: ['hero_tagline', 'about_us', 'why_choose_us', 'custom'],
            required: [true, 'Section type is required']
        },
        title: {
            type: String,
            required: [true, 'Section title is required'],
            trim: true,
            maxlength: [120, 'Title cannot be more than 120 characters']
        },
        content: {
            type: String,
            required: [true, 'Section content is required'],
            maxlength: [2000, 'Content cannot be more than 2000 characters']
        },
        // For sections with bullet points or feature lists
        items: [{
            icon: { type: String, default: '' },
            title: { type: String, required: true },
            description: { type: String, default: '' }
        }],
        imageUrl: {
            type: String,
            default: ''
        },
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

contentSectionSchema.index({ agentId: 1, sectionType: 1 });

export default mongoose.model('ContentSection', contentSectionSchema);
