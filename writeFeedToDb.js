var mongoClient=require('mongodb');
var lineReader = require('readline').createInterface({
  terminal: false,input: require('fs').createReadStream('recentfeeds')
});


var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var dburl = 'mongodb://localhost/fb';

MongoClient.connect(dburl,function(err,db){
	setTimeout(db.close(),100000);
lineReader.on('line', function (line) {
  console.log('Line from file:', line);
  var arr = line.split(" ");
  console.log(arr);
  var ins={feed:arr[0],date:arr[2]}
  db.collection('pub').insert(ins);
});
});