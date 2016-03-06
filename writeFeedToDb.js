var mongoClient=require('mongodb');
var fs = require('fs');

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var dburl = 'mongodb://localhost/fb';



var readableStream = fs.createReadStream('recentfeeds');
var data = '';

MongoClient.connect(dburl,function(err,db){
readableStream.on('data', function(chunk) {
	line='';
	line+=chunk;
	//console.log('Line from file:', line);
    var arr = line.split(" ");
    //console.log(arr);
    var ins={feed:arr[0],date:arr[2]}
    db.collection('pub').insert(ins);
    console.log(ins);

});

readableStream.on('end', function() {
    console.log("done");
    setTimeout(function(){db.close()},100000);
});
});