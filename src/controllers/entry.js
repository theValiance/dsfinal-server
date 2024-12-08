import _ from 'lodash';
import z from 'zod';
import { Entry } from '../models/entry.js';

export async function getEntries(req, res) {
	const args = z.object({
		depth: z.coerce.number().default(0),
		limit: z.coerce.number().default(10),
	}).parse(req.query);
	const entries = await Entry.find().populate('video').limit(args.limit).skip(args.depth).sort({timestamp: 'descending'});
	return res.json(entries);
}

export async function postEntry(req, res) {
	const entry = new Entry({
		..._.omit(req.body, ['_id', 'timestamp', 'ip']),
		ip: req.ip,
	});
	await entry.save();
	return res.status(200).json(entry);
}

export async function getEntryCount(req, res) {
	const filter = z.object({
		vid: z.string(),
		name: z.string(),
		labels: z.object({
			set: z.string(),
		}),
	}).partial().parse(req.query);
	const count = await Entry.countDocuments(filter);
	return res.status(200).json({
		count
	});
}