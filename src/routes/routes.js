import express from 'express';
import entryRoute from './entry.js';

const routes = express.Router();

routes.use('/entries', entryRoute);

export default routes;