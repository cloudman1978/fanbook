token="CAAMA8W0rkwsBAB8fC72JtKNfkxqJsekERbBAblFVrZBg0Fx8Q7E2ThL1msXQYRl7qG8yv8UVpUVZAuFpuUV9t1td9T2HuCNBZAxZCGoZBqnoANL7FCAdQkpwvBsS49ZCi6Neile7tvZAxOsZAztrZB36qQVKS7FeWsTHadYqsELZBUZAkhOsTBVCocezEAGPhv9xgUZD&expires=5183999";
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
		setTimeout(function(){db.close()},4000);
            if(err){
                console.log("erreur de connexion à la base de données");
            }else{
                var collection = db.collection('feeds');
                for (var i in feeds){
                    var feedins = {feed:feeds[i].id , date:feeds[i].created_time};
                    db.collection('feeds').update({feed:feeds[i].id},feedins,{ upsert: true });
            };
}
});
        }       
        });
     
