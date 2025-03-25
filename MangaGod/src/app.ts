import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { setupRoutes } from './pages';
import { initializeServices } from './services';

const app = express();
const server = createServer(app);
const io = new Server(server);

// Initialize services
initializeServices();

// Set up routing
setupRoutes(app, io);

// Serve static files
app.use(express.static('public'));

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`MangaGod is running on http://localhost:${PORT}`);
});