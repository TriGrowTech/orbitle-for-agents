import Lead from '../models/Lead.model.js';

// @desc    Get all leads for the logged in agent
// @route   GET /api/leads
// @access  Private (Agent)
export const getLeads = async (req, res) => {
    try {
        const leads = await Lead.find({ agentId: req.agent.id }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: leads.length,
            data: leads
        });
    } catch (err) {
        console.error('[GET LEADS ERROR]', err);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Update lead status
// @route   PUT /api/leads/:id
// @access  Private (Agent)
export const updateLeadStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ success: false, message: 'Please provide a status' });
        }

        let lead = await Lead.findById(req.params.id);

        if (!lead) {
            return res.status(404).json({ success: false, message: 'Lead not found' });
        }

        // Make sure lead belongs to agent
        if (lead.agentId.toString() !== req.agent.id) {
            return res.status(401).json({ success: false, message: 'Not authorized to update this lead' });
        }

        lead = await Lead.findByIdAndUpdate(req.params.id, { status }, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: lead });
    } catch (err) {
        console.error('[UPDATE LEAD ERROR]', err);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Delete lead
// @route   DELETE /api/leads/:id
// @access  Private (Agent)
export const deleteLead = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);

        if (!lead) {
            return res.status(404).json({ success: false, message: 'Lead not found' });
        }

        // Make sure lead belongs to agent
        if (lead.agentId.toString() !== req.agent.id) {
            return res.status(401).json({ success: false, message: 'Not authorized to delete this lead' });
        }

        await lead.deleteOne();

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        console.error('[DELETE LEAD ERROR]', err);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
};
