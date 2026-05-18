import SEOSettings from '../models/SEOSettings.model.js';

// GET /api/seo — Get SEO settings for authenticated agent (creates defaults if none exist)
export const getSEOSettings = async (req, res) => {
    try {
        let settings = await SEOSettings.findOne({ agentId: req.agent.id });

        // Auto-create defaults if no settings exist yet
        if (!settings) {
            settings = await SEOSettings.create({ agentId: req.agent.id });
        }

        res.status(200).json({ success: true, data: settings });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// PUT /api/seo — Update SEO settings (upsert — create if not exists, update if exists)
export const updateSEOSettings = async (req, res) => {
    try {
        const { metaTitle, metaDescription, metaKeywords, ogImage, googleAnalyticsId, headScripts } = req.body;

        const updateData = {};
        if (metaTitle !== undefined) updateData.metaTitle = metaTitle;
        if (metaDescription !== undefined) updateData.metaDescription = metaDescription;
        if (metaKeywords !== undefined) updateData.metaKeywords = metaKeywords;
        if (ogImage !== undefined) updateData.ogImage = ogImage;
        if (googleAnalyticsId !== undefined) updateData.googleAnalyticsId = googleAnalyticsId;
        if (headScripts !== undefined) updateData.headScripts = headScripts;

        const settings = await SEOSettings.findOneAndUpdate(
            { agentId: req.agent.id },
            updateData,
            { new: true, upsert: true, runValidators: true }
        );

        res.status(200).json({ success: true, data: settings });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
