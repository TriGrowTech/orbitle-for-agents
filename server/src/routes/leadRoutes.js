import express from 'express';
import { getLeads, updateLeadStatus, deleteLead } from '../controllers/leadController.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.use(isAuthenticated);

router.get('/', getLeads);
router.put('/:id', updateLeadStatus);
router.delete('/:id', deleteLead);

export default router;
