import SupportTicket from '../models/SupportTicket.model.js';
import CallRequest from '../models/CallRequest.model.js';
import Notification from '../models/Notification.model.js';
import { getIO } from '../utils/socket.js';

// ═══════════════════════════════════════════════════════════════════════════════
// AGENT-SIDE ENDPOINTS (auth: isAuthenticated)
// ═══════════════════════════════════════════════════════════════════════════════

// POST /api/support — Agent creates a support ticket
export const createTicket = async (req, res) => {
    try {
        const { type, subject, message } = req.body;

        if (!type || !message) {
            return res.status(400).json({ success: false, message: 'Type and message are required' });
        }

        const ticket = await SupportTicket.create({
            agentId: req.agent.id,
            type,
            subject: subject || `${type.charAt(0).toUpperCase() + type.slice(1)} Query`,
            message
        });

        console.log(`[SUPPORT] Ticket created by agent ${req.agent.id}: ${ticket._id}`);

        return res.status(201).json({ success: true, data: ticket });
    } catch (err) {
        console.error('[CREATE TICKET ERROR]', err);
        return res.status(500).json({ success: false, message: 'Failed to create ticket' });
    }
};

// GET /api/support — Agent views their tickets
export const getMyTickets = async (req, res) => {
    try {
        const tickets = await SupportTicket.find({ agentId: req.agent.id })
            .sort({ createdAt: -1 });

        return res.status(200).json({ success: true, data: tickets });
    } catch (err) {
        console.error('[GET MY TICKETS ERROR]', err);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// GET /api/support/:id — Agent views a specific ticket
export const getTicketDetail = async (req, res) => {
    try {
        const ticket = await SupportTicket.findOne({
            _id: req.params.id,
            agentId: req.agent.id
        });

        if (!ticket) {
            return res.status(404).json({ success: false, message: 'Ticket not found' });
        }

        return res.status(200).json({ success: true, data: ticket });
    } catch (err) {
        console.error('[GET TICKET DETAIL ERROR]', err);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// POST /api/support/:id/reply — Agent replies to a support ticket
export const agentReplyToTicket = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ success: false, message: 'Reply message is required' });
        }

        const ticket = await SupportTicket.findOne({
            _id: req.params.id,
            agentId: req.agent.id
        });

        if (!ticket) {
            return res.status(404).json({ success: false, message: 'Ticket not found' });
        }

        // Push reply
        ticket.replies.push({
            message,
            from: 'agent',
            createdAt: new Date()
        });

        // Re-open resolved ticket if agent replies
        if (ticket.status === 'resolved') {
            ticket.status = 'in_progress';
        }

        await ticket.save();

        console.log(`[SUPPORT] Agent replied to ticket ${ticket._id}`);

        return res.status(200).json({ success: true, data: ticket });
    } catch (err) {
        console.error('[AGENT REPLY ERROR]', err);
        return res.status(500).json({ success: false, message: 'Failed to send reply' });
    }
};

// POST /api/support/call-request — Agent schedules a call
export const createCallRequest = async (req, res) => {
    try {
        const { reason, phone, preferredTime } = req.body;

        const callRequest = await CallRequest.create({
            agentId: req.agent.id,
            reason: reason || '',
            phone: phone || req.agent.whatsapp || '',
            preferredTime: preferredTime || ''
        });

        console.log(`[SUPPORT] Call request by agent ${req.agent.id}: ${callRequest._id}`);

        return res.status(201).json({ success: true, data: callRequest });
    } catch (err) {
        console.error('[CREATE CALL REQUEST ERROR]', err);
        return res.status(500).json({ success: false, message: 'Failed to create call request' });
    }
};

// ═══════════════════════════════════════════════════════════════════════════════
// SUPERADMIN-SIDE ENDPOINTS (auth: isSuperAdmin)
// ═══════════════════════════════════════════════════════════════════════════════

// GET /api/sa/support — SA views all tickets
export const getAllTickets = async (req, res) => {
    try {
        const { status } = req.query;
        const filter = {};
        if (status && status !== 'all') {
            filter.status = status;
        }

        const tickets = await SupportTicket.find(filter)
            .populate('agentId', 'name email subdomain businessName')
            .sort({ createdAt: -1 });

        return res.status(200).json({ success: true, data: tickets });
    } catch (err) {
        console.error('[SA GET TICKETS ERROR]', err);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// GET /api/sa/support/:id — SA views a specific ticket
export const saGetTicketDetail = async (req, res) => {
    try {
        const ticket = await SupportTicket.findById(req.params.id)
            .populate('agentId', 'name email subdomain businessName whatsapp');

        if (!ticket) {
            return res.status(404).json({ success: false, message: 'Ticket not found' });
        }

        return res.status(200).json({ success: true, data: ticket });
    } catch (err) {
        console.error('[SA TICKET DETAIL ERROR]', err);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// POST /api/sa/support/:id/reply — SA replies to a ticket
export const replyToTicket = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ success: false, message: 'Reply message is required' });
        }

        const ticket = await SupportTicket.findById(req.params.id);
        if (!ticket) {
            return res.status(404).json({ success: false, message: 'Ticket not found' });
        }

        // Push reply
        ticket.replies.push({
            message,
            from: 'superadmin',
            createdAt: new Date()
        });

        // Move to in_progress if it was open
        if (ticket.status === 'open') {
            ticket.status = 'in_progress';
        }

        await ticket.save();

        // Create support_resolution notification for the agent
        const notification = await Notification.create({
            agentId: ticket.agentId,
            type: 'support_resolution',
            title: 'Support Reply Received',
            message: `Your ticket "${ticket.subject}" has a new reply from Orbitle support.`
        });

        // Emit via Socket.io
        const io = getIO();
        if (io) {
            io.to(ticket.agentId.toString()).emit('notification', notification);
        }

        console.log(`[SUPPORT] SA replied to ticket ${ticket._id} → agent ${ticket.agentId}`);

        return res.status(200).json({ success: true, data: ticket });
    } catch (err) {
        console.error('[SA REPLY ERROR]', err);
        return res.status(500).json({ success: false, message: 'Failed to send reply' });
    }
};

// PUT /api/sa/support/:id/resolve — SA marks ticket as resolved
export const resolveTicket = async (req, res) => {
    try {
        const ticket = await SupportTicket.findByIdAndUpdate(
            req.params.id,
            { status: 'resolved' },
            { new: true }
        );

        if (!ticket) {
            return res.status(404).json({ success: false, message: 'Ticket not found' });
        }

        // Create notification
        const notification = await Notification.create({
            agentId: ticket.agentId,
            type: 'support_resolution',
            title: 'Ticket Resolved',
            message: `Your support ticket "${ticket.subject}" has been resolved.`
        });

        const io = getIO();
        if (io) {
            io.to(ticket.agentId.toString()).emit('notification', notification);
        }

        console.log(`[SUPPORT] Ticket ${ticket._id} resolved`);

        return res.status(200).json({ success: true, data: ticket });
    } catch (err) {
        console.error('[SA RESOLVE ERROR]', err);
        return res.status(500).json({ success: false, message: 'Failed to resolve ticket' });
    }
};

// GET /api/sa/support/calls — SA views all call requests
export const getAllCalls = async (req, res) => {
    try {
        const calls = await CallRequest.find()
            .populate('agentId', 'name email subdomain businessName whatsapp')
            .sort({ createdAt: -1 });

        return res.status(200).json({ success: true, data: calls });
    } catch (err) {
        console.error('[SA GET CALLS ERROR]', err);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// PUT /api/sa/support/calls/:id — SA updates call request status
export const updateCallStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!status || !['pending', 'scheduled', 'completed'].includes(status)) {
            return res.status(400).json({ success: false, message: 'Valid status required (pending, scheduled, completed)' });
        }

        const call = await CallRequest.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        ).populate('agentId', 'name email subdomain');

        if (!call) {
            return res.status(404).json({ success: false, message: 'Call request not found' });
        }

        return res.status(200).json({ success: true, data: call });
    } catch (err) {
        console.error('[SA UPDATE CALL ERROR]', err);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
};
