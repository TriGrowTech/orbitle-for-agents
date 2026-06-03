import mongoose from 'mongoose';

const CallRequestSchema = new mongoose.Schema({
    agentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agent',
        required: true
    },
    reason: {
        type: String,
        trim: true,
        default: ''
    },
    phone: {
        type: String,
        trim: true
    },
    preferredTime: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['pending', 'scheduled', 'completed'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

CallRequestSchema.index({ agentId: 1 });
CallRequestSchema.index({ status: 1 });

export default mongoose.model('CallRequest', CallRequestSchema);
