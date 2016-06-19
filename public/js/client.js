
//var socket = io.connect('http://localhost:3000');
var socket = io("http://"+document.location.hostname+":3000"),notif,control;
var $angle_txt = $('#angle_txt'),$angle_slider = $('#angle_slider').on('change mousemove', function() {
    var ang = $angle_slider.val()
    control = "mouse"
    socket.emit('changeAngle', ang, control)
    socket.on('returnAng',function(ang){
        console.log(ang);
      });
        $angle_txt.val($angle_slider.val());
    });

var $angle_txt = $('#angle_txt'),$angle_slider = $('#angle_slider').keydown('change', function(e) {
  if(e.keyCode == 37 || e.keyCode == 39) {
    if(e.keyCode == 37){control = "left"};
    if(e.keyCode == 39){control = "right"};
    var ang = $angle_slider.val();
    socket.emit('changeAngle', ang, control);
    socket.on('returnAng',function(ang){
        console.log(ang);
      });
  }
        $angle_txt.val($angle_slider.val());
    });
