///////////////////////////////////////////////////////////////////////////////
/*Image models*/
/*Mongoose driver for MongoDB*/
var mongoose = require('mongoose');
//Instantiate Mongoose Schema
var Schema = mongoose.Schema;
//Define User Schema
//This Schema applies a default Mongoose versioning  '_v:version_no'
var imageSchema = new Schema({
    image_id: String,
    image_name: String,
    image_type: String,
}, {
    collection: 'blobber_image'
});
//Export module
module.exports = mongoose.model('Image', imageSchema);
