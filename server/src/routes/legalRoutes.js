import express from 'express';
import { getLegalPages, getLegalPage, upsertLegalPage, deleteLegalPage } from '../controllers/legalController.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.use(isAuthenticated);

router.get('/', getLegalPages);

router.route('/:pageType')
    .get(getLegalPage)
    .put(upsertLegalPage)
    .delete(deleteLegalPage);

export default router;
