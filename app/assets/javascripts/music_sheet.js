var display = {
  draw: function(freq, note, diff) {
    var displayDiv, displayStr;
    displayDiv = $('.tuner div');
    displayDiv.removeClass();
    displayDiv.addClass((Math.abs(diff) < 0.25 ? 'inTune' : 'outTune'));
    // note = note.replace(/[0-9]*/g, '');
    if (Math.abs(diff) < 0.25) {
      if (note.length === 2) {
        displayStr = "<&nbsp;&nbsp;" + note + " " + freq.toFixed(0) + "&nbsp;>";
      } else {
        displayStr = "<&nbsp;&nbsp;" + note + " " + freq.toFixed(0) + "&nbsp;&nbsp;>";
      }
    } else {
      if (note.length === 2) {
        displayStr = '';
        displayStr += diff > 0.25 ? '<&nbsp;&nbsp;' : '&nbsp;&nbsp;&nbsp;';
        displayStr += note +" " + freq.toFixed(0);
        displayStr += diff < -0.25 ? '&nbsp;>' : '&nbsp;&nbsp;';
      } else {
        displayStr = '';
        displayStr += diff > 0.25 ? '<&nbsp;&nbsp;' : '&nbsp;&nbsp;&nbsp;';
        displayStr += note + " " + freq.toFixed(0);
        displayStr += diff < -0.25 ? '&nbsp;&nbsp;>' : '&nbsp;&nbsp;&nbsp;';
      }
    }
    return displayDiv.html(displayStr);
  },
  clear: function() {
    var displayDiv;
    displayDiv = $('.tuner div');
    displayDiv.removeClass();
    return displayDiv.html('--');
  }
};

yNote = {
    'G3': 200,
    'G#3': 200,
    'A3': 190,
    'A#3': 190,
    'B3': 180,
    'C4': 170,
    'C#4': 170,
    'D4': 160,
    'D#4': 160,
    'E4': 150,
    'F4': 140,
    'F#4': 140,
    'G4': 130,
    'G#4': 130,
    'A4': 120,
    'A#4': 120,
    'B4': 110,
    'C5': 100,
    'C#5': 100,
    'D5': 90,
    'D#5': 90,
    'E5': 80,
    'F5': 70,
    'F#5': 70,
    'G5': 60,
    'G#5': 60,
    'A5': 50,
    'A#5': 50,
    'B5': 40
  };

var xNote = leftNoteBorderX = 125;
record = function(freq, note, diff){
  canvas = $('.tuner canvas')[0];
  context = canvas.getContext('2d');

  radius = 7;
  minFreq =185;
  maxFreq = 2000;
  freqRange = maxFreq - minFreq;
//  y = canvas.height - ((freq - minFreq) / (maxFreq - minFreq)) * canvas.height
  y = yNote[note];
  if(freq <= 185 || freq >= 2000){
    //Do nothing
  } else {
    context.beginPath();
    context.arc(xNote, y, radius, 0 , 2 * Math.PI, false);
    context.fillStyle = 'lightGreen';
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = '#003300';
    context.stroke();
    xNote += 1;
  }
};

function updatePage(freq, note, diff){
  if(note){
    display.draw(freq, note, diff);
    record(freq, note, diff);
  }
}
$(function(){
  Tuner(updatePage);
  canvas = $('.tuner canvas')[0];
  canvas.height = $('body').height();
  canvas.width = $('body').width();
  drawSheet();
  context = canvas.getContext('2d');
  $('button#clear').click(function(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawSheet();
    xNote = leftNoteBorderX;
  });
});

drawSheet = function(){
  var rightBorderX = leftBorderX = 30;
  var bottomStaveY = 150;
  var staveDy = 20;
  var nextStaveY = bottomStaveY;

  canvas = $('.tuner canvas')[0];
  context = canvas.getContext('2d');
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