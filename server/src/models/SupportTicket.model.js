import mongoose from 'mongoose';

const ReplySchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    from: {
        type: String,
        enum: ['agent', 'superadmin'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const SupportTicketSchema = new mongoose.Schema({
    agentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agent',
        required: true
    },
    type: {
        type: String,
        enum: ['billing', 'technical', 'feature', 'general'],
        required: [true, 'Query type is required']
    },
    subject: {
        type: String,
        required: [true, 'Subject is required'],
        trim: true
    },
    message: {
        type: String,
        required: [true, 'Message is required']
    },
    status: {
        type: String,
        enum: ['open', 'in_progress', 'resolved'],
        default: 'open'
    },
    attachments: [{
        type: String // image URLs
    }],
    replies: [ReplySchema],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

SupportTicketSchema.index({ agentId: 1, createdAt: -1 });
SupportTicketSchema.index({ status: 1, createdAt: -1 });

export default mongoose.model('SupportTicket', SupportTicketSchema);
