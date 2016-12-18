///////////////////////////////////////////////////////////////////////////////
/*User models*/
/*Mongoose driver for MongoDB*/
var mongoose = require('mongoose');
//Instantiate Mongoose Schema
var Schema = mongoose.Schema;
//Define User Schema
//This Schema applies a default Mongoose versioning  '_v:version_no'
var userSchema = new Schema({
    first_name: String,
    last_name: String,
    user_name: String,
    password: String,
    type: String
}, {
    collection: 'blobber_user'
});
//Export module
module.exports = mongoose.model('User', userSchema);
