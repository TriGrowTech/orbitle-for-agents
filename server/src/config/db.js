import mongoose from 'mongoose';
import dns from 'dns';

// Force Google DNS to resolve SRV records (bypasses local DNS issues)
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.Mongo_URI, {
            serverSelectionTimeoutMS: 15000,
            family: 4,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
