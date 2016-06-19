var five = require("johnny-five");
var board = new five.Board();
var Raspi = require("raspi-io");

board.on("ready", function() {
  var led = new five.Led(12);
<<<<<<< HEAD

=======
>>>>>>> 0ab4a9daf638e75eb3d2a00160e0ff8e482a7332
  
  var servo = new five.Servo({
   pin: 10, 
   range: [ 0, 180 ],
   startAt: 120
  });
  
  this.repl.inject({
    led: led, 
    servo: servo
  });


  //servo.sweep();
  led.blink();
  
  



});

