import express from 'express';
import {
    getPublicAgentData,
    getPublicPackageDetails,
    submitLead,
    getPublicBanners,
    getPublicTestimonials,
    getPublicContentSections,
    getPublicSEO,
    getPublicLegalPage,
    getPublicSiteConfig
} from '../controllers/publicController.js';

const router = express.Router();

// GET /api/public/agent/:subdomain
router.get('/agent/:subdomain', getPublicAgentData);

// GET /api/public/package/:id
router.get('/package/:id', getPublicPackageDetails);

// POST /api/public/lead
router.post('/lead', submitLead);

// Content endpoints for marketplace rendering
router.get('/banners/:subdomain', getPublicBanners);
router.get('/testimonials/:subdomain', getPublicTestimonials);
router.get('/content/:subdomain', getPublicContentSections);
router.get('/seo/:subdomain', getPublicSEO);
router.get('/legal/:subdomain/:pageType', getPublicLegalPage);
router.get('/site-config/:subdomain', getPublicSiteConfig);

export default router;
