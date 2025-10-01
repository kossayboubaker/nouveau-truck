const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8080;

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());

// Mock auto-login endpoint
app.get('/user/auto-login', (req, res) => {
  res.status(401).json({ error: 'Not authenticated' });
});

// Mock notifications endpoint
app.get('/user/notifications', (req, res) => {
  res.json([]);
});

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Minimal backend server running' });
});

app.listen(PORT, () => {
  console.log(`✅ Minimal backend server running on port ${PORT}`);
});
