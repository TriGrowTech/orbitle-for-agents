import Package from '../models/Package.model.js';

// Get all packages for the logged in agent
export const getPackages = async (req, res, next) => {
    try {
        let packages = await Package.find({ agentId: req.agent.id }).sort('-createdAt');

        // If no packages exist, create a Demo Package as requested
        if (packages.length === 0) {
            const demoPackage = await Package.create({
                agentId: req.agent.id,
                title: "Demo Package - Amazing Kerala",
                description: "Experience the backwaters and lush greenery of Kerala in this premium package.",
                location: "Kerala, India",
                duration: "5 Days / 4 Nights",
                category: "domestic",
                packageType: "other",
                originalPrice: 25000,
                discountedPrice: 19999,
                isActive: true,
                isTrending: true,
                hasOffer: true,
                badges: ['bestseller', 'premium'],
                inclusions: ["Hotel Accommodation", "Breakfast", "Airport Transfer", "Sightseeing"],
                exclusions: ["Flights", "Lunch & Dinner", "Personal Expenses"],
                itinerary: [
                    { dayNumber: 1, title: "Arrival at Kochi", description: "Welcome to Kochi. Transfer to hotel." },
                    { dayNumber: 2, title: "Munnar Hills", description: "Drive to Munnar and enjoy tea gardens." },
                    { dayNumber: 3, title: "Houseboat Stay", description: "Stay overnight in a luxurious houseboat." },
                    { dayNumber: 4, title: "Departure", description: "Transfer to airport for return flight." }
                ]
            });
            packages = [demoPackage];
        }

        res.status(200).json({ success: true, count: packages.length, data: packages });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Create new package
export const createPackage = async (req, res, next) => {
    try {
        // Add agentId to req.body
        req.body.agentId = req.agent.id;

        // Parse complex JSON arrays if they are sent as strings from FormData
        if (req.body.itinerary && typeof req.body.itinerary === 'string') {
            req.body.itinerary = JSON.parse(req.body.itinerary);
        }
        if (req.body.badges && typeof req.body.badges === 'string') {
            req.body.badges = JSON.parse(req.body.badges);
        }
        if (req.body.inclusions && typeof req.body.inclusions === 'string') {
            req.body.inclusions = JSON.parse(req.body.inclusions);
        }
        if (req.body.exclusions && typeof req.body.exclusions === 'string') {
            req.body.exclusions = JSON.parse(req.body.exclusions);
        }

        // Handle Image Uploads
        if (req.files) {
            if (req.files.image1 && req.files.image1[0]) {
                const imgPath = req.files.image1[0].path.replace(/\\/g, '/');
                req.body.imageUrl1 = `${req.protocol}://${req.get('host')}/${imgPath}`;
            }
            if (req.files.image2 && req.files.image2[0]) {
                const imgPath = req.files.image2[0].path.replace(/\\/g, '/');
                req.body.imageUrl2 = `${req.protocol}://${req.get('host')}/${imgPath}`;
            }
        }

        const pkg = await Package.create(req.body);

        res.status(201).json({ success: true, data: pkg });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// Update package
export const updatePackage = async (req, res, next) => {
    try {
        let pkg = await Package.findById(req.params.id);

        if (!pkg) {
            return res.status(404).json({ success: false, message: 'Package not found' });
        }

        // Ensure user owns package
        if (pkg.agentId.toString() !== req.agent.id) {
            return res.status(401).json({ success: false, message: 'Not authorized to update this package' });
        }

        // Parse complex JSON arrays if they are sent as strings from FormData
        if (req.body.itinerary && typeof req.body.itinerary === 'string') {
            req.body.itinerary = JSON.parse(req.body.itinerary);
        }
        if (req.body.badges && typeof req.body.badges === 'string') {
            req.body.badges = JSON.parse(req.body.badges);
        }
        if (req.body.inclusions && typeof req.body.inclusions === 'string') {
            req.body.inclusions = JSON.parse(req.body.inclusions);
        }
        if (req.body.exclusions && typeof req.body.exclusions === 'string') {
            req.body.exclusions = JSON.parse(req.body.exclusions);
        }

        // Handle Image Uploads
        if (req.files) {
            if (req.files.image1 && req.files.image1[0]) {
                const imgPath = req.files.image1[0].path.replace(/\\/g, '/');
                req.body.imageUrl1 = `${req.protocol}://${req.get('host')}/${imgPath}`;
            }
            if (req.files.image2 && req.files.image2[0]) {
                const imgPath = req.files.image2[0].path.replace(/\\/g, '/');
                req.body.imageUrl2 = `${req.protocol}://${req.get('host')}/${imgPath}`;
            }
        }

        pkg = await Package.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: pkg });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// Delete package
export const deletePackage = async (req, res, next) => {
    try {
        const pkg = await Package.findById(req.params.id);

        if (!pkg) {
            return res.status(404).json({ success: false, message: 'Package not found' });
        }

        // Ensure user owns package
        if (pkg.agentId.toString() !== req.agent.id) {
            return res.status(401).json({ success: false, message: 'Not authorized to delete this package' });
        }

        await pkg.deleteOne();

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
