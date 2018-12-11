require("dotenv").config();
var keys = require("./keys")

// spotify-this-song

var songInput = process.argv.slice(3).join(" ");
var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

spotify.search({ type: "track", query: songInput, limit: 5 }, function (err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }

    //console.log (data.tracks.items[0])
    for (var key in data) {
        var track = data[key].items;
        for (var i = 0; i < track.length; i++) {
            console.log("\n");
            console.log(i + 1);
            console.log("Artist(s): " + track[i].album.artists[0].name);
            console.log("Song: " + track[i].name);
            console.log("Link: " + track[i].external_urls.spotify);
            console.log("Album: " + track[i].album.name);
        }
    }
});

// concert-this

// movie-this

// do-what-it-says
