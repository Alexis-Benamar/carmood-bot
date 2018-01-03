
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
    console.log("// DEV //\n");
} else {
    console.log("// PROD //\n");
}

const config = {
    consumer_key:         process.env.consumer_key,
    consumer_secret:      process.env.consumer_secret,
    access_token:         process.env.access_token,
    access_token_secret:  process.env.access_token_secret
};
const fs = require('fs');
const Twit = require("twit");
const T = new Twit(config);
let stream = T.stream('user');

stream.on('tweet', setTimeout(rdm_car(eventMsg), 10000));

function rdm_car(eventMsg) {
    console.log('test timeout ' + eventMsg.text);
}
