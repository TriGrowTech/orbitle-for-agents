import Agent from '../models/Agent.model.js';
import Package from '../models/Package.model.js';
import Lead from '../models/Lead.model.js';
import Banner from '../models/Banner.model.js';
import Testimonial from '../models/Testimonial.model.js';
import ContentSection from '../models/ContentSection.model.js';
import SEOSettings from '../models/SEOSettings.model.js';
import LegalPage from '../models/LegalPage.model.js';
import SiteConfig from '../models/SiteConfig.model.js';

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
            hotelBooked, hotelType, ticketsBooked, specialRequests,
            packageName, source
        } = req.body;

        if (!subdomain || !name || !phone) {
            return res.status(400).json({ success: false, message: 'Required fields missing.' });
        }

        const agent = await Agent.findOne({ subdomain: subdomain.toLowerCase() });
        if (!agent) {
            return res.status(404).json({ success: false, message: 'Agent not found.' });
        }

        const allowedSources = ['popup', 'hero_form', 'package_detail', 'plan_tour', 'chatbot', 'marketplace'];
        const leadSource = allowedSources.includes(source) ? source : 'marketplace';

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
            packageName,
            source: leadSource
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

// GET /api/public/banners/:subdomain
// Public — returns active banners for an agent
export const getPublicBanners = async (req, res) => {
    try {
        const agent = await Agent.findOne({ subdomain: req.params.subdomain.toLowerCase() });
        if (!agent || !agent.isActive) {
            return res.status(404).json({ success: false, message: 'Agent not found.' });
        }

        const banners = await Banner.find({ agentId: agent._id, isActive: true })
            .select('title subtitle imageUrl linkUrl position bannerType')
            .sort({ position: 1 });

        return res.status(200).json({ success: true, data: banners });
    } catch (err) {
        console.error('[PUBLIC BANNERS ERROR]', err);
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

// GET /api/public/testimonials/:subdomain
// Public — returns active testimonials for an agent
export const getPublicTestimonials = async (req, res) => {
    try {
        const agent = await Agent.findOne({ subdomain: req.params.subdomain.toLowerCase() });
        if (!agent || !agent.isActive) {
            return res.status(404).json({ success: false, message: 'Agent not found.' });
        }

        const testimonials = await Testimonial.find({ agentId: agent._id, isActive: true })
            .select('customerName destination rating review avatarUrl position')
            .sort({ position: 1 });

        return res.status(200).json({ success: true, data: testimonials });
    } catch (err) {
        console.error('[PUBLIC TESTIMONIALS ERROR]', err);
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

// GET /api/public/content/:subdomain
// Public — returns active content sections for an agent
export const getPublicContentSections = async (req, res) => {
    try {
        const agent = await Agent.findOne({ subdomain: req.params.subdomain.toLowerCase() });
        if (!agent || !agent.isActive) {
            return res.status(404).json({ success: false, message: 'Agent not found.' });
        }

        const sections = await ContentSection.find({ agentId: agent._id, isActive: true })
            .select('sectionType title content items imageUrl position')
            .sort({ position: 1 });

        return res.status(200).json({ success: true, data: sections });
    } catch (err) {
        console.error('[PUBLIC CONTENT ERROR]', err);
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

// GET /api/public/seo/:subdomain
// Public — returns SEO settings for an agent's marketplace
export const getPublicSEO = async (req, res) => {
    try {
        const agent = await Agent.findOne({ subdomain: req.params.subdomain.toLowerCase() });
        if (!agent || !agent.isActive) {
            return res.status(404).json({ success: false, message: 'Agent not found.' });
        }

        const seo = await SEOSettings.findOne({ agentId: agent._id })
            .select('metaTitle metaDescription metaKeywords ogImage googleAnalyticsId headScripts');

        return res.status(200).json({ success: true, data: seo });
    } catch (err) {
        console.error('[PUBLIC SEO ERROR]', err);
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

// GET /api/public/legal/:subdomain/:pageType
// Public — returns a specific legal page for an agent
export const getPublicLegalPage = async (req, res) => {
    try {
        const agent = await Agent.findOne({ subdomain: req.params.subdomain.toLowerCase() });
        if (!agent || !agent.isActive) {
            return res.status(404).json({ success: false, message: 'Agent not found.' });
        }

        const page = await LegalPage.findOne({
            agentId: agent._id,
            pageType: req.params.pageType,
            isPublished: true
        }).select('title content pageType updatedAt');

        if (!page) {
            return res.status(404).json({ success: false, message: 'Page not found.' });
        }

        return res.status(200).json({ success: true, data: page });
    } catch (err) {
        console.error('[PUBLIC LEGAL ERROR]', err);
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

// GET /api/public/site-config/:subdomain
// Public — returns site config (topbar offer, card offer, aboutUs, destinations) for marketplace
export const getPublicSiteConfig = async (req, res) => {
    try {
        const agent = await Agent.findOne({ subdomain: req.params.subdomain.toLowerCase() });
        if (!agent || !agent.isActive) {
            return res.status(404).json({ success: false, message: 'Agent not found.' });
        }

        const config = await SiteConfig.findOne({ agentId: agent._id })
            .select('companyName contactEmail contactPhone address facebookUrl instagramUrl defaultWhatsappMessage currency timezone topbarOffer cardOffer aboutUs destinations');

        return res.status(200).json({ success: true, data: config || {} });
    } catch (err) {
        console.error('[PUBLIC SITE-CONFIG ERROR]', err);
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};
