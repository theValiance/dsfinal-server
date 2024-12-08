import express from 'express';
import { getEntries, getEntryCount, postEntry } from '../controllers/entry.js';

const entryRoute = express.Router();

entryRoute.route('/')
	.get(getEntries)
	.post(postEntry);

entryRoute.route('/count')
	.get(getEntryCount);

export default entryRoute;