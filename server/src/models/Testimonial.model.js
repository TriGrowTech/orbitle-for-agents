import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
    {
        agentId: {
            type: mongoose.Schema.ObjectId,
            ref: 'Agent',
            required: true,
            index: true
        },
        customerName: {
            type: String,
            required: [true, 'Customer name is required'],
            trim: true,
            maxlength: [80, 'Name cannot be more than 80 characters']
        },
        destination: {
            type: String,
            trim: true
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            default: 5
        },
        review: {
            type: String,
            required: [true, 'Review text is required'],
            maxlength: [500, 'Review cannot be more than 500 characters']
        },
        avatarUrl: {
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

testimonialSchema.index({ agentId: 1, isActive: 1 });

export default mongoose.model('Testimonial', testimonialSchema);
