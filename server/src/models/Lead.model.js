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
        required: [true, 'Please provide an email'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please provide a valid email'
        ]
    },
    phone: {
        type: String,
        required: [true, 'Please provide a phone number']
    },
    fromLocation: {
        type: String,
        required: [true, 'Please provide departure city']
    },
    toLocation: {
        type: String,
        required: [true, 'Please provide destination']
    },
    departureDate: {
        type: Date,
        required: [true, 'Please provide departure date']
    },
    numberOfDays: {
        type: Number,
        required: [true, 'Please provide duration']
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
    specialRequests: {
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'contacted', 'follow-up', 'quoted', 'converted', 'cancelled'],
        default: 'pending'
    },
    source: {
        type: String,
        default: 'Marketplace'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Lead', LeadSchema);
