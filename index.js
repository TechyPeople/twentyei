/**
 * Twentyei v2 (re-written from scratch!)
 * Created by Sanil Chawla on 11/18/17.
 * ===
 * Execute "login.js" before running this script.
 */

const fs = require('fs');
const login = require("facebook-chat-api");

import * as db from "./lib/db-functions";
import * as twentyei from "./lib/twentyei";

/**
 * Facebook login information
 * @type {{email: *, password: *}}
 */
const loginOptions = {
    appState: JSON.parse(fs.readFileSync('./private/appState.json', 'utf8'))
};

login(loginOptions, (err, chat) => {
    if (err) return console.error(err);

    // Write new appState
    fs.writeFileSync('./private/appState.json', JSON.stringify(chat.getAppState()));

    chat.setOptions({
        listenEvents: true,
        logLevel: "verbose",
        updatePresence: true
    });

    chat.listen(async (err, message) => {
        db.updateCounter();

        if (message.type === "message") {
            // Add thread to Firebase if not already present
            db.threadExists(message.threadID)
                .then(exists => {
                    if (!exists) {
                        chat.getThreadInfo(message.threadID, (err, info) => {
                            let isGroup = !info.isCanonical;
                            db.createThreadDoc(message.threadID, isGroup);
                        });
                    }
                });

            // Check if Twentyei has been mentioned
            if (message.mentions[100011665261574] === twentyei.botName) {
                chat.sendTypingIndicator(message.threadID, async (err) => {
                    await twentyei.process(chat, message);
                });
            }
        }
    });
});