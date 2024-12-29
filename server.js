const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);  // Create Socket.IO server

// Serve static files
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route for latency testing
app.get('/ping', (req, res) => {
  res.send('OK');
});

// Route for downloading a test file
app.get('/testfile', (req, res) => {
  const fileSize = 100 * 1024 * 1024; // 10 MB test file
  const buffer = Buffer.alloc(fileSize, '0'); // Fill buffer with data
  res.send(buffer);
});

// Route for uploading a test file
app.post('/upload', (req, res) => {
  res.sendStatus(200); // Send OK response
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Socket.IO connection handler
io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});
