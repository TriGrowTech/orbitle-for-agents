import express from 'express';
import { getBanners, createBanner, updateBanner, deleteBanner } from '../controllers/bannerController.js';
import { isAuthenticated } from '../middleware/auth.js';
import { uploadBannerImage } from '../middleware/upload.js';

const router = express.Router();

router.use(isAuthenticated);

router.route('/')
    .get(getBanners)
    .post(uploadBannerImage.single('image'), createBanner);

router.route('/:id')
    .put(uploadBannerImage.single('image'), updateBanner)
    .delete(deleteBanner);

export default router;
