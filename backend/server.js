const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// MongoDB connection state
let isMongoConnected = false;

// MongoDB connection options
const mongoOptions = {
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
  socketTimeoutMS: 45000,
};

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/attendance_system',
      mongoOptions
    );
    isMongoConnected = true;
    console.log('✅ Connected to MongoDB:', conn.connection.host);
    return true;
  } catch (error) {
    isMongoConnected = false;
    console.error('❌ MongoDB connection error:', error.message);
    console.error('⚠️  Server is running but database operations will fail.');
    console.error('⚠️  Please set up MongoDB to use the application.');
    console.error('⚠️  See MONGODB_SETUP.md for instructions.');
    return false;
  }
};

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || process.env.CLIENT_URL || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check (before MongoDB check)
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    database: isMongoConnected ? 'Connected' : 'Not Connected'
  });
});

// Middleware to check MongoDB connection for all other API routes
app.use('/api', (req, res, next) => {
  // Skip health check
  if (req.path === '/health') {
    return next();
  }
  
  // Check MongoDB connection for all other routes
  if (!isMongoConnected) {
    return res.status(503).json({
      message: 'Database not connected. Please set up MongoDB.',
      error: 'MongoDB connection required',
      instructions: 'See MONGODB_SETUP.md or use MongoDB Atlas (cloud)'
    });
  }
  next();
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/attendance', require('./routes/attendance'));
app.use('/api/dashboard', require('./routes/dashboard'));

// Start server first, then connect to MongoDB
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log('');
  
  // Connect to MongoDB
  await connectDB();
  
  // Try to reconnect every 30 seconds if not connected
  if (!isMongoConnected) {
    setInterval(async () => {
      if (!isMongoConnected) {
        console.log('🔄 Attempting to reconnect to MongoDB...');
        await connectDB();
      }
    }, 30000);
  }
});

// Handle port already in use error
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use.`);
    console.error('Please stop the other server or use a different port.');
    console.error('To stop processes on port 5000, run:');
    console.error('  Get-NetTCPConnection -LocalPort 5000 | Select-Object -ExpandProperty OwningProcess | Stop-Process -Force');
    process.exit(1);
  } else {
    throw error;
  }
});

module.exports = app;
