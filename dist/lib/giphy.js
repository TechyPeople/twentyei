'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by sanil on 11/20/17.
 */

var giphy = require('giphy-api')();
var request = require('request');

// TODO: Use request/fs/etc to pipe the actual gif, not a url

var search = exports.search = function search(query) {
    return new Promise(function (resolve, reject) {
        giphy.random(query).then(function (res, err) {
            if (err) console.error(err);

            resolve({
                url: res.data.image_url
            });
        });
    });
};
//# sourceMappingURL=giphy.js.map