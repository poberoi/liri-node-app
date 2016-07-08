// Declare all variables and require references
var keyList = require('./keys');
var fs = require('fs');
var request = require('request');
var spotify = require('spotify');
var Twitter = require('twitter');
var nodeArgvs = process.argv;

// Check to see if keys are being read
// console.log(keyList.twitterKeys.consumer_key);
// console.log(keyList.twitterKeys.consumer_secret);
// console.log(keyList.twitterKeys.access_token_key);
// console.log(keyList.twitterKeys.access_token_secret);

// Adding key values
var client = new Twitter({
  consumer_key: keyList.twitterKeys.consumer_key,
  consumer_secret: keyList.twitterKeys.consumer_secret,
  access_token_key: keyList.twitterKeys.access_token_key,
  access_token_secret: keyList.twitterKeys.access_token_secret
});


// Creating switch/case for arguments 
switch(nodeArgvs[2]){
  
  case 'my-tweets':
    
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
    
    break;

  case 'spotify-this-song':

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
    
    break;

  
  default:
    console.log('error!');
}
// Reading Random.txt 
// fs.readFile("random.txt", "utf8", function(err, data){
//   var output = data.split(',');

//   for (var i=0; i<output.length; i++){
//     console.log(output[i]);
//   }
// });