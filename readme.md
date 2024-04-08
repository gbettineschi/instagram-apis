# Instagram APIs

Personal code to work with official Facebook and Instagram Graph APIs. At the moment the only implemented script is for posting an image.

## Quick start guide

Have: a Meta Business Manager account that has under management a Facebook page and an Instagram business account that are linked between them.

Go on Facebook for Developers, create an app. Go your app > settings > basic and take from there your `APP_ID` and `APP_SECRET`; put them in the environment variables.

Go on the Meta Business Suite > settings of your Business Manager account > users > system users.
Add a new system users and give it full permissions on the Instagram business account, on the Facebook Page and on the app you just created.

Generate a token from there with the scopes you need. Put the token in your env variables in the field `SYSTEM_USER_ACCESS_TOKEN`
The token you just generated will have a 60-day duration; you can run `refreshToken.js` to get a new token which has no expiration.

Run `getIGUserId.js` to get what you need to put in your environment variables as `IG_USER_ID`.

Now it's all set up, you can run `main.js`.

### Technologies

**Language:** Javascript (Node.js).
