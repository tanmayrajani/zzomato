var mongoose = require ("mongoose"); // The reason for this demo.

var uristring ='mongodb://mansipattani:mansi6994@ds037395.mongolab.com:37395/zomatoclone';

mongoose.connect(uristring);


mongoose.createConnection(uristring, function (err, res) {
    if (err) {
        console.log ('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
        console.log ('Succeeded connected to: ' + uristring);
    }
});
module.exports=mongoose;
