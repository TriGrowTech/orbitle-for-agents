import express from 'express';
import { getSEOSettings, updateSEOSettings } from '../controllers/seoController.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.use(isAuthenticated);

router.route('/')
    .get(getSEOSettings)
    .put(updateSEOSettings);

export default router;
