import express from 'express';
import { isAuthenticated } from '../middleware/auth.js';
import {
    createTicket,
    getMyTickets,
    getTicketDetail,
    createCallRequest,
    agentReplyToTicket
} from '../controllers/supportController.js';

const router = express.Router();

// All routes require agent auth
router.post('/', isAuthenticated, createTicket);
router.get('/', isAuthenticated, getMyTickets);
router.get('/:id', isAuthenticated, getTicketDetail);
router.post('/:id/reply', isAuthenticated, agentReplyToTicket);
router.post('/call-request', isAuthenticated, createCallRequest);

export default router;
