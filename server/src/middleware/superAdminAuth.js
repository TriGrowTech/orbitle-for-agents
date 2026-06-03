// Hardcoded superadmin auth — checks x-sa-key header against env var
// Simple and intentional for now; can be upgraded to JWT later

export const isSuperAdmin = (req, res, next) => {
    const key = req.headers['x-sa-key'];

    if (!key) {
        return res.status(401).json({ success: false, message: 'SuperAdmin key is required' });
    }

    if (key !== process.env.SA_SECRET_KEY) {
        return res.status(401).json({ success: false, message: 'Invalid SuperAdmin key' });
    }

    next();
};
