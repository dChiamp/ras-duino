var express = require('express');
var logger = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
// var Raspi = require("raspi-io");
var five = require("johnny-five"),
  board,servo,led,sensor;

// app setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// views setup
// app.set('public', path.join(__dirname, '/public'));
// app.set('views', path.join(__dirname, '/public/views'));
app.use("/", express.static(__dirname + "/public"));


board = new five.Board();

board.on("ready", function() {

  servo = new five.Servo(10);

  board.repl.inject({
    servo: servo
  });

  
  servo.sweep();

  this.wait(5000, function(){
    servo.stop();
    servo.to(oldAng);
  servo.stop();
  });

  
  io.on('connection', function (socket) {
  
    socket.on("changeAngle",function(ang, control){
    deltAng = oldAng - ang;
    oldAng = ang;
    servo.step(deltAng);
        console.log(oldAng, control);
    });

  });
  

});



// catch all routes
app.get('/*', function(req, res){
  console.log("HIT!")
  res.sendFile(process.cwd() + '/public/views/index.html')
})


app.listen(3000, function(){
    console.log('Server running on port 3000');
});

module.exports = app;