import express from 'express';
import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import authRoutes from './routes/authRoutes.js';
import packageRoutes from './routes/packageRoutes.js';
import publicRoutes from './routes/publicRoutes.js';
import leadRoutes from './routes/leadRoutes.js';
import bannerRoutes from './routes/bannerRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import contentSectionRoutes from './routes/contentSectionRoutes.js';
import seoRoutes from './routes/seoRoutes.js';
import legalRoutes from './routes/legalRoutes.js';
import siteConfigRoutes from './routes/siteConfigRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import supportRoutes from './routes/supportRoutes.js';
import superAdminRoutes from './routes/superAdminRoutes.js';
import connectDB from './config/db.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { setIO } from './utils/socket.js';
import { startCronJobs } from './utils/cronJobs.js';

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());
const isAllowedOrigin = (origin) => {
    if (!origin) return true; // allow server-to-server
    if (process.env.NODE_ENV === 'production') {
        // Allow main domain + all agent subdomains
        if (origin === 'https://orbitle.in') return true;
        if (origin.endsWith('.orbitle.in')) return true;
        return false;
    } else {
        // Dev: allow localhost on any port + any *.localhost subdomain
        if (origin === 'http://localhost:3000') return true;
        if (origin === 'http://localhost:5173') return true;
        if (origin === 'http://localhost:5174') return true;
        if (origin === 'http://localhost:5175') return true; // SuperAdmin panel
        if (/^http:\/\/[a-z0-9-]+\.localhost(:\d+)?$/.test(origin)) return true;
        return false;
    }
};

app.use(cors({
    origin: function (origin, callback) {
        if (isAllowedOrigin(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

// Serve static files (logos)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/public', publicRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/content-sections', contentSectionRoutes);
app.use('/api/seo', seoRoutes);
app.use('/api/legal', legalRoutes);
app.use('/api/site-config', siteConfigRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/support', supportRoutes);
app.use('/api/sa', superAdminRoutes);

app.get('/', (req, res) => {
    res.send('API is running and MongoDB is connected (using ES Modules)!');
});

// ── Socket.io Setup ───────────────────────────────────────────────────────────

const httpServer = createServer(app);

const io = new SocketServer(httpServer, {
    cors: {
        origin: function (origin, callback) {
            if (isAllowedOrigin(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true
    }
});

// Store io instance for use in controllers
setIO(io);

// Authenticate socket connections using JWT
// Supports: handshake auth token OR cookie-based token
io.use((socket, next) => {
    // Try handshake auth first, then fallback to cookie
    let token = socket.handshake.auth?.token;

    if (!token && socket.handshake.headers.cookie) {
        // Parse cookies from the handshake headers
        const cookies = socket.handshake.headers.cookie.split(';').reduce((acc, cookie) => {
            const [key, val] = cookie.trim().split('=');
            acc[key] = val;
            return acc;
        }, {});
        token = cookies['token'];
    }

    if (!token) {
        return next(new Error('Authentication token required'));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.agentId = decoded.id;
        next();
    } catch (err) {
        return next(new Error('Invalid token'));
    }
});

io.on('connection', (socket) => {
    const agentId = socket.agentId;
    console.log(`[SOCKET] Agent connected: ${agentId}`);

    // Join agent's personal room
    socket.join(agentId);

    socket.on('disconnect', () => {
        console.log(`[SOCKET] Agent disconnected: ${agentId}`);
    });
});

// ── Start Server + Cron ───────────────────────────────────────────────────────

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    startCronJobs();
});
