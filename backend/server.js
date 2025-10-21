const express = require('express');
const dotenv = require('dotenv');
const { testConnection, initializeDatabase } = require('./config/db');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/authMiddleware');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// CORS middleware (if needed for frontend)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: "OK",
    message: "SuperApp API is running",
    timestamp: new Date().toISOString()
  });
});

// Authentication routes
app.use('/auth', authRoutes);

// Protected route example (demonstrating authMiddleware usage)
app.get('/api/profile', authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: 'This is a protected route',
    user: req.user
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Initialize database and start server
const startServer = async () => {
  // Test database connection
  const dbConnected = await testConnection();
  
  if (dbConnected) {
    // Initialize database tables
    await initializeDatabase();
  } else {
    console.warn('⚠️  Server starting without database connection. Please check your database configuration.');
  }

  // Start server
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
    console.log(`🔐 Auth endpoints:`);
    console.log(`   - POST http://localhost:${PORT}/auth/signup`);
    console.log(`   - POST http://localhost:${PORT}/auth/login`);
    console.log(`🛡️  Protected example: GET http://localhost:${PORT}/api/profile`);
  });
};

startServer();
