import express from 'express';
import { isSuperAdmin } from '../middleware/superAdminAuth.js';
import {
    sendNotification,
    getNotificationHistory
} from '../controllers/notificationController.js';
import {
    getAllTickets,
    saGetTicketDetail,
    replyToTicket,
    resolveTicket,
    getAllCalls,
    updateCallStatus
} from '../controllers/supportController.js';
import Agent from '../models/Agent.model.js';

const router = express.Router();

// All routes require superadmin auth
router.use(isSuperAdmin);

// ── Notifications ─────────────────────────────────────────────────────────────
router.post('/notifications', sendNotification);
router.get('/notifications', getNotificationHistory);

// ── Support Tickets ───────────────────────────────────────────────────────────
router.get('/support', getAllTickets);
router.get('/support/calls', getAllCalls);           // must be before :id
router.get('/support/:id', saGetTicketDetail);
router.post('/support/:id/reply', replyToTicket);
router.put('/support/:id/resolve', resolveTicket);
router.put('/support/calls/:id', updateCallStatus);

// ── Agents list (for notification targeting dropdown) ─────────────────────────
router.get('/agents/list', async (req, res) => {
    try {
        const agents = await Agent.find({ isActive: true })
            .select('name email subdomain businessName')
            .sort({ name: 1 });

        return res.status(200).json({ success: true, data: agents });
    } catch (err) {
        console.error('[SA AGENTS LIST ERROR]', err);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// ── GET /api/sa/agents — Get all agents with calculated subscription statuses ──
router.get('/agents', async (req, res) => {
    try {
        const agents = await Agent.find().sort({ createdAt: -1 });
        const now = new Date();
        const formattedAgents = agents.map(agent => {
            let status = 'Trial';
            let trialEnd = '-';
            
            if (!agent.isActive) {
                status = 'Expired';
            } else if (agent.planType === 'trial') {
                if (agent.trialEndsAt && new Date(agent.trialEndsAt) < now) {
                    status = 'Expired';
                } else {
                    status = 'Trial';
                }
                trialEnd = agent.trialEndsAt ? new Date(agent.trialEndsAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                }) : '-';
            } else if (['6_months', 'yearly'].includes(agent.planType)) {
                if (agent.planExpiry && new Date(agent.planExpiry) < now) {
                    status = 'Expired';
                } else {
                    status = 'Paid';
                }
            } else if (agent.planType === 'lifetime') {
                status = 'Paid';
            }

            return {
                id: agent._id,
                name: agent.name,
                email: agent.email,
                subdomain: agent.subdomain,
                status,
                trialEnd,
                joined: new Date(agent.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                })
            };
        });

        return res.status(200).json({ success: true, data: formattedAgents });
    } catch (err) {
        console.error('[SA GET AGENTS ERROR]', err);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// ── GET /api/sa/agents/:id — Get details of a single agent ───────────────────
router.get('/agents/:id', async (req, res) => {
    try {
        const agent = await Agent.findById(req.params.id);
        if (!agent) {
            return res.status(404).json({ success: false, message: 'Agent not found' });
        }

        const now = new Date();
        let status = 'Trial';
        let trialEnd = '-';
        
        if (!agent.isActive) {
            status = 'Expired';
        } else if (agent.planType === 'trial') {
            if (agent.trialEndsAt && new Date(agent.trialEndsAt) < now) {
                status = 'Expired';
            } else {
                status = 'Trial';
            }
            trialEnd = agent.trialEndsAt ? new Date(agent.trialEndsAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            }) : '-';
        } else if (['6_months', 'yearly'].includes(agent.planType)) {
            if (agent.planExpiry && new Date(agent.planExpiry) < now) {
                status = 'Expired';
            } else {
                status = 'Paid';
            }
        } else if (agent.planType === 'lifetime') {
            status = 'Paid';
        }

        const formatted = {
            id: agent._id,
            name: agent.name,
            email: agent.email,
            phone: agent.whatsapp || '-',
            agency: agent.businessName || '-',
            subdomain: `${agent.subdomain}.orbitle.com`,
            joined: new Date(agent.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            }),
            status,
            trialEnd,
            planType: agent.planType,
            planExpiry: agent.planExpiry ? new Date(agent.planExpiry).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            }) : '-'
        };

        return res.status(200).json({ success: true, data: formatted });
    } catch (err) {
        console.error('[SA GET AGENT DETAIL ERROR]', err);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// ── PUT /api/sa/agents/:id/extend-trial — Extend trial by days ───────────────
router.put('/agents/:id/extend-trial', async (req, res) => {
    try {
        const { days } = req.body;
        if (!days || isNaN(days)) {
            return res.status(400).json({ success: false, message: 'Valid days parameter is required' });
        }

        const agent = await Agent.findById(req.params.id);
        if (!agent) {
            return res.status(404).json({ success: false, message: 'Agent not found' });
        }

        const currentTrialEnd = agent.trialEndsAt ? new Date(agent.trialEndsAt) : new Date();
        const baseDate = currentTrialEnd < new Date() ? new Date() : currentTrialEnd;
        baseDate.setDate(baseDate.getDate() + parseInt(days));
        
        agent.trialEndsAt = baseDate;
        agent.planType = 'trial';
        agent.isActive = true;
        await agent.save();

        return res.status(200).json({ success: true, message: `Trial extended by ${days} days` });
    } catch (err) {
        console.error('[SA EXTEND TRIAL ERROR]', err);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// ── PUT /api/sa/agents/:id/activate-plan — Activate custom subscription plan ──
router.put('/agents/:id/activate-plan', async (req, res) => {
    try {
        const { plan } = req.body;
        if (!plan) {
            return res.status(400).json({ success: false, message: 'Plan type is required' });
        }

        const agent = await Agent.findById(req.params.id);
        if (!agent) {
            return res.status(404).json({ success: false, message: 'Agent not found' });
        }

        let planExpiry = null;
        const now = new Date();
        if (plan === '6_months') {
            planExpiry = new Date(now.setMonth(now.getMonth() + 6));
        } else if (plan === 'yearly') {
            planExpiry = new Date(now.setFullYear(now.getFullYear() + 1));
        } else if (plan === 'lifetime') {
            planExpiry = null;
        }

        agent.planType = plan;
        agent.planExpiry = planExpiry;
        agent.isActive = true;
        await agent.save();

        return res.status(200).json({ success: true, message: `Plan ${plan} activated successfully` });
    } catch (err) {
        console.error('[SA ACTIVATE PLAN ERROR]', err);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// ── PUT /api/sa/agents/:id/deactivate — Toggle agent active status ───────────
router.put('/agents/:id/deactivate', async (req, res) => {
    try {
        const agent = await Agent.findById(req.params.id);
        if (!agent) {
            return res.status(404).json({ success: false, message: 'Agent not found' });
        }

        agent.isActive = !agent.isActive;
        await agent.save();

        return res.status(200).json({ success: true, message: `Agent status updated successfully`, isActive: agent.isActive });
    } catch (err) {
        console.error('[SA DEACTIVATE AGENT ERROR]', err);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// ── DELETE /api/sa/agents/:id — Delete agent permanently ──────────────────────
router.delete('/agents/:id', async (req, res) => {
    try {
        const agent = await Agent.findByIdAndDelete(req.params.id);
        if (!agent) {
            return res.status(404).json({ success: false, message: 'Agent not found' });
        }

        return res.status(200).json({ success: true, message: 'Agent deleted successfully' });
    } catch (err) {
        console.error('[SA DELETE AGENT ERROR]', err);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
});

export default router;
