const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8080;

// Enable CORS for the React app
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());

// Mock endpoints that the frontend expects
app.get('/user/auto-login', (req, res) => {
  res.status(401).json({ error: 'Not authenticated' });
});

app.get('/user/notifications', (req, res) => {
  res.json([]);
});

app.get('/admin/update-profile', (req, res) => {
  res.status(401).json({ error: 'Not authenticated' });
});

app.post('/admin/admin/register-super-admin', (req, res) => {
  res.status(400).json({ error: 'Registration not available' });
});

// Health check
app.get('/', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Backend server running',
    port: PORT 
  });
});

// Catch all other routes
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Backend server running on port ${PORT}`);
  console.log(`🌐 Server accessible at http://localhost:${PORT}`);
});
