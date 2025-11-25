// Vercel serverless function that forwards all `/api/*` requests
// to the existing Express app in `backend/server.js`

const app = require('../backend/server');

// Express app is already a (req, res) handler, so we can export it directly
module.exports = (req, res) => {
  return app(req, res);
};


