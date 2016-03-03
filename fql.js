
var fql = require('fql');

fql.query('SELECT uid, name FROM user WHERE uid = 1060497839', function(err, data) {
    if (err) {
        throw err;
    }
    console.log(data); // [ { name: 'Facebook Platform', fan_count: 4549532 } ]
});
