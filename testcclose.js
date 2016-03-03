token="CAAVLI8Q1KXsBAG9nBBBDkiYZAEMaXKSrWhJFGJMQiPNUPLZBanZA12BZCu0ZCVHlMGBv964erBfzCZCaSFGTkZAIuOxEM8nr3bv5NN5LBNZCuaGulgZCF96vC7zwDrovuDosn2M5Hfi3BN0VdeiBKRdNVoMj6sXpsfxKd2f9YG65cOSojgDhdzY0dazh7cP3k2u2ioj33bSegFKP5ZAEqV9p8T";
var graph = require('fbgraph');
graph.setAccessToken(token);
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/fb';
var feeds;
var ids=[];

graph.get("/346593403645/feed?limit=100", function(err, res) {
    if (err){
        console.log("probleme de connexion");
    }else{
        feeds=res['data'];
        MongoClient.connect(url, function (err, db) {
            if(err){
                console.log("erreur de connexion à la base de données");
            }else{
                var collection = db.collection('feeds');
                var n=collection.length;
                var j=0;
                for (var i in feeds){
                    var feedins = {feed:feeds[i].id , date:feeds[i].created_time};
                    db.collection('feeds').update({feed:feeds[i].id},feedins,{ upsert: true });
                    j=j+1;
                    console.log(feeds.length , '    ', j);
                    if (j==100) db.close();
            };
}
});
        }       
        });
     
