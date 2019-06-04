var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Chat:Chat@cluster0-ogzht.mongodb.net/Node-chat?retryWrites=true&w=majority',{useNewUrlParser:true});
var Schema = mongoose.Schema;
var MessageSchema = new Schema({
name:String,
message:String
});
var MessageModel = mongoose.model('Messages',MessageSchema);
module.exports = MessageModel;
