import express from 'express';
import { isAuthenticated } from '../middleware/auth.js';
import {
    getAgentNotifications,
    getUnreadCount,
    markAsRead,
    markAllAsRead
} from '../controllers/notificationController.js';

const router = express.Router();

// All routes require agent auth
router.get('/', isAuthenticated, getAgentNotifications);
router.get('/unread-count', isAuthenticated, getUnreadCount);
router.patch('/:id/read', isAuthenticated, markAsRead);
router.patch('/read-all', isAuthenticated, markAllAsRead);

export default router;
