/**
 * Created by sanil on 11/19/17.
 */

import * as admin from "firebase-admin";

// Firebase initialization
const serviceAccount = require("../private/serviceAccountKey");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://twentyei-1489348155811.firebaseio.com"
});
const db = admin.firestore();


/**
 * Gets database information for a thread from Firebase.
 *
 * @param threadID Thread ID number
 * @returns {Promise.<T>}
 */
export const getThreadInfo = async (threadID) => {
    return await db.collection('chats').doc(threadID).get()
        .then(async doc => {
            if (!doc.exists) {
                return false;
            } else {
                return doc.data();
            }
        })
        .catch(err => {
            return new Error("Error getting document: " + err);
        });
};


/**
 * Initializes a document for threads in Firebase.
 *
 * @param threadID Thread ID number
 * @param isGroup Boolean indicating whether thread is group
 */
export const createThreadDoc = (threadID, isGroup) => {
    let data = {
        version: 1,
        context: "",
        group: isGroup,
        eligible: [
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true
        ]
    };

    let setDoc = db.collection('chats').doc(threadID).set(data);
};


/**
 * Updates context for Cleverbot.
 *
 * @param threadID
 * @param updatedContext
 */
export const updateContext = (threadID, updatedContext) => {
    let data = {
        context: updatedContext
    };

    let setDoc = db.collection('chats').doc(threadID).set(data, {merge: true});
};


/**
 * Check if a thread has a command enabled.
 *
 * @param cmd Command to check
 * @param threadID Thread ID number
 * @returns {Promise.<TResult>}
 */
export const isEligible = async (cmd, threadID) => {
    let code;
    let commands = ['add', 'kick', 'spotify', 'emoji', 'color', 'giphy', 'title', 'roast', 'pup', 'bot'];

    code = commands.indexOf(cmd);

    return getThreadInfo(threadID).then(threadInfo => {
        return !!threadInfo.eligible[code];
    });
};


/**
 * Check if thread exists.
 *
 * @param threadID
 * @returns {Promise.<void>}
 */
export const threadExists = async (threadID) => {
    getThreadInfo(threadID)
        .then(threadInfo => {
            return threadInfo !== false;
        });
};


/**
 * Get current count.
 * @returns {Promise}
 */
export const currentCount = () => {
    return new Promise((resolve, reject) => {
        db.collection('meta').doc('info').get()
            .then(async doc => {
                resolve(doc.data().numberOfMessages);
            })
            .catch(err => {
                reject(new Error("Error getting count: " + err));
            });
    })
};


/**
 * Increments counter.
 */
export const updateCounter = () => {
    currentCount()
        .then((count) => {
            let data = {
                numberOfMessages: (count + 1)
            };

            let setDoc = db.collection('meta').doc('info').set(data, {merge: true});
        });
};


/**
 * Checks if an appstate exists.
 */
export const checkLoginDetails = () => {
    return new Promise((resolve, reject) => {
        fs.stat('../private/appState.json', (err, stat) => {
            resolve(err == null);
        });
    })
}