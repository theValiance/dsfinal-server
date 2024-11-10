import mongoose from 'mongoose';
import { env } from './env.js';
import { logger } from './logger.js';

//dont automatically create indices in production
if (env.NODE_ENV !== 'development') {
	mongoose.set('autoIndex', false);
}

export const mongooseConnectPromise = mongoose.connect(`${env.MONGO_PROTOCOL}://${env.MONGO_USER}:${env.MONGO_PASSWORD}@${env.MONGO_HOST}/${env.MONGO_DB_NAME}?retryWrites=true&w=majority&appName=${env.APP_NAME}`).then(() => {
	logger.info(`MongoDB connected at ${env.MONGO_HOST}`);
}).catch((err) => {
	logger.error(`Mongoose connection error: ${err}`);
	throw err;
});