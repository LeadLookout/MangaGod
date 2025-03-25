import { Request, Response, NextFunction } from 'express';
import logger from './logger';
import { config } from './config';

export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    const isOperationalError = err.name === 'OperationalError';

    logger.error(`${err.name || 'Error'}: ${err.message}`, { stack: err.stack });

    if (isOperationalError) {
        res.status(400).json({ error: err.message });
    } else {
        const statusCode = config.nodeEnv === 'production' ? 500 : 500;
        const errorMessage = config.nodeEnv === 'production' ? 'Internal Server Error' : err.message;
        res.status(statusCode).json({ error: errorMessage });
    }
}
