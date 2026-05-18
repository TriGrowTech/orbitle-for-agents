import mongoose from 'mongoose';

const legalPageSchema = new mongoose.Schema(
    {
        agentId: {
            type: mongoose.Schema.ObjectId,
            ref: 'Agent',
            required: true,
            index: true
        },
        pageType: {
            type: String,
            enum: ['privacy_policy', 'terms_of_service', 'refund_policy', 'cancellation_policy'],
            required: [true, 'Page type is required']
        },
        title: {
            type: String,
            required: [true, 'Page title is required'],
            trim: true
        },
        content: {
            type: String,
            required: [true, 'Page content is required']
        },
        isPublished: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

// One legal page of each type per agent
legalPageSchema.index({ agentId: 1, pageType: 1 }, { unique: true });

export default mongoose.model('LegalPage', legalPageSchema);
