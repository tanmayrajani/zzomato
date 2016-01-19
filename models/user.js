var mongoose = require('../config/dbConfig');
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
    local            : {
        email        : String,
        password     : String,
    },
    facebook         : {
        id           : String,
        name         : String,
        picture      : {  data: {is_silhouette:Boolean,
                                    url:String}
                            },
        gender      : String
    },

    google           : {
        id           : String,
        photoUrl     : String,
        email        : String,
        name         : String
    }

});
module.exports = mongoose.model('User', userSchema);