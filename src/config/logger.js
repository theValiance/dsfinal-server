//imports
import pino from 'pino';
import { env } from './env.js';
import { pinoHttp } from 'pino-http';

//create the transport to the log file
const transport = pino.transport({
	targets: [
		//file transport
		{
			target: 'pino/file',
			options: {
				destination: env.PATH_LOGS + '/log.txt',
				mkdir: true,
			}
		},
		//stdout transport
		{ //prettify output in dev mode
			target: env.NODE_ENV === 'development' ? 'pino-pretty' : 'pino/file',
			options: {
				destination: 1,
			}
		}
	],
});

//export the configured logger
export const logger = pino.pino(transport);

export const httpLogger = pinoHttp({
	logger
});