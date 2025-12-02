const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Initialize default admin user
const User = require('./models/User');
User.initializeDefaultAdmin().catch(console.error);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
// Increase body size limit to 50MB for image uploads (base64 images can be large)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Support Vercel rewrites so Express still sees the original path
const VERCEL_REWRITE_PARAM = '__VERCEL_REWRITE';
app.use((req, res, next) => {
  const rewriteTarget = req.query && req.query[VERCEL_REWRITE_PARAM];
  if (rewriteTarget) {
    req.url = rewriteTarget;
    delete req.query[VERCEL_REWRITE_PARAM];
  }
  next();
});

// Routes
const locationRoutes = require('./routes/locationRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/locations', locationRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Start server (only if not in serverless environment)
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export for Vercel serverless
module.exports = app;

