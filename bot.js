
console.log("\nhenlo\n");

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
let requests = [];

stream.on('tweet', addRequest);

setInterval( function() {
    if (requests.length > 0) {
        req = requests[0];
        requests.splice(requests.indexOf(req), 1);
        setTimeout(handleRequest(req), 0);
    }
}, 5000);

function addRequest(eventMsg) {
    if (!(eventMsg.user.screen_name === 'carmoodbot')) {
        if (!(eventMsg.is_quote_status)) {
            if (eventMsg.entities.hasOwnProperty('user_mentions') && eventMsg.entities.user_mentions.length > 0 && eventMsg.entities.user_mentions[0].screen_name === 'carmoodbot') {
                requests.push({
                    'id': eventMsg.timestamp,
                    'from': eventMsg.user.screen_name,
                    'text': eventMsg.text
                });
            }
        } else {
            if (eventMsg.quoted_status.user.screen_name === "carmoodbot") {
                T.post("favorites/create", {id: eventMsg.id_str}, function(err, data, response) {
                    console.log("+ Favorited successfully: " + eventMsg.text + "\n");
                });
            }
        }
    }
}

function handleRequest(req) {
    console.log("\nrequest: " + req.id + "\nfrom: " + req.from + "\ntext: " + req.text + "\n");
}
