# LIRI Bot

### Overview
LIRI is a command line (CLI) node app that takes in parameters and gives you back data. It will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.

### How it works

![Liri CLI1](videos/video1.gif)

liri.js can take in one of the following commands: `concert-this`; `spotify-this-song`; `movie-this`; `do-what-it-says`. 

1. `node liri.js concert-this <artist/band name here>`. This will search the Bands in Town Artist Events API for an artist and render the following information about each event to the terminal:
     * Name of the venue
     * Venue location
     * Date of the Event (use moment to format this as "MM/DD/YYYY")

2. `node liri.js spotify-this-song '<song name here>'`. This will show the following information about the song in your terminal:
     * Artist(s)
     * The song's name
     * A preview link of the song from Spotify
     * The album that the song is from
If no song is provided then its will default to "The Sign" by Ace of Base.

3. `node liri.js movie-this '<movie name here>'`. This will output the following information to your terminal:
      * Title of the movie.
      * Year the movie came out.
      * IMDB Rating of the movie.
      * Rotten Tomatoes Rating of the movie.
      * Country where the movie was produced.
      * Language of the movie.
      * Plot of the movie.
      * Actors in the movie.
If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

4. `node liri.js do-what-it-says`. This will make LIRI to take the text inside of `random.txt` and then use it to call one of LIRI's commands depending on the text. The text is suppposed to be in the same format as one of liri's functions for song, movie or concert.

In addition to logging the data to terminal/bash window, we output the data to a .txt file called `log.txt`, appending each command we run to the that file. 

![Liri CLI2](videos/video2.gif)

We also added error handling letting user know when input returned no result and asking him to try again. 

### Instructions

We made a `.gitignore` file and included these file names in there: node_modules, .DS_Store, .env. We use `keys.js` file to load spotify id and secret from local machine. We kept spotify id and secret in local machine in `.env` file. This file will be used by the `dotenv` package to set environment variables to the global `process.env` object in node. You'll need to have your own spotify id and secret stored in your own `.env` file for this app to work on your machine. 

We made a `random.txt` file. Inside of it we keep a search prompt and input. We'll use this file to run command `do-what-it-says`.

Our main code lives in `liri.js` file.

We install/use the following node packages:
   * [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
   * [Request](https://www.npmjs.com/package/request)
     * We're using Request to grab data from the [OMDB API](http://www.omdbapi.com) and the [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)
   * [Moment](https://www.npmjs.com/package/moment)
   * [DotEnv](https://www.npmjs.com/package/dotenv)
   * [Moment](https://www.npmjs.com/package/moment)
   * [fs]

The easiest way to install them is to download `package.json` and run `npm install` and it will install all nessassary packages. 

To retrieve data we send requests to the Bands in Town, Spotify and OMDB APIs. 
