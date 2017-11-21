/**
 * Created by sanil on 11/19/17.
 */

import * as db from './db-functions';
const CleverbotAPI = require('cleverbot-api');
const cleverbot = new CleverbotAPI('CC5iybi6FlNywj957bERFy73w4A');

export const ask = async (query, threadID) => {
    return new Promise((resolve, reject) => {
        db.getThreadInfo(threadID)
            .then((res) => {
                cleverbot.getReply({
                    input: query,
                    cs: res.context
                }, (error, response) => {
                    if(error) return reject(error);

                    db.updateContext(threadID, response.cs);
                    resolve(response.output);
                });
            });
    });

};