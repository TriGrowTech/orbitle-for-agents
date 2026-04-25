import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import packageRoutes from './routes/packageRoutes.js';
import publicRoutes from './routes/publicRoutes.js';
import leadRoutes from './routes/leadRoutes.js';
import connectDB from './config/db.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

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

app.get('/', (req, res) => {
    res.send('API is running and MongoDB is connected (using ES Modules)!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
