var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var mySchema = new Schema({
    userId: {type:Schema.Types.ObjectId,required:true},
    galleries:{type:String},
    description:{type:String},

});

module.exports = 
 Mongoose.model('galleries', mySchema);