import express from 'express';
import { 
    getPackages, 
    createPackage, 
    updatePackage, 
    deletePackage 
} from '../controllers/packageController.js';
import { uploadPackageImage } from '../middleware/upload.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.use(isAuthenticated); // Protect all package routes

const cpUpload = uploadPackageImage.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }]);

router.route('/')
    .get(getPackages)
    .post(cpUpload, createPackage);

router.route('/:id')
    .put(cpUpload, updatePackage)
    .delete(deletePackage);

export default router;
