token="CAAVLI8Q1KXsBAG9nBBBDkiYZAEMaXKSrWhJFGJMQiPNUPLZBanZA12BZCu0ZCVHlMGBv964erBfzCZCaSFGTkZAIuOxEM8nr3bv5NN5LBNZCuaGulgZCF96vC7zwDrovuDosn2M5Hfi3BN0VdeiBKRdNVoMj6sXpsfxKd2f9YG65cOSojgDhdzY0dazh7cP3k2u2ioj33bSegFKP5ZAEqV9p8T";
var graph = require('fbgraph');
graph.setAccessToken(token);
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://cloudman:tarajji1919@ds043714.mongolab.com:43714/fb';
var feeds;
var ids=[];




var mongoose = require('mongoose');
mongoose.connect('mongodb://cloudman:tarajji1919@ds043714.mongolab.com:43714/fb');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

var ActivitySchema = mongoose.Schema({
    page: String,
    feed: String,
    id: String,
    likes : Number,
    cmt : Number
});

ActivitySchema.methods.addlike = function () {
if(this.likes==0)this.likes=1;
console.log(this.count);
}
var act = mongoose.model('act', ActivitySchema);
        MongoClient.connect(url, function (err, db) {
	    //	setTimeout(function(){db.close()},6000);
            if(err){
                console.log("erreur de connexion à la base de données");
            }else{
                var cursor = db.collection('feeds').find({})
		        cursor.each(function(err, doc){
                          if (doc){
         	            //console.log(doc.feed);
                      var arr = doc.feed.split("_");
                      //arr = arr.map(function (val) { return +val + 1; });
                      pageID=arr[0];
                            graph.get("/"+doc.feed+"/likes?limit=100", function(err, res) {
                          //  console.log("--------------------------------------");
                            console.log(res);
                            if(res)res.data.forEach(function(entry) {
                                 //console.log(entry.id);
/*
                                 var a1 = new act({ page : pageID ,feed : doc.feed ,id : entry.id ,likes : 1, cmt : 0});
                                 act.findOne({  page : pageID ,feed : doc.feed ,id : entry.id  }, 'name occupation', function (err, act) {
                                         if (err) return handleError(err);
                                          // console.log('%s %s is a %s.', person.name.first, person.name.last, person.occupation) // Space Ghost is a talk show host.
                                             if (!act) a1.save(function (err, fluffy) {
                                               if (err) return console.error(err);
                                           });
                                        })*/
                              
                                });
                           });         
                           }
                         });
                       };
});
     
