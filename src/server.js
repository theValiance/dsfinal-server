/**
 * Entry point for the application.
 * Creates the express app, connects to mongoDB, and adds the middleware and routes
 */

import express from 'express';
import cors from 'cors';
//import { routes } from './routes/routes.js';
import { env, logger, httpLogger, mongooseConnectPromise, helmet } from './config/index.js';

logger.info(`Starting ${env.APP_NAME} application...`);

//create express app
const app = express(); 

//disable the powered by express header to make fingerpinting more difficult
app.set('x-powered-by', false);

//log http requests
app.use(httpLogger);

//reverse proxy
//? https://expressjs.com/en/guide/behind-proxies.html
if (env.PROXY_ENABLED) {
	app.set('trust proxy', env.PROXY_NUMBER);
}

//add helmet's header-level security middleware
if (env.NODE_ENV !== 'development') {
	app.use(helmet);
}

//CORS middleware
if (env.CORS_ENABLED) {
	app.use(cors({
		origin: env.CLIENT_ADDRESS,
	}));
}

//JSON request handling
app.use(express.json());

//application routes
app.use('*', (_req, res) => {
	res.send('hello world');
});

//if no route was matched we send whatever we have so far, or a 404 for no match
app.use((_req, res) => {
	if (res.statusCode != 200) return res.sendStatus(res.statusCode);
	else return res.sendStatus(404);
});

//await mongoose connection before listening for http traffic
mongooseConnectPromise.then(() => {
	app.listen(env.APP_PORT, () => {
		logger.info(`${env.APP_NAME} is listening to port: ${env.APP_PORT}`);
	});
});
