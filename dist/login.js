'use strict';

/*
 * Login and store appState.
 * ====
 * Set environmental variables "email" and "password"
 * with your Facebook account login information.
 */

var fs = require('fs');
var login = require("facebook-chat-api");

var credentials = {
    email: process.env.email,
    password: process.env.password
};

login(credentials, function (err, chat) {
    if (err) return console.error(err);

    fs.writeFileSync('./private/appState.json', JSON.stringify(chat.getAppState()));
});
//# sourceMappingURL=login.js.map