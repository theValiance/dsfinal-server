import { z } from 'zod';

function insensitiveEnum(enumArray) {
	return z.string().toLowerCase().pipe(z.enum(enumArray));
}

function stringToBool() {
	return insensitiveEnum(['true', 'false']).transform((value) => value === 'true');
}

const envSchema = z.object({
	//deployment env
	NODE_ENV: insensitiveEnum(['development', 'production']).default('production'),
	//application config
	APP_NAME: z.string().default('dsfinal-server'),
	APP_PORT: z.coerce.number().default(3000),
	CLIENT_ADDRESS: z.string(),
	//mongo config
	MONGO_PROTOCOL: z.enum(['mongodb', 'mongodb+srv']).default('mongodb'),
	MONGO_HOST: z.string(),
	MONGO_DB_NAME: z.string().transform((val) => encodeURIComponent(val)),
	MONGO_USER: z.string().transform((val) => encodeURIComponent(val)),
	MONGO_PASSWORD: z.string().min(8).transform((val) => encodeURIComponent(val)),
	//proxy config
	PROXY_ENABLED: stringToBool().default('false'),
	PROXY_NUMBER: z.coerce.number().default(1),
	//CORS
	CORS_ENABLED: stringToBool().default('false'),
	//Paths
	PATH_LOGS: z.string().default('./logs/'),
	//API keys
	APIKEY_GOOGLE: z.string(),
}).readonly();

//actually perform the validation
export const env = envSchema.parse(process.env);