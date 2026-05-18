import express from 'express';
import { getSiteConfig, updateSiteConfig } from '../controllers/siteConfigController.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.use(isAuthenticated);

router.get('/', getSiteConfig);
router.put('/', updateSiteConfig);

export default router;

