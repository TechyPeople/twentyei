/**
 * Created by sanil on 11/19/17.
 */

const SpotifyWebApi = require('spotify-web-api-node');
const api = new SpotifyWebApi({
    clientId : 'dae83b442fdf4fa586e0585d9eb5b357',
    clientSecret : '86cffa6a2c7e49f98914accdca8da9b6',
    redirectUri : 'http://sanil.co'
});

api.clientCredentialsGrant()
    .then((data) => {
        console.log('The access token expires in ' + data.body['expires_in']);
        console.log('The access token is ' + data.body['access_token']);

        // Save the access token so that it's used in future calls
        api.setAccessToken(data.body['access_token']);
    }, (err) => {
        console.log('Something went wrong when retrieving an access token', err);
    });

/**
 * Grabs link to Spotify song and returns.
 *
 * @param query
 * @returns {Promise.<TResult>}
 */
export const spotify = async (query) => {
    return new Promise((resolve, reject) => {
        api.searchTracks(query)
            .then(data => {
                let song = data.body.tracks.items[0];
                let url = song.external_urls.spotify;
                console.log(url);

                resolve({
                    body: "Here's " + song.name + " by " + song.artists[0].name + " from Spotify.",
                    url: url
                });
            })
    });
};