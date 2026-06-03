import cron from 'node-cron';
import Agent from '../models/Agent.model.js';
import Notification from '../models/Notification.model.js';
import { getIO } from './socket.js';

// ── Trial Ending Cron — runs daily at 9:00 AM ────────────────────────────────

export const startCronJobs = () => {
    // Every day at 9:00 AM
    cron.schedule('0 9 * * *', async () => {
        console.log('[CRON] Running trial-ending check...');
        try {
            const now = new Date();
            const io = getIO();

            // ── 3-day warning ──────────────────────────────────────────────
            const threeDaysFromNow = new Date(now);
            threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);

            const startOfWarningDay = new Date(threeDaysFromNow);
            startOfWarningDay.setHours(0, 0, 0, 0);
            const endOfWarningDay = new Date(threeDaysFromNow);
            endOfWarningDay.setHours(23, 59, 59, 999);

            const warningAgents = await Agent.find({
                trialEndsAt: { $gte: startOfWarningDay, $lte: endOfWarningDay },
                isActive: true,
                planType: 'trial'
            });

            for (const agent of warningAgents) {
                const notification = await Notification.create({
                    agentId: agent._id,
                    type: 'trial_ending',
                    title: 'Trial Ending Soon',
                    message: `Your trial ends in 3 days (${agent.trialEndsAt.toLocaleDateString()}). Upgrade now to keep your marketplace live.`
                });

                if (io) {
                    io.to(agent._id.toString()).emit('notification', notification);
                }
            }

            if (warningAgents.length > 0) {
                console.log(`[CRON] Sent trial-ending warnings to ${warningAgents.length} agents`);
            }

            // ── Day-of expiry ──────────────────────────────────────────────
            const startOfToday = new Date(now);
            startOfToday.setHours(0, 0, 0, 0);
            const endOfToday = new Date(now);
            endOfToday.setHours(23, 59, 59, 999);

            const expiringAgents = await Agent.find({
                trialEndsAt: { $gte: startOfToday, $lte: endOfToday },
                isActive: true,
                planType: 'trial'
            });

            for (const agent of expiringAgents) {
                const notification = await Notification.create({
                    agentId: agent._id,
                    type: 'trial_ending',
                    title: 'Trial Expired Today',
                    message: 'Your trial has expired. Upgrade your plan to continue using your marketplace and dashboard.'
                });

                if (io) {
                    io.to(agent._id.toString()).emit('notification', notification);
                }
            }

            if (expiringAgents.length > 0) {
                console.log(`[CRON] Sent trial-expired alerts to ${expiringAgents.length} agents`);
            }

        } catch (err) {
            console.error('[CRON] Trial-ending check failed:', err);
        }
    });

    console.log('[CRON] Trial-ending cron job scheduled (daily at 9:00 AM)');
};
