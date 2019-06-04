var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Chat:Chat@cluster0-ogzht.mongodb.net/Node-chat?retryWrites=true&w=majority',{useNewUrlParser:true});
var Schema = mongoose.Schema;
var MessageSchema = new Schema({
name:String,

});
var MessageModel = mongoose.model('User-Online',MessageSchema);
module.exports = MessageModel;
