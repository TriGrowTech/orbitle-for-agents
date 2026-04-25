import Agent from '../models/Agent.model.js';
import Package from '../models/Package.model.js';
import Lead from '../models/Lead.model.js';

// GET /api/public/agent/:subdomain
// Public — no auth required
// Returns agent profile + active packages
export const getPublicAgentData = async (req, res) => {
    try {
        const { subdomain } = req.params;

        if (!subdomain) {
            return res.status(400).json({ success: false, message: 'Subdomain is required.' });
        }

        const agent = await Agent.findOne({ subdomain: subdomain.toLowerCase() }).select(
            'name businessName tagline logo theme whatsapp subdomain isActive createdAt'
        );

        if (!agent) {
            return res.status(404).json({ success: false, message: 'No agent found for this subdomain.' });
        }

        if (!agent.isActive) {
            return res.status(403).json({ success: false, message: 'This marketplace is currently inactive.' });
        }

        const packages = await Package.find({ agentId: agent._id, isActive: true })
            .select('title description location duration category packageType imageUrl1 imageUrl2 originalPrice discountedPrice isTrending hasOffer badges inclusions')
            .sort({ isTrending: -1, createdAt: -1 });

        return res.status(200).json({
            success: true,
            agent,
            packages
        });
    } catch (err) {
        console.error('[PUBLIC AGENT ERROR]', err);
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

// GET /api/public/package/:id
// Public — no auth required
// Returns full package details (including itinerary, exclusions)
export const getPublicPackageDetails = async (req, res) => {
    try {
        const { id } = req.params;
        
        const pkg = await Package.findById(id);
        
        if (!pkg) {
            return res.status(404).json({ success: false, message: 'Package not found.' });
        }

        // Optional: Check if package belongs to an active agent
        const agent = await Agent.findById(pkg.agentId);
        if (!agent || !agent.isActive) {
             return res.status(404).json({ success: false, message: 'Package not available.' });
        }

        return res.status(200).json({ success: true, data: pkg });
    } catch (err) {
        console.error('[PUBLIC PACKAGE ERROR]', err);
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

// POST /api/public/lead
// Public — no auth required
// Submits a lead from the marketplace
export const submitLead = async (req, res) => {
    try {
        const { 
            subdomain, name, email, phone, fromLocation, toLocation, 
            departureDate, numberOfDays, adults, children, budgetRupees, 
            hotelBooked, hotelType, ticketsBooked, specialRequests 
        } = req.body;

        if (!subdomain || !name || !email || !phone) {
            return res.status(400).json({ success: false, message: 'Required fields missing.' });
        }

        const agent = await Agent.findOne({ subdomain: subdomain.toLowerCase() });
        if (!agent) {
            return res.status(404).json({ success: false, message: 'Agent not found.' });
        }

        const newLead = await Lead.create({
            agentId: agent._id,
            name,
            email,
            phone,
            fromLocation,
            toLocation,
            departureDate,
            numberOfDays,
            adults,
            children,
            budgetRupees,
            hotelBooked,
            hotelType,
            ticketsBooked,
            specialRequests,
            source: 'Marketplace'
        });

        return res.status(201).json({
            success: true,
            message: 'Your enquiry has been submitted successfully!',
            leadId: newLead._id
        });
    } catch (err) {
        console.error('[SUBMIT LEAD ERROR]', err);
        return res.status(500).json({ success: false, message: 'Failed to submit enquiry.' });
    }
};
