token="CAAVLI8Q1KXsBAG9nBBBDkiYZAEMaXKSrWhJFGJMQiPNUPLZBanZA12BZCu0ZCVHlMGBv964erBfzCZCaSFGTkZAIuOxEM8nr3bv5NN5LBNZCuaGulgZCF96vC7zwDrovuDosn2M5Hfi3BN0VdeiBKRdNVoMj6sXpsfxKd2f9YG65cOSojgDhdzY0dazh7cP3k2u2ioj33bSegFKP5ZAEqV9p8T";
var graph = require('fbgraph');
graph.setAccessToken(token);
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://cloudman:tarajji1919@ds043714.mongolab.com:43714/fb';
var feeds;
var ids=[];

MongoClient.connect(url, function (err, db) {

        setTimeout(function(){db.close()},8000);

            if(err){
                console.log("erreur de connexion à la base de données");
            }else{

               var cursor = db.collection('pages').find({})
               cursor.each(function(err, doc){
                 if (doc){
                    graph.get("/"+doc.id+"/feed?limit=100", function(err, res) {
                    if (err){
                        console.log("probleme de connexion");
                    }else{
                        feeds=res['data'];
                        var collection = db.collection('feeds');
                        for (var i in feeds){
                            var feedins = {feed:feeds[i].id , date:feeds[i].created_time};
                            db.collection('feeds').update({feed:feeds[i].id},feedins,{ upsert: true });
                        };
                    }
                });
            }       
        });
     
    }
});