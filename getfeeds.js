token="CAAVLI8Q1KXsBAOCpyRZC4XwGgVZCIUxsvlkk7taRIqrpkoomVhdZA5IiQxSykgpZAKP6jUHN27f1aB7KWZASxFsMTwIXTJSQBXuXJbyoGjiXJ4cDHmnQ1rkL96ixYp1dkRgXnIQvmE6qsNZBaxbZBm4uK2CQeqZA1D8isHxy84HdqhvVcPFByPurgK2VW3ya7VDEWrAU9kOdEAZDZD";
var graph= require('fbgraph');
graph.setAccessToken(token);
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var dburl = 'mongodb://localhost/fb';
var feeds = [];

var nb =0 ;

function getFeeds(url,page,id,count){

graph.get(url, function(err, res) {

   if(err)console.log('not connected to FB');

   if(!err){
     res.data.forEach(function(item) {
               id.push(item);
            });
     if (res.data.length>0 && count>0) setTimeout(getFeeds(res.paging.next,page,id,count-1),100)
      else {
                id.forEach(function(item){
                    console.log(item.id,'   ',page,'    ',item.created_time);
                
                 });
             };
    };                  
   });
}

MongoClient.connect(dburl, function (err, db) {

   var cursor = db.collection('pages').find({})

   cursor.count(function(err,count){
   	 nb=count;
   });
   cursor.each(function(err, doc){
                 if (doc) {
                 	//console.log(doc);
                 	link=doc.id+"/feed";
                 	//console.log(link);
                  feeds=[];
                 	getFeeds(link,doc.id,feeds,100);
                 }
                 nb--;
                 if(nb==0)db.close();
            });
});
//getFeeds("346593403645/feed",346593403645,feeds,500);
