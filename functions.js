import fetch from 'node-fetch';
import * as dotenv from 'dotenv';

dotenv.config();

export function buildUrl(endpoint, parameters) {
	let url = `${endpoint}?access_token=${process.env.SYSTEM_USER_ACCESS_TOKEN}`;

	Object.keys(parameters).forEach((key) => {
		url += `&${key}=${parameters[key]}`;
	});
	return url;
}

export async function makeRequest(endpoint, parameters = {}, method = 'GET') {
	const url = buildUrl(endpoint, parameters);

	const responseData = await fetch(url, { method: method }).then(
		(response) => {
			if (!response.ok) {
				console.log(response);
				throw new Error('Network response was not ok');
			}
			return response.json();
		}
	);

	return responseData;
}

export async function getFBPageId() {
	//returns the id of the first FB page of the account
	const FBPageId = makeRequest(
		'https://graph.facebook.com/v19.0/me/accounts'
	).then((data) => {
		return data.data[0].id;
	});

	return FBPageId;
}

export async function getIGUserId(FBPageId) {
	//returns the id of the IG user associated with the FB page whose id is passed as argument
	const IGUserId = makeRequest(
		`https://graph.facebook.com/v19.0/${FBPageId}`,
		{
			fields: ['instagram_business_account'],
		}
	).then((data) => {
		return data.instagram_business_account.id;
	});

	return IGUserId;
}

export async function printIGUserId() {
	getFBPageId()
		.then((data) => {
			return getIGUserId(data);
		})
		.then((data) => {
			console.log(data);
		});
}

export async function getImageContainerID(image_url, caption = '') {
	//note that the image_url must be a public url
	const endpoint = `https://graph.facebook.com/v19.0/${process.env.IG_USER_ID}/media/`;
	const parameters = { image_url: image_url, caption: caption };

	const responseData = await makeRequest(endpoint, parameters, 'POST');
	return responseData.id;
}

export async function publishMedia(media_container_id) {
	const endpoint = `https://graph.facebook.com/v19.0/${process.env.IG_USER_ID}/media_publish/`;
	const parameters = { creation_id: media_container_id };

	const responseData = await makeRequest(endpoint, parameters, 'POST');
	return responseData;
}
