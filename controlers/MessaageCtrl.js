var ChatDb = require('./CahtDb');
var UserOnline = require('./UserOnlineDb');
class Message {
    push(obj) {
        return new Promise((resolve, reject) => {
            var chat = new ChatDb(obj);
            chat.save(() => {
                resolve('saved');
            })
        })

    }
    getOld(userName) {
  
        return new Promise((resolve, reject) => {
            ChatDb.find({}, (err, messages) => {
            
                messages.forEach((item) => {
                    if (item.name == userName) {
                        item.name = "Я";
                        item.you = true;
                    
                    }
                    else{
                        item.you = false;
                    }
        

                });
                resolve(messages);
            });
        })

    }
    addUser(username){
var user = new UserOnline({
    name:username
});
console.log('12wwsd');
user.save(()=>{
    return 'complete';
})
    }
    getOnlineUser(){
        return new Promise((resolve,reject) =>{
            UserOnline.find({},(err,result) =>{
                resolve(result);
            })
        })
    }

}
module.exports = Message;