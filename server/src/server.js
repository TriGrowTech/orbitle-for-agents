import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import connectDB from './config/db.js';
import cors from 'cors';
// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());
const allowedOrigins = process.env.NODE_ENV === 'production' 
    ? ['https://orbitle.in', 'https://agent.orbitle.in'] 
    : ['http://localhost:3000', 'http://localhost:5173'];

app.use(cors({
    origin: function(origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

// Mount routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('API is running and MongoDB is connected (using ES Modules)!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
