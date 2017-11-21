/*
 * Login and store appState.
 * ====
 * Set environmental variables "email" and "password"
 * with your Facebook account login information.
 */

const fs = require('fs');
const login = require("facebook-chat-api");

const credentials = {
    email: process.env.email,
    password: process.env.password
};

login(credentials, (err, chat) => {
    if(err) return console.error(err);

    fs.writeFileSync('./private/appState.json', JSON.stringify(chat.getAppState()));
});