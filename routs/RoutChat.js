var rout = require('express').Router();


var Ctrl = require('../controlers/MessaageCtrl');
var objCtrl = new Ctrl();
rout.get('/getChat', (req, res) => {

    objCtrl.getOld(req.session.userName).then((messages) => {

        res.render('chat.hbs', { mas: messages });

    })

});
rout.post('/setName', (req, res) => {
    var name = req.body.name;
    objCtrl.addUser(name);
    req.session.userName = name;
    res.redirect('/Chat/getChat');
})
rout.post('/getName', (req, res) => {
    console.log(req.session);
    res.send(req.session.userName);
});
rout.post('/WriteMessages', (req, res) => {
    objCtrl.push(req.body).then((result) => {
        res.send(result);
    });

})

module.exports = rout;