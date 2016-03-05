var mongoClient=require('mongodb');
var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('recentfeeds')
});


var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var dburl = 'mongodb://localhost/fb';

MongoClient.connect(dburl,function(err,db){
lineReader.on('line', function (line) {
  console.log('Line from file:', line);
  var arr = line.split(" ");
  console.log(arr);
  var ins={feed:arr[0],date:arr[2]}
  db.collection('pub').update(feed:arr[0],ins,{upsert:true});
});
});