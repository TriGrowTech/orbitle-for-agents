import Agent from '../models/Agent.model.js';

export const register = async (req, res, next) => {
    try {
        const { name, email, password, businessName } = req.body;
        console.log(name);
        // Edge Case 1: Missing Required Fields
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required. Please provide your name, email, and password.'
            });
        }

        // Edge Case 2: Email Format Check
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
        }

        // Edge Case 3: Password Length
        if (password.length < 6) {
            return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long.' });
        }

        // Check if agent exists
        const exists = await Agent.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: 'An account with this email address already exists.' });
        }

        // Create agent
        const agent = await Agent.create({
            name,
            email,
            password,
            businessName
        });

        sendTokenResponse(agent, 201, res);

    } catch (err) {
        // Edge Case 4: Handle MongoDB Duplicate Key (Code 11000)
        if (err.code === 11000) {
            return res.status(400).json({ success: false, message: 'This email or subdomain is already registered. Please use another.' });
        }

        res.status(500).json({
            success: false,
            message: 'Internal Server Error. Please try again later.'
        });
    }
};


export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide email and password' });
        }

        // Check for agent
        const agent = await Agent.findOne({ email }).select('+password');

        if (!agent) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Check if password matches
        const isMatch = await agent.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        sendTokenResponse(agent, 200, res);
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

// @desc    Get current logged in agent
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
    try {
        const agent = await Agent.findById(req.agent.id);
        res.status(200).json({
            success: true,
            agent
        });
    } catch (err) {
        res.status(400).json({ success: false, message: 'Agent not found' });
    }
};

// @desc    Log agent out / clear cookie
// @route   GET /api/auth/logout
// @access  Private
export const logout = async (req, res, next) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        data: {}
    });
};
const sendTokenResponse = (agent, statusCode, res) => {
    // Create token
    const token = agent.getSignedJwtToken();

    const options = {
        expires: new Date(
            Date.now() + (process.env.JWT_COOKIE_EXPIRE || 30) * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        // Set domain to .orbitle.in in production to share cookie between orbitle.in and agent.orbitle.in
        domain: process.env.NODE_ENV === 'production' ? process.env.COOKIE_DOMAIN : undefined,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    };

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token,
            agent: {
                id: agent._id,
                name: agent.name,
                email: agent.email,
                businessName: agent.businessName
            }
        });
};
