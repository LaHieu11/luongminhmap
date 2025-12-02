// Vercel serverless function that forwards all `/api/*` requests
// to the existing Express app in `backend/server.js`

const app = require('../backend/server');

module.exports = (req, res) => {
  // Vercel catch-all route: [...backend] captures everything after /api/
  // So req.url will be like "/api/locations/1" or "/api/locations"
  // Express routes are mounted at /api/locations, so they expect paths like "/1" or "/"
  // But since we're using catch-all, the full path is preserved
  
  // The Express app should handle the full path correctly
  // because routes are mounted at /api/locations, /api/categories, etc.
  return app(req, res);
};


