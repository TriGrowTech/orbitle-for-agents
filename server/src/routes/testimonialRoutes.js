import express from 'express';
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '../controllers/testimonialController.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.use(isAuthenticated);

router.route('/')
    .get(getTestimonials)
    .post(createTestimonial);

router.route('/:id')
    .put(updateTestimonial)
    .delete(deleteTestimonial);

export default router;
