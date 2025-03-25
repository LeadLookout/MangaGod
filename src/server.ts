import express from 'express';
import { config } from './config';
import logger from './logger';
import { errorHandler } from './errorHandler';

const app = express();

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    logger.error(`Uncaught Exception: ${err.message}`, { stack: err.stack });
    process.exit(1); // Exit process after logging
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason: any, promise) => {
    logger.error(`Unhandled Rejection at: ${promise}`, { reason });
    process.exit(1); // Exit process after logging
});

app.use(express.json());

// Example route
app.get('/', (req, res) => {
    res.send('Welcome to MangaGod!');
});

// Error handling middleware
app.use(errorHandler);

app.listen(config.port, () => {
    logger.info(`Server running on port ${config.port} in ${config.nodeEnv} mode`);
});
