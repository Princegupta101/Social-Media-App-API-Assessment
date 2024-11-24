import cors from 'cors';
import express from 'express';
import { createServer } from 'http';

import 'dotenv/config';
import { connectDB } from './config/database.js';
import { init, getIO } from './config/socket.js';  // Named import
import authRoutes from './routes/authRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import postRoutes from './routes/postRoutes.js';

const app = express();
const server = createServer(app);

// Initialize socket.io
init(server);

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

// Root endpoint to check if server is running
app.get('/', (req, res) => {
  res.status(200).send('Server is running');
});

// Chat implementation
const io = getIO();  // Get the socket instance
io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('chatMessage', (message) => {
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
