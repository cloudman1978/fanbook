var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});



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

var a1 = new act({ page : '346593403645' ,feed : '346593403645_10154041342633646',id : '1501588680146657',likes : 0, cmt : 0});



a1.save(function (err, fluffy) {
  if (err) return console.error(err);
  
});
