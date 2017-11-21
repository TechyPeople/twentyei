/**
 * Created by sanil on 11/20/17.
 */

const giphy = require('giphy-api')();
const request = require('request');

// TODO: Use request/fs/etc to pipe the actual gif, not a url

export const search = (query) => {
    return new Promise((resolve, reject) => {
        giphy.random(query)
            .then((res, err) => {
                if (err) console.error(err);

                resolve({
                    url: res.data.image_url
                });
            });
    });
};