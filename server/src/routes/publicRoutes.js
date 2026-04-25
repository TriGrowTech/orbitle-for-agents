import express from 'express';
import { getPublicAgentData, getPublicPackageDetails, submitLead } from '../controllers/publicController.js';

const router = express.Router();

// GET /api/public/agent/:subdomain
router.get('/agent/:subdomain', getPublicAgentData);

// GET /api/public/package/:id
router.get('/package/:id', getPublicPackageDetails);

// POST /api/public/lead
router.post('/lead', submitLead);

export default router;
