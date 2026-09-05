import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema({
    agentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agent',
        required: true
    },
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        trim: true
    },
    email: {
        type: String,
        validate: {
            validator: function(v) {
                if (!v) return true; // email is optional — only validate format if provided
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: 'Please provide a valid email address'
        }
    },
    phone: {
        type: String,
        required: [true, 'Please provide a phone number']
    },
    fromLocation: {
        type: String,
    },
    toLocation: {
        type: String,
    },
    departureDate: {
        type: Date,
    },
    numberOfDays: {
        type: Number,
    },
    adults: {
        type: Number,
        default: 1
    },
    children: {
        type: Number,
        default: 0
    },
    budgetRupees: {
        type: Number
    },
    hotelBooked: {
        type: String,
        enum: ['yes', 'no'],
        default: 'no'
    },
    hotelType: {
        type: String
    },
    ticketsBooked: {
        type: String,
        enum: ['yes', 'no'],
        default: 'no'
    },
    packageName: {
        type: String,
    },
    specialRequests: {
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'contacted', 'follow_up', 'quoted', 'converted', 'cancelled'],
        default: 'pending'
    },
    dealAmount: {
        type: Number,
        default: 0
    },
    convertedAt: {
        type: Date
    },
    source: {
        type: String,
        enum: ['popup', 'hero_form', 'package_detail', 'plan_tour', 'chatbot', 'marketplace'],
        default: 'marketplace'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Lead', LeadSchema);
