import axios from "axios";
import { env } from "./env.js";

export const gapiClient = axios.create({
	baseURL: 'https://www.googleapis.com/',
	params: {
		key: env.APIKEY_GOOGLE,
	}
});