const dotenv = require('dotenv');
const { IgApiClient } = require('instagram-private-api');
const { readFile } = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(readFile);

dotenv.config({ path: '.env.local' });

const postToInsta = async (username, password, pathToImage, caption) => {
	const ig = new IgApiClient();
	ig.state.generateDevice(username);
	const loginResult = await ig.account.login(username, password);
	// console.log(loginResult);

	const publishResult = await ig.publish.photo({
		file: await readFileAsync(pathToImage),
		caption: caption,
	});

	// console.log(publishResult);
	console.log('Done.');
};

postToInsta(
	process.env.IG_USERNAME,
	process.env.IG_PASSWORD,
	'./propic.jpg', //worked with .jpg, didn't work with .png
	'che bella descrizione'
);
