require("dotenv").config();
var fs = require("fs");
var keys = require("./keys");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var spotifysearch = new Spotify(keys.spotify);
var moment = require("moment");

function spotify(song) {
  spotifysearch.search({ type: "track", query: song }, function(err, data) {
    if (err) throw err;
    var results = data.tracks.items;
    results.forEach(function(song) {
      console.log("artist(s): " + song.artists);
      console.log("song name: " + song.name);
      console.log("preview song: " + song.preview_url);
      console.log("album: " + song.album.name);
      console.log("that was fun, search me again!");
    });
  });
}

function bands(artist) {
  var URL =
    "https://rest.bandsintown.com/artists/" +
    artist +
    "/events?app_id=codingbootcamp";
  axios.get(URL).then(function(response) {
    var results = response.data;
    console.log("Upcoming concerts for " + artist);
    for (var i = 0; i < results.length; i++) {
      var loop = results[i];
      console.log(
        loop.venue.city +
          loop.venue.country +
          " at " +
          loop.venue.name +
          " " +
          moment(loop.datetime).format("MM/DD/YYYY")
      );
    }
  });
}

function movie(name) {
  var movieurl =
    "http://www.omdbapi.com/?t=" +
    name +
    "&y=&plot=full&tomatoes=true&apikey=trilogy";
  axios.get(movieurl).then(function(response) {
    var cinema = response.data;
    console.log("Title: " + cinema.Title);
    console.log("Rotten Tomatoes" + cinema.Ratings.Value);
    console.log("Year: " + cinema.Year);
    console.log("Rated: " + cinema.Rated);
    console.log("Actors: " + cinema.Actors);
    console.log("Plot: " + cinema.Plot);
  });
}

var pick = function(caseData, query) {
  switch (caseData) {
    case "concert":
      bands(query);
      break;
    case "spotify":
      spotify(query);
      break;
    case "movie":
      movie(query);
      break;
    default:
      console.log("Hey! This is LIRI, NOT SIRI!");
  }
};

var start = function(argOne, argTwo) {
  pick(argOne, argTwo);
};

start(process.argv[2], process.argv.slice(3).join(" "));
