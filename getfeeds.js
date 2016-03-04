token="CAAVLI8Q1KXsBAOCpyRZC4XwGgVZCIUxsvlkk7taRIqrpkoomVhdZA5IiQxSykgpZAKP6jUHN27f1aB7KWZASxFsMTwIXTJSQBXuXJbyoGjiXJ4cDHmnQ1rkL96ixYp1dkRgXnIQvmE6qsNZBaxbZBm4uK2CQeqZA1D8isHxy84HdqhvVcPFByPurgK2VW3ya7VDEWrAU9kOdEAZDZD";
var graph= require('fbgraph');
graph.setAccessToken(token);
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var dburl = 'mongodb://cloudman:tarajji1919@ds043714.mongolab.com:43714/fb';
var feeds = [];

var nb =0 ;

function getFeeds(url,page,id,count){

graph.get(url, function(err, res) {


   if(!err){
     res.data.forEach(function(item) {
               id.push(item);
            });
     if (res.data.length>0 && count>0) setTimeout(getFeeds(res.paging.next,page,id,count-1),100)
      else {
	MongoClient.connect(dburl, function (err, db) {
              if (err){
                console.log('Erreur de connexion');

              }else{
                var nb=id.length;
                id.forEach(function(item){
                    console.log(item.id,'   ',page,'    ',item.created_time);
                    var ins={feed:item.id,date:item.created_time};
                    db.collection('pub').update({id:item.id},ins,{upsert:true});
                    nb--;
                    if (nb==0)db.close();
              });/// end else;
             };

           })
    };                  
   }
});
};

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
                 	getFeeds(link,doc.id,feeds,100);
                 }
                 nb--;
                 if(nb==0)db.close();
            });
});
//getFeeds("346593403645/feed",346593403645,feeds,500);
