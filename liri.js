require("dotenv").config();
var keys = require("./keys");
var moment = require('moment');
var fs = require('fs');

var prompt = process.argv[2];
var input = process.argv.slice(3).join(" ");

// spotify-this-song
function spotify(input) {
    if (input === "") {
        var Spotify = require("node-spotify-api");
        var spotify = new Spotify(keys.spotify);
        spotify
            .request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE')
            .then(function (data) {
                var showData = [
                    "Artist(s): " + data.artists[0].name,
                    "Song: " + data.name,
                    "Link: " + data.external_urls.spotify,
                    "Album: " + data.album.name
                ].join("\r\n")

                fs.appendFile('log.txt', showData + "\r\n-----------------\r\n", function (error) {
                    if (error) { throw error }
                    console.log("\n-----------------\n")
                    console.log(showData)
                });
            })
            .catch(function (err) {
                console.error('Error occurred: ' + err);
            });

    }
    else {
        var Spotify = require("node-spotify-api");
        var spotify = new Spotify(keys.spotify);

        spotify.search({ type: "track", query: input, limit: 5 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            if (JSON.stringify(data).length === 170) { console.log("We didn't found any result. Please try something else.") }
            else {
                for (var key in data) {
                    var track = data[key].items;
                    var showData = [];
                    for (var i = 0; i < track.length; i++) {
                        var showDataObj = {
                            ResultNumber: i + 1,
                            Artist: track[i].album.artists[0].name,
                            Song: track[i].name,
                            Link: track[i].external_urls.spotify,
                            Album: track[i].album.name
                        }
                        showData.push(showDataObj);
                        //console.log(showData[i]);
                        fs.appendFile('log.txt', JSON.stringify(showData[i]) + "\r\n-----------------\r\n", function (error) {
                            if (error) { throw error }
                        });
                        console.log("\n-----------------\n")
                        console.log(JSON.stringify(showData[i].ResultNumber))
                        console.log("Artist(s): " + JSON.stringify(showData[i].Artist))
                        console.log("Song: " + JSON.stringify(showData[i].Song))
                        console.log("Link: " + JSON.stringify(showData[i].Link))
                        console.log("Album: " + JSON.stringify(showData[i].Album))
                    };
                };
            }
        });
    }
}

// concert-this
function concert(input) {
    var request = require('request');
    request("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp", function (error, response, body) {
        console.log('error:', error);
        if (JSON.parse(body.length) === 17) { console.log("We didn't found any result. Please try something else.") }

        else {
            var data = JSON.parse(body);
            var length;
            if (data.length > 5) { length = 5 }
            else { length = data.length };
            var showData = [];
            for (var i = 0; i < length; i++) {
                var showDataObj = {
                    ResultNumber: i + 1,
                    Artist: data[i].lineup[0],
                    Venue: data[i].venue.name,
                    Location: data[i].venue.city + ", " + data[i].venue.region + " " + data[i].venue.country,
                    Date: moment(data[i].datetime).format("MM/DD/YYYY")
                }
                showData.push(showDataObj);
                //console.log(showData[i]);
                fs.appendFile('log.txt', JSON.stringify(showData[i]) + "\r\n-----------------\r\n", function (error) {
                    if (error) { throw error }
                });
                console.log("\n-----------------\n");
                console.log(JSON.stringify(showData[i].ResultNumber));
                console.log("Artist: " + JSON.stringify(showData[i].Artist));
                console.log("Venue: " + JSON.stringify(showData[i].Venue));
                console.log("Location: " + JSON.stringify(showData[i].Location));
                console.log("Date" + JSON.stringify(showData[i].Date))
            };
        };
    });
}

// movie-this
function movie(input) {
    if (input === "") {
        input = "Mr. Nobody";
    }

    var request = require('request');
    request("http://www.omdbapi.com/?apikey=trilogy&t=" + input, function (error, response, body) {
        console.log('error:', error);
        console.log("Hello " + JSON.parse(body.length));
        if (JSON.parse(body.length) === 47) { console.log("We didn't found any result. Please try something else.") }

        else {
            var result = JSON.parse(body);
            var rating = "";
            //console.log(result);
            if (result.Ratings[1] === undefined) {
                rating = "RT Rating: N/A"
            }
            else { rating = "RT Rating: " + result.Ratings[1].Value };
            var showData = [
                "Title: " + result.Title,
                "Year: " + result.Year,
                "IMBD Rating: " + result.imdbRating,
                "Country: " + result.Country,
                "Language: " + result.Language,
                "Plot: " + result.Plot,
                "Actors: " + result.Actors,
                "Rating: " + rating
            ].join("\r\n")
            fs.appendFile('log.txt', showData + "\r\n-----------------\r\n", function (error) {
                if (error) { throw error }
                console.log("\n-----------------\n")
                console.log(showData)
            });
        }
    });
}

// do-what-it-says
if (prompt === "do-what-it-says") {

    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) throw error;
        array = data.split(",");
        prompt = array[0];
        input = array[1];
        if (prompt === "spotify-this-song")
            spotify(input);

        else if (prompt === "concert-this") {
            concert(input);
        }

        else if (prompt === "movie-this") {
            movie(input);
        }
    })
}

if (prompt === "spotify-this-song")
    spotify(input);

else if (prompt === "concert-this") {
    concert(input);
}

else if (prompt === "movie-this") {
    movie(input);
}
/*

*/


