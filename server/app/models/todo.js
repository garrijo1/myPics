var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
priorities = ['Low', 'Medium','High','Critical'];

var mySchema = new Schema({
    userId: {type:Schema.Types.ObjectId,required:true},
    todo:{type:String, required: true},
    description:{type:String},
    priority:{type:String, enum:priorities},
    dateCreated:{type:Date, default:Date.now},
    dateDue:{type:Date,default:Date.now},
    completed: {type:Boolean, default:false},
    file: {fileName: String, originalName: String, dateUploaded: Date }
});

module.exports = 
 Mongoose.model('todo', mySchema);
