import { makeRequest } from './functions.js';
import * as dotenv from 'dotenv';

dotenv.config();

const parameters = {
	grant_type: 'fb_exchange_token',
	client_id: process.env.APP_ID,
	client_secret: process.env.APP_SECRET,
	// set_token_expires_in_60_days: true,
	fb_exchange_token: process.env.SYSTEM_USER_ACCESS_TOKEN,
};

makeRequest(
	'https://graph.facebook.com/v19.0/oauth/access_token',
	parameters
).then((data) => {
	console.log(data);
});
