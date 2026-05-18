import Testimonial from '../models/Testimonial.model.js';

// GET /api/testimonials
export const getTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find({ agentId: req.agent.id })
            .sort({ position: 1, createdAt: -1 });

        res.status(200).json({ success: true, data: testimonials });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// POST /api/testimonials
export const createTestimonial = async (req, res) => {
    try {
        const { customerName, destination, rating, review, avatarUrl, position, isActive } = req.body;

        let finalPosition = position;
        if (finalPosition === undefined || finalPosition === null) {
            const count = await Testimonial.countDocuments({ agentId: req.agent.id });
            finalPosition = count;
        }

        const testimonial = await Testimonial.create({
            agentId: req.agent.id,
            customerName,
            destination,
            rating: rating || 5,
            review,
            avatarUrl: avatarUrl || '',
            position: finalPosition,
            isActive: isActive !== undefined ? isActive : true
        });

        res.status(201).json({ success: true, data: testimonial });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// PUT /api/testimonials/:id
export const updateTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.findOne({
            _id: req.params.id,
            agentId: req.agent.id
        });

        if (!testimonial) {
            return res.status(404).json({ success: false, message: 'Testimonial not found' });
        }

        const { customerName, destination, rating, review, avatarUrl, position, isActive } = req.body;

        if (customerName !== undefined) testimonial.customerName = customerName;
        if (destination !== undefined) testimonial.destination = destination;
        if (rating !== undefined) testimonial.rating = rating;
        if (review !== undefined) testimonial.review = review;
        if (avatarUrl !== undefined) testimonial.avatarUrl = avatarUrl;
        if (position !== undefined) testimonial.position = position;
        if (isActive !== undefined) testimonial.isActive = isActive;

        await testimonial.save();

        res.status(200).json({ success: true, data: testimonial });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// DELETE /api/testimonials/:id
export const deleteTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.findOneAndDelete({
            _id: req.params.id,
            agentId: req.agent.id
        });

        if (!testimonial) {
            return res.status(404).json({ success: false, message: 'Testimonial not found' });
        }

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
