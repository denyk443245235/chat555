var express = require('express');
var onlineuser = require('./controlers/UserOnlineDb');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser')
var app = express();
var countUser = 0;
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))

app.use(bodyParser.urlencoded({ extended: true }))


app.use(express.static(__dirname + '/resourses'));
function CheckUser(req, res, next) {
  console.log(req.session);
  if (req.session.userName)
    res.redirect('/Chat/getChat');
  else {
    next();
  }

}

app.get('/', CheckUser, (req, res) => {
  res.render('index.hbs');
});

var ChatRout = require('./routs/RoutChat');
app.use('/Chat', ChatRout);
var server = app.listen(process.env.PORT || 8080, () => {
  console.log('work');
});
var io = require('socket.io')(server);

io.on('connection', (socet) => {
  socet.on('disconnect', function () {
    




    countUser--;
    socet.emit('users_count', countUser);
    socet.broadcast.emit('users_count', countUser);
  });

  socet.on('sendName', (name) => {

    socet.emit('getName', name);
    socet.broadcast.emit('getName', name);
  });

  countUser++;
  socet.emit('users_count', countUser);
  socet.broadcast.emit('users_count', countUser);
  socet.on('get_message', (message) => {

    socet.broadcast.emit('send_message', message);
  });

});

