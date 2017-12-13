var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
galleries = [];

var mySchema = new Schema({
    userId: {type:Schema.Types.ObjectId,required:true},
    description:{type:String},
    galleries:{type:String, enum:galleries},

});

module.exports = 
 Mongoose.model('galleries', mySchema);