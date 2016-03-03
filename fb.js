token="CAACEdEose0cBAFQ6J997TZARsU8Wa5ZAtjWqbhLd3SOf4h1LHl3O6ZAhLivL9BEtxIKqGwfn8TnYO8fB5MdZCpUKl99yjm9oSBCZAZC5k3HZA7yz0HRvg33Y7cBW7reKyIkRmWRwBwqEFFD53d2qJpBzfeB1jSq3oZBJD3aw9lvYZAEfHovAUt65yN6ZATBFKmjOoWEWFZAn2YZBqwZDZD";
var graph = require('fbgraph');
graph.setAccessToken(token);
var mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;

var url = 'mongodb://localhost:27017/fb';

//var Feed = mongoose.model('Feed', {feed: String,  date: Date});

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
                for (var i in feeds){
                    //console.log(feeds[i].id);    
                    //ids.push(feeds[i].id);
                    var feedins = {feed:feeds[i].id , date:feeds[i].created_time};
                    
	db.collection('feeds').update({ id :feeds[i].id},feedins , {w:1}, function(err) {
if(err)
    throw err;
    console.log('entry updated');
});
                   /* db.collection('feeds').find({  feed:feeds[i].id  }).toArray(function (err, result) {
                        if (err) {
                            console.log(err);
                        } else if (result.length) {
                            console.log('Found:', feeds[i].id );
                        } else {
                            console.log('No document(s) found with defined "find" criteria!');
                            db.collection('feeds').insert(feedins, function (err, result) {
                                if (err) {
                                    console.log("erreor in insertion",err);
                                } else {
                                    console.log('Inserted  documents into the "users" collection');
                                }
                                
                            });
                            
                        }                    
                        
                        
                    });*/
            };
           
        }
                
        });
     
    }
});
/*  Feed.findOne({name: feeds[i].id}, function (err, userObj) {
 *         if (err) {
 *          console.log(err);
 *       } else if (userObj) {
 *         //  console.log('Found:', userObj);
 * 
 *           //For demo purposes lets update the user on condition.
 *        //   if (userObj.age != 30) {
 *      //Some demo manipulation
 *      userObj.age += 30;
 * 
 *      //Lets save it
 *      userObj.save(function (err) {
 *        if (err) {
 *          console.log(err);
 *        } else {
 *          console.log('Updated', userObj);
 *        }
 *      });
 *           
 *    }else {
 *      
 *    //  var Feed = new Feed ( feeds[i].id,feeds[i].created_time);
 *        //var Feed = new Feed ( {feed:feeds[i].id,date:feeds[i].created_time});
 *      console.log('to add',feeds[i].id, '   ',feeds[i].created_time);
 *      //Feed.save();
 *       
 *  }
 * });*/

/*   
 *    console.log(ids);
 * //   var graph2 = require('fbgraph');
 *   // graph2.setAccessToken(token);
 *    for (j=0;j<ids.length;j++){
 *         graph.get("/"+ids[j]+"/likes",function(err, res) {
 *                  likes= res['data'];
 *                 for (var i in likes){
 *                   console.log(likes[i].id);                     
 *                }
 *         });
 *    }
 */    
