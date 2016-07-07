var keyList = require('./keys');
var fs = require('fs');
var request = require('request');
var nodeArgvs = process.argv;

console.log(keyList);

fs.readFile("random.txt", "utf8", function(err, data){
  var output = data.split(',');

  for (var i=0; i<output.length; i++){
    console.log(output[i]);
  }
});