var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var dburl = 'mongodb://localhost/fb';


var lineReader = require('readline').createInterface({
  terminal: false,input: require('fs').createReadStream('recentfeeds')
});



MongoClient.connect(dburl,function(err,db){
	//setTimeout(function(){db.close()},10000);
if (!err){
lineReader.on('line', function (line) {
  console.log( line);
  var arr = line.split(" ");
  console.log(arr);
 /* var ins={feed:arr[0],date:arr[2]}
  db.collection('pub').insert(ins,function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the restaurants collection.");})
*/

});
}// end if
});