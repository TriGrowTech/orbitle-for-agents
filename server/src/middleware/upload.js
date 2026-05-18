import multer from 'multer';
import path from 'path';

// Logos
const logoStorage = multer.diskStorage({
  destination: 'uploads/logos',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, req.agent.id + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Packages
const packageStorage = multer.diskStorage({
  destination: 'uploads/packages',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, req.agent.id + '-pkg-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Filter
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|webp|svg/;
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files (jpeg, jpg, png, webp, svg) are allowed!'), false);
  }
};

export const uploadLogo = multer({
  storage: logoStorage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: fileFilter
});

export const uploadPackageImage = multer({
  storage: packageStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Allowed 5MB for packages
  fileFilter: fileFilter
});

// Banners
const bannerStorage = multer.diskStorage({
  destination: 'uploads/banners',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, req.agent.id + '-banner-' + uniqueSuffix + path.extname(file.originalname));
  }
});

export const uploadBannerImage = multer({
  storage: bannerStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: fileFilter
});


export default uploadLogo;
