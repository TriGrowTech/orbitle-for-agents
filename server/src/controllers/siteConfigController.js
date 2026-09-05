import SiteConfig from '../models/SiteConfig.model.js';

// GET /api/site-config — Get site config for the authenticated agent
export const getSiteConfig = async (req, res) => {
    try {
        let config = await SiteConfig.findOne({ agentId: req.agent.id });
        
        // Auto-create if doesn't exist
        if (!config) {
            config = await SiteConfig.create({ agentId: req.agent.id });
        }

        res.status(200).json({ success: true, data: config });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// PUT /api/site-config — Update site config
export const updateSiteConfig = async (req, res) => {
    try {
        const {
            companyName, contactEmail, contactPhone, address,
            facebookUrl, instagramUrl, defaultWhatsappMessage,
            currency, timezone,
            heroTitle, heroSubtitle,
            topbarOffer, cardOffer,
            aboutUs, destinations
        } = req.body;

        let config = await SiteConfig.findOne({ agentId: req.agent.id });

        if (!config) {
            config = await SiteConfig.create({ agentId: req.agent.id });
        }

        // Branding & Hero fields — direct set
        if (companyName !== undefined) config.companyName = companyName;
        if (contactEmail !== undefined) config.contactEmail = contactEmail;
        if (contactPhone !== undefined) config.contactPhone = contactPhone;
        if (address !== undefined) config.address = address;
        if (facebookUrl !== undefined) config.facebookUrl = facebookUrl;
        if (instagramUrl !== undefined) config.instagramUrl = instagramUrl;
        if (defaultWhatsappMessage !== undefined) config.defaultWhatsappMessage = defaultWhatsappMessage;
        if (currency !== undefined) config.currency = currency;
        if (timezone !== undefined) config.timezone = timezone;
        if (heroTitle !== undefined) config.heroTitle = heroTitle;
        if (heroSubtitle !== undefined) config.heroSubtitle = heroSubtitle;

        // Nested objects — merge
        if (topbarOffer !== undefined) {
            config.topbarOffer = { ...config.topbarOffer.toObject(), ...topbarOffer };
        }
        if (cardOffer !== undefined) {
            config.cardOffer = { ...config.cardOffer.toObject(), ...cardOffer };
        }

        // About Us — full replace
        if (aboutUs !== undefined) {
            config.aboutUs = aboutUs;
        }

        // Destinations — full replace
        if (destinations !== undefined) {
            config.destinations = destinations;
        }

        await config.save();
        res.status(200).json({ success: true, data: config });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
