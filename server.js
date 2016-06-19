var express = require('express');
var logger = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var raspi = require("raspi-io");
var five = require("johnny-five"),
  board,servo;

app.disable('x-powered-by');

app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', "http://"+req.headers.host+':8000');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        next();
    }
);

// app setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// views setup
app.use("/", express.static(__dirname + "/public"));

// catch all routes
app.get('/*', function(req, res){
  console.log("HIT!")
  res.sendFile(process.cwd() + '/public/views/index.html')
})


app.listen(3000, function(){
    console.log('Server running on port 3000');
});

board = new five.Board();

board.on("ready", function() {

  servo = new five.Servo(10);

  board.repl.inject({
    servo: servo
  });

  var oldAng = 90;
  
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


module.exports = app;
