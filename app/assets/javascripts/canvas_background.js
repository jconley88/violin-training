var background;
$(function(){
  background = function(){
    var canvas, context;
    canvas = $('.tuner canvas#background')[0];
    canvas.height = 800;
    canvas.width = $('body').width();
    context = canvas.getContext('2d');

    function draw(){
      var rightBorderX = leftBorderX = 30;
      var bottomStaveY = 150;
      var staveDy = 20;
      var nextStaveY = bottomStaveY;

      context.beginPath();
      context.moveTo(leftBorderX, bottomStaveY);
      context.lineTo(canvas.width - rightBorderX, bottomStaveY);
      context.stroke();

      nextStaveY -= staveDy;
      context.beginPath();
      context.moveTo(leftBorderX, nextStaveY);
      context.lineTo(canvas.width - rightBorderX, nextStaveY);
      context.stroke();

      nextStaveY -= staveDy;
      context.beginPath();
      context.moveTo(leftBorderX, nextStaveY);
      context.lineTo(canvas.width - rightBorderX, nextStaveY);
      context.stroke();

      nextStaveY -= staveDy;
      context.beginPath();
      context.moveTo(leftBorderX, nextStaveY);
      context.lineTo(canvas.width - rightBorderX, nextStaveY);
      context.stroke();

      nextStaveY -= staveDy;
      context.beginPath();
      context.moveTo(leftBorderX, nextStaveY);
      context.lineTo(canvas.width - rightBorderX, nextStaveY);
      context.stroke();

      context.beginPath();
      context.moveTo(leftBorderX, bottomStaveY);
      context.lineTo(leftBorderX, nextStaveY);
      context.stroke();

      var imageObj = new Image();

      imageObj.onload = function() {
        context.drawImage(imageObj, 40, 38, imageObj.width * 0.25, imageObj.height * 0.25);
      };
      imageObj.src = '/assets/treble_clef.png';
    }
    return {
      draw: draw
    }
  }();
});