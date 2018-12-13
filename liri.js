require("dotenv").config();
var keys = require("./keys");
var moment = require('moment');
var prompt = process.argv[2];
var input = process.argv.slice(3).join(" ");
const movieNobody = "Mr Nobody";
var movie = "";

// spotify-this-song
if (prompt === "spotify-this-song") {
    var Spotify = require("node-spotify-api");
    var spotify = new Spotify(keys.spotify);

    spotify.search({ type: "track", query: input, limit: 5 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        for (var key in data) {
            var track = data[key].items;
            for (var i = 0; i < track.length; i++) {
                console.log("\n");
                console.log(i + 1);
                console.log("Artist(s): " + track[i].album.artists[0].name);
                console.log("Song: " + track[i].name);
                console.log("Link: " + track[i].external_urls.spotify);
                console.log("Album: " + track[i].album.name);
            };
        };
    });
}

// concert-this
else if (prompt === "concert-this") {
    var request = require('request');
    request("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp", function (error, response, body) {
        console.log('error:', error);
        var data = JSON.parse(body);
        var length;
        if (data.length > 5) { length = 5 } else { length = data.length }
        for (var i = 0; i < length; i++) {
            console.log("\n");
            console.log(i + 1);
            console.log("Venue: " + data[i].venue.name);
            console.log("Location: " + data[i].venue.city + ", " + data[i].venue.region + " " + data[i].venue.country);
            console.log("date: " + moment(data[i].datetime).format("MM/DD/YYYY"));
        };
    });
}

// movie-this
else if (prompt === "movie-this") {
    if (input === "") {
        input = movieNobody;
    }

    var request = require('request');
    request("http://www.omdbapi.com/?apikey=trilogy&t=" + input, function (error, response, body) {
        console.log('error:', error);
        var result = JSON.parse(body);
        console.log(result);
        console.log("\n------------------------\n");
        console.log("Title: " + result.Title);
        console.log("Year: " + result.Year);
        console.log("IMBD Rating: " + result.imdbRating);
        if (result.Ratings[1] === undefined) {
            console.log("RT Rating: N/A") 
        }
            else {console.log("RT Rating: " + result.Ratings[1].Value)};
        console.log("Country: " + result.Country);
        console.log("Language: " + result.Language);
        console.log("Plot: " + result.Plot);
        console.log("Actors: " + result.Actors);
    });
};


// do-what-it-says
