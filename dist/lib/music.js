'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Created by sanil on 11/19/17.
 */

var SpotifyWebApi = require('spotify-web-api-node');
var api = new SpotifyWebApi({
    clientId: 'dae83b442fdf4fa586e0585d9eb5b357',
    clientSecret: '86cffa6a2c7e49f98914accdca8da9b6',
    redirectUri: 'http://sanil.co'
});

api.clientCredentialsGrant().then(function (data) {
    console.log('The access token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);

    // Save the access token so that it's used in future calls
    api.setAccessToken(data.body['access_token']);
}, function (err) {
    console.log('Something went wrong when retrieving an access token', err);
});

/**
 * Grabs link to Spotify song and returns.
 *
 * @param query
 * @returns {Promise.<TResult>}
 */
var spotify = exports.spotify = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(query) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        return _context.abrupt('return', new Promise(function (resolve, reject) {
                            api.searchTracks(query).then(function (data) {
                                var song = data.body.tracks.items[0];
                                var url = song.external_urls.spotify;
                                console.log(url);

                                resolve({
                                    body: "Here's " + song.name + " by " + song.artists[0].name + " from Spotify.",
                                    url: url
                                });
                            });
                        }));

                    case 1:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function spotify(_x) {
        return _ref.apply(this, arguments);
    };
}();
//# sourceMappingURL=music.js.map