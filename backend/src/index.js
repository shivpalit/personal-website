import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sendEmail } from './emailService.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Rate limiting variables
const WINDOW_SIZE = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 15; // 15 requests per window
const requestLog = new Map();

// Rate limiting middleware
function rateLimiter(req, res, next) {
    const ip = req.ip;
    const now = Date.now();
    
    if (requestLog.has(ip)) {
        const requests = requestLog.get(ip).filter(time => now - time < WINDOW_SIZE);
        if (requests.length >= MAX_REQUESTS) {
            return res.status(429).json({ 
                error: "Too many requests. Please try again later." 
            });
        }
        requests.push(now);
        requestLog.set(ip, requests);
    } else {
        requestLog.set(ip, [now]);
    }
    
    next();
}

// Contact form endpoint
app.post('/api/contact', rateLimiter, async (req, res) => {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
        return res.status(400).json({ 
            error: "Please provide name, email, and message" 
        });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ 
            error: "Please provide a valid email address" 
        });
    }

    try {
        const result = await sendEmail({ name, email, message });
        if (result.success) {
            res.json({ message: "Email sent successfully" });
        } else {
            res.status(500).json({ error: result.error });
        }
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ 
            error: "Failed to send email. Please try again later." 
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'healthy' });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'healthy' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 