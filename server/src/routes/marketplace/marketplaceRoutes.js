import express from 'express';
const router = express.Router();

// Marketplace routes go here
router.get('/', (req, res) => res.json({ message: "Marketplace Module Root (ESM)" }));

export default router;
