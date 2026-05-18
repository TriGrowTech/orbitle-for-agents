import ContentSection from '../models/ContentSection.model.js';

// GET /api/content-sections
export const getContentSections = async (req, res) => {
    try {
        const sections = await ContentSection.find({ agentId: req.agent.id })
            .sort({ position: 1, createdAt: -1 });

        res.status(200).json({ success: true, data: sections });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// POST /api/content-sections
export const createContentSection = async (req, res) => {
    try {
        const { sectionType, title, content, items, imageUrl, position, isActive } = req.body;

        let finalPosition = position;
        if (finalPosition === undefined || finalPosition === null) {
            const count = await ContentSection.countDocuments({ agentId: req.agent.id });
            finalPosition = count;
        }

        const section = await ContentSection.create({
            agentId: req.agent.id,
            sectionType,
            title,
            content,
            items: items || [],
            imageUrl: imageUrl || '',
            position: finalPosition,
            isActive: isActive !== undefined ? isActive : true
        });

        res.status(201).json({ success: true, data: section });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// PUT /api/content-sections/:id
export const updateContentSection = async (req, res) => {
    try {
        const section = await ContentSection.findOne({
            _id: req.params.id,
            agentId: req.agent.id
        });

        if (!section) {
            return res.status(404).json({ success: false, message: 'Section not found' });
        }

        const { sectionType, title, content, items, imageUrl, position, isActive } = req.body;

        if (sectionType !== undefined) section.sectionType = sectionType;
        if (title !== undefined) section.title = title;
        if (content !== undefined) section.content = content;
        if (items !== undefined) section.items = items;
        if (imageUrl !== undefined) section.imageUrl = imageUrl;
        if (position !== undefined) section.position = position;
        if (isActive !== undefined) section.isActive = isActive;

        await section.save();

        res.status(200).json({ success: true, data: section });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// DELETE /api/content-sections/:id
export const deleteContentSection = async (req, res) => {
    try {
        const section = await ContentSection.findOneAndDelete({
            _id: req.params.id,
            agentId: req.agent.id
        });

        if (!section) {
            return res.status(404).json({ success: false, message: 'Section not found' });
        }

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
