import LegalPage from '../models/LegalPage.model.js';

// GET /api/legal — Get all legal pages for the authenticated agent
export const getLegalPages = async (req, res) => {
    try {
        const pages = await LegalPage.find({ agentId: req.agent.id })
            .sort({ pageType: 1 });

        res.status(200).json({ success: true, data: pages });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// GET /api/legal/:pageType — Get a specific legal page
export const getLegalPage = async (req, res) => {
    try {
        const page = await LegalPage.findOne({
            agentId: req.agent.id,
            pageType: req.params.pageType
        });

        if (!page) {
            return res.status(200).json({ success: true, data: null });
        }

        res.status(200).json({ success: true, data: page });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// PUT /api/legal/:pageType — Create or update a legal page (upsert)
export const upsertLegalPage = async (req, res) => {
    try {
        const { title, content, isPublished } = req.body;
        const { pageType } = req.params;

        const validTypes = ['privacy_policy', 'terms_of_service', 'refund_policy', 'cancellation_policy'];
        if (!validTypes.includes(pageType)) {
            return res.status(400).json({ success: false, message: `Invalid page type. Must be one of: ${validTypes.join(', ')}` });
        }

        const updateData = { pageType };
        if (title !== undefined) updateData.title = title;
        if (content !== undefined) updateData.content = content;
        if (isPublished !== undefined) updateData.isPublished = isPublished;

        const page = await LegalPage.findOneAndUpdate(
            { agentId: req.agent.id, pageType },
            { ...updateData, agentId: req.agent.id },
            { new: true, upsert: true, runValidators: true }
        );

        res.status(200).json({ success: true, data: page });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// DELETE /api/legal/:pageType — Delete a legal page
export const deleteLegalPage = async (req, res) => {
    try {
        const page = await LegalPage.findOneAndDelete({
            agentId: req.agent.id,
            pageType: req.params.pageType
        });

        if (!page) {
            return res.status(404).json({ success: false, message: 'Legal page not found' });
        }

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
