// Simple backend server for development
const http = require('http');
const url = require('url');

const PORT = 8080;

const server = http.createServer((req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;

  res.setHeader('Content-Type', 'application/json');

  // Handle different endpoints
  if (path === '/user/auto-login' && req.method === 'GET') {
    res.writeHead(401);
    res.end(JSON.stringify({ error: 'Not authenticated' }));
  } else if (path === '/user/notifications' && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify([]));
  } else if (path === '/admin/update-profile' && req.method === 'PUT') {
    res.writeHead(401);
    res.end(JSON.stringify({ error: 'Not authenticated' }));
  } else if (path === '/admin/admin/register-super-admin' && req.method === 'POST') {
    res.writeHead(400);
    res.end(JSON.stringify({ error: 'Registration not available' }));
  } else if (path === '/' && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({ 
      status: 'ok', 
      message: 'Simple backend server running',
      port: PORT 
    }));
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Endpoint not found' }));
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Simple backend server running on port ${PORT}`);
  console.log(`🌐 Server accessible at http://localhost:${PORT}`);
});
