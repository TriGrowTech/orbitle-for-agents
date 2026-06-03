import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
    // null = broadcast to all agents
    agentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agent',
        default: null
    },
    type: {
        type: String,
        enum: ['offer', 'trial_ending', 'new_lead', 'required_action', 'support_resolution'],
        required: [true, 'Notification type is required']
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    message: {
        type: String,
        required: [true, 'Message is required']
    },
    isRead: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Index for fast agent queries: "my notifications + broadcasts"
NotificationSchema.index({ agentId: 1, createdAt: -1 });
NotificationSchema.index({ createdAt: -1 });

export default mongoose.model('Notification', NotificationSchema);
