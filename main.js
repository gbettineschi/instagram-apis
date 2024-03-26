import { getImageContainerID, publishMedia } from './functions.js';

getImageContainerID(
	'https://t3.ftcdn.net/jpg/02/95/53/84/360_F_295538480_FVbrdukcQqZlCMDBd4SO7Xr2WV679snE.jpg'
)
	.then((data) => {
		return publishMedia(data);
	})
	.then((data) => {
		console.log(data);
	});
