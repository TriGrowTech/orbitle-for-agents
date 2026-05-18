import Banner from '../models/Banner.model.js';

// GET /api/banners — Get all banners for the authenticated agent
export const getBanners = async (req, res) => {
    try {
        const banners = await Banner.find({ agentId: req.agent.id })
            .sort({ position: 1, createdAt: -1 });

        res.status(200).json({ success: true, data: banners });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// POST /api/banners — Create a new banner
export const createBanner = async (req, res) => {
    try {
        const { title, subtitle, linkUrl, position, isActive, bannerType } = req.body;

        // Handle image upload
        let imageUrl = '';
        if (req.file) {
            imageUrl = req.file.filename;
        }

        // Auto-assign position if not provided
        let finalPosition = position;
        if (finalPosition === undefined || finalPosition === null) {
            const count = await Banner.countDocuments({ agentId: req.agent.id, bannerType: bannerType || 'promotional' });
            finalPosition = count;
        }

        const banner = await Banner.create({
            agentId: req.agent.id,
            title,
            subtitle,
            imageUrl,
            linkUrl,
            bannerType: bannerType || 'promotional',
            position: finalPosition,
            isActive: isActive !== undefined ? isActive : true
        });

        res.status(201).json({ success: true, data: banner });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// PUT /api/banners/:id — Update a banner
export const updateBanner = async (req, res) => {
    try {
        const banner = await Banner.findOne({ _id: req.params.id, agentId: req.agent.id });

        if (!banner) {
            return res.status(404).json({ success: false, message: 'Banner not found' });
        }

        const { title, subtitle, linkUrl, position, isActive } = req.body;

        if (title !== undefined) banner.title = title;
        if (subtitle !== undefined) banner.subtitle = subtitle;
        if (linkUrl !== undefined) banner.linkUrl = linkUrl;
        if (position !== undefined) banner.position = position;
        if (isActive !== undefined) banner.isActive = isActive;

        if (req.file) {
            banner.imageUrl = req.file.filename;
        }

        await banner.save();

        res.status(200).json({ success: true, data: banner });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// DELETE /api/banners/:id — Delete a banner
export const deleteBanner = async (req, res) => {
    try {
        const banner = await Banner.findOneAndDelete({
            _id: req.params.id,
            agentId: req.agent.id
        });

        if (!banner) {
            return res.status(404).json({ success: false, message: 'Banner not found' });
        }

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
