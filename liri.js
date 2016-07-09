// Declare all variables and require references
var keyList = require('./keys');
var fs = require('fs');
var request = require('request');
var spotify = require('spotify');
var Twitter = require('twitter');
var nodeArgvs = process.argv;

// Adding key values
var client = new Twitter({
  consumer_key: keyList.twitterKeys.consumer_key,
  consumer_secret: keyList.twitterKeys.consumer_secret,
  access_token_key: keyList.twitterKeys.access_token_key,
  access_token_secret: keyList.twitterKeys.access_token_secret
});


// my-tweets function
var tweets = function(){
  var params = {screen_name: 'puneet_o'};
    
    client.get('statuses/user_timeline', params, function(error, tweets, response){
      if (!error) {
        for(i=0;i<tweets.length;i++){
          if(i<20){
            console.log(params.screen_name + " tweeted- " + JSON.stringify(tweets[i].text) + ".  It was created- " + JSON.stringify(tweets[i].created_at));
          }
        };  
      };
    });
}

// spotify this song function
var songSearch = function(){
  var songName = '';

  if (nodeArgvs.length === 3){
    songName = "What's My Age Again";
  } else {
    for (var i=3; i<nodeArgvs.length; i++){
      if (i>3 && i<nodeArgvs.length){
        songName = songName + ' ' + nodeArgvs[i];
      } else {
        songName = songName + nodeArgvs[i];
      }
    }
  }

  spotify.search({ type: 'track', query: songName }, function(err, data) {
    if ( err ) {
      console.log('Error occurred: ' + err);
      return;
    }
    //console.log data to retrieve info needed
    // console.log(JSON.stringify(data, null, 2);
    // console.log info
    console.log("Song Name: " + songName);
    console.log("Preview Link: " + JSON.stringify(data.tracks.items[1].external_urls.spotify));
    console.log("Artist(s): " + JSON.stringify(data.tracks.items[1].artists[0].name));
    console.log("Album: " + JSON.stringify(data.tracks.items[0].album.name));
  });
}

// movie function
var movieSearch = function(){
  var movieName = '';

    if (nodeArgvs.length === 3){
      movieName = "mr+nobody";
    } else {
      for (var i=3; i<nodeArgvs.length; i++){
        if (i>3 && i<nodeArgvs.length){
          movieName = movieName + '+' + nodeArgvs[i];
        } else {
          movieName = movieName + nodeArgvs[i];
        }
      } 
    }

    // console.log(movieName);
    request('http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&r=json', function (error, response, body) {

      if (!error && response.statusCode == 200) {
        console.log("Title of movie: " + JSON.parse(body)["Title"]);
        console.log("The year it was made: " + JSON.parse(body)["Year"]);
        console.log("The movie's IMDB rating is: " + JSON.parse(body)["imdbRating"]);
        console.log("Made in: " + JSON.parse(body)["Country"]);
        console.log("Language spoken: " + JSON.parse(body)["Language"]);
        console.log("Plot: " + JSON.parse(body)["Plot"]);
        console.log("Actors: " + JSON.parse(body)["Actors"]);
      }
    });
}

// reading random file function
var randomFile = function(){ 
  // Reading Random.txt 
  fs.readFile("random.txt", "utf8", function(err, data){
    var output = data.split(',');
    nodeArgvs[2] = output[0];
    nodeArgvs[3] = output[1].replace(/['"]+/g, '');
    console.log(nodeArgvs[2]);
    console.log(nodeArgvs[3]);
    checkNodeArgvs();
    
  });
}

// checking nodeArgvs[2] function
var checkNodeArgvs = function(){
  switch(nodeArgvs[2]){
    
    case 'my-tweets':
      tweets();
      break;

    case 'spotify-this-song':
      songSearch();
      break;

    case 'movie-this':
      movieSearch();
      break;
    
    case 'do-what-it-says':
      randomFile();
      break;

    default:
      console.log('error!');
  }
}

checkNodeArgvs();
