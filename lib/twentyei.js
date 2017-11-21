/**
 * Created by sanil on 11/19/17.
 */

import * as db from './db-functions';
import * as bot from './cleverbot';
import * as music from './music';
import * as gif from './giphy'
import * as insults from './insults';

export const botName = '@Twentyei Chawla';

export const process = async (chat, message) => {
    let query = message.body.toLowerCase().slice(message.body.indexOf(botName) + 17);
    let cmd = (query.indexOf(" ") >= 0) ? query.slice(0, query.indexOf(" ")) : query;
    let action = query.slice(query.indexOf(cmd) + cmd.length + 1);

    console.log("Message received!");
    console.log("Query: " + query);
    console.log("Command: " + cmd);
    console.log("Action: " + action);

    if (await db.isEligible(cmd, message.threadID)) {
        switch (cmd) {
            case 'add':
                chat.getUserID(action, (err, data) => {
                    if (err) chat.sendMessage("There was an error: " + err, message.threadID);
                    else chat.addUserToGroup(data[0].userID, message.threadID);
                });
                break;
            case 'kick':
                chat.getUserID(action, (err, data) => {
                    if (err) chat.sendMessage("There was an error: " + err, message.threadID);
                    else chat.removeUserFromGroup(data[0].userID, message.threadID);
                });
                break;
            case 'spotify':
                chat.sendMessage(await music.spotify(action), message.threadID);
                break;
            case 'emoji':
                chat.changeThreadEmoji(action, message.threadID, (err) => {
                    if (err) chat.sendMessage("There was an error: " + err, message.threadID);
                });
                break;
            case 'color':
                chat.sendMessage("Changing the thread color isn't supported at this time. Sorry!", message.threadID);
                break;
            case 'giphy':
                chat.sendMessage(await gif.search(action), message.threadID);
                break;
            case 'title':
                chat.setTitle(action, message.threadID);
                break;
            case 'roast':
                chat.sendMessage(insults.generate(), message.threadID);
                break;
            case 'pup':
                chat.sendMessage(await gif.search("cute puppy"), message.threadID);
                break;
            default:
                return 'Error';
        }
    } else {
        bot.ask(query, message.threadID)
            .then((response) => {
                chat.sendMessage(response, message.threadID);
            });
    }
};
