import winston from 'winston';
import { config } from './config';

const logger = winston.createLogger({
    level: config.logLevel,
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'application.log', handleExceptions: true }),
    ],
});

// Handle logger transport errors
logger.on('error', (err) => {
    console.error('Logger Error:', err.message);
});

export default logger;
