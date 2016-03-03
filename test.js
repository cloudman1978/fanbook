token="CAACEdEose0cBAMMFSHOJzLkgu1ZBhlcXhkoxehSnodXDKDRDYIWcg0Lba7OI1ZCU8LW7b1sgb3ltBxncISTmkm4O39yKUTXAJ8dgUPYCiql1lERogWXGxjCIbw7xZCkEhxqSBa1MLrrQObnSNHCvQbRNZAkC4lY020xsFAl2jpsV0h6EPzLRpA6Nvch0XBg33ZBnZCdXjzuAZDZD";
var graph = require('fbgraph');
graph.setAccessToken(token);
var ids=[];

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


function recuperer(feedID,id,count){
	url=feedID+"/likes";
	var arr = feed.split("_");
    pageID=arr[0];

graph.get(url, function(err, res) {


   if(!err){
    
   //console.log(res.data);

   res.data.forEach(function(item) {
    id.push(item.id);
   });

   //id.push(res.data);

   console.log(id);
   if (res.paging.next && count>0) {
         setTimeout(recuperer(res.paging.next,id,count-1),10000);
      } else {

      	 MongoClient.connect(url, function (err, db) {
            if(err){
                console.log("erreur de connexion à la base de données");
            }else{
      			console.log(id.length)
      			id.forEach(function(item){
      			
             			act.findOne({  page : pageID ,feed : feedID ,id : item  }, function (err, u) {
                        if (err) return handleError(err);
                        if (u) {
                              console.log ('user ' ,  item , ' already commeted  feed ', doc.feed);
 					    	  u.likes=1;
					    	  u.save();
                            }else{
                               var a = new act({page: pageID , feed : doc.feed ,id : item , likes : 1 , cmt : 0} ) ;
						 	   a.save();
                               }
                       });
                 });//end forEach
      			db.close();
      		} 
      	});

      } /// end else


   

}     
});
};
recuperer("346593403645_10154132322828646",ids,20);
