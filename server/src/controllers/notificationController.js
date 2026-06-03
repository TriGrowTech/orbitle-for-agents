import Notification from '../models/Notification.model.js';
import Agent from '../models/Agent.model.js';
import { getIO } from '../utils/socket.js';

// ── SuperAdmin: Send notification ─────────────────────────────────────────────
// POST /api/sa/notifications
export const sendNotification = async (req, res) => {
    try {
        const { type, title, message, agentId } = req.body;

        if (!type || !title || !message) {
            return res.status(400).json({ success: false, message: 'type, title, and message are required' });
        }

        const validTypes = ['offer', 'trial_ending', 'new_lead', 'required_action', 'support_resolution'];
        if (!validTypes.includes(type)) {
            return res.status(400).json({ success: false, message: `Invalid type. Must be one of: ${validTypes.join(', ')}` });
        }

        // If targeted, verify agent exists
        if (agentId) {
            const agent = await Agent.findById(agentId);
            if (!agent) {
                return res.status(404).json({ success: false, message: 'Agent not found' });
            }
        }

        const notification = await Notification.create({
            agentId: agentId || null, // null = broadcast
            type,
            title,
            message
        });

        // Emit via Socket.io
        const io = getIO();
        if (io) {
            if (agentId) {
                // Targeted — send to specific agent's room
                io.to(agentId.toString()).emit('notification', notification);
            } else {
                // Broadcast — send to all connected agents
                io.emit('notification', notification);
            }
        }

        console.log(`[NOTIFICATION] Sent "${type}" → ${agentId ? agentId : 'broadcast'}`);

        return res.status(201).json({ success: true, data: notification });
    } catch (err) {
        console.error('[SEND NOTIFICATION ERROR]', err);
        return res.status(500).json({ success: false, message: 'Failed to send notification' });
    }
};

// ── SuperAdmin: Get notification history ──────────────────────────────────────
// GET /api/sa/notifications
export const getNotificationHistory = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;
        const skip = (page - 1) * limit;

        const notifications = await Notification.find()
            .populate('agentId', 'name email subdomain')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Notification.countDocuments();

        return res.status(200).json({
            success: true,
            data: notifications,
            pagination: { page, limit, total, pages: Math.ceil(total / limit) }
        });
    } catch (err) {
        console.error('[GET NOTIFICATION HISTORY ERROR]', err);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// ── Agent: Get my notifications ───────────────────────────────────────────────
// GET /api/notifications
export const getAgentNotifications = async (req, res) => {
    try {
        const agentId = req.agent.id;

        // Fetch targeted notifications + broadcasts, sorted newest first
        const notifications = await Notification.find({
            $or: [
                { agentId: agentId },
                { agentId: null }   // broadcasts
            ]
        }).sort({ createdAt: -1 }).limit(50);

        return res.status(200).json({ success: true, data: notifications });
    } catch (err) {
        console.error('[GET AGENT NOTIFICATIONS ERROR]', err);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// ── Agent: Get unread count ───────────────────────────────────────────────────
// GET /api/notifications/unread-count
export const getUnreadCount = async (req, res) => {
    try {
        const agentId = req.agent.id;

        const count = await Notification.countDocuments({
            $or: [
                { agentId: agentId },
                { agentId: null }
            ],
            isRead: false
        });

        return res.status(200).json({ success: true, count });
    } catch (err) {
        console.error('[UNREAD COUNT ERROR]', err);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// ── Agent: Mark one as read ───────────────────────────────────────────────────
// PATCH /api/notifications/:id/read
export const markAsRead = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            { isRead: true },
            { new: true }
        );

        if (!notification) {
            return res.status(404).json({ success: false, message: 'Notification not found' });
        }

        return res.status(200).json({ success: true, data: notification });
    } catch (err) {
        console.error('[MARK READ ERROR]', err);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// ── Agent: Mark all as read ───────────────────────────────────────────────────
// PATCH /api/notifications/read-all
export const markAllAsRead = async (req, res) => {
    try {
        const agentId = req.agent.id;

        await Notification.updateMany(
            {
                $or: [
                    { agentId: agentId },
                    { agentId: null }
                ],
                isRead: false
            },
            { isRead: true }
        );

        return res.status(200).json({ success: true, message: 'All notifications marked as read' });
    } catch (err) {
        console.error('[MARK ALL READ ERROR]', err);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
};
