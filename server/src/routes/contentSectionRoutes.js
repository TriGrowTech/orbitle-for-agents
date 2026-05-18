import express from 'express';
import { getContentSections, createContentSection, updateContentSection, deleteContentSection } from '../controllers/contentSectionController.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.use(isAuthenticated);

router.route('/')
    .get(getContentSections)
    .post(createContentSection);

router.route('/:id')
    .put(updateContentSection)
    .delete(deleteContentSection);

export default router;
