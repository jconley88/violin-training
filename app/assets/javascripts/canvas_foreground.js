var foreground;
$(function(){
  foreground = function(){
    var lastNote, nextX, START_POSITION_X, canvas, context,
      currentPositionX = START_POSITION_X = 125,
      lengthOfCurrentNote = 1,
      firstNote = true,
      GAP_BETWEEN_NOTES = 3,
      NOTE_RADIUS = 7,
      MIN_FREQ = 185,
      MAX_FREQ = 2000,
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

    canvas = $('.tuner canvas#foreground')[0];
    canvas.height = 800;
    canvas.width = $('body').width();
    context = canvas.getContext('2d');

    function clear(){
      context.clearRect(0, 0, canvas.width, canvas.height);
      currentPositionX = START_POSITION_X;
      firstNote = true;
      lastNote = "";
      lengthOfCurrentNote = 0;
    }

    function process(freq, note, diff){
      var y = yNote[note];
      if(freq <= MIN_FREQ || freq >= MAX_FREQ){
        //Do nothing
      } else {
        var percentDiff = 0;
        if(diff > 0){
          percentDiff = diff / ( getNextFrequency(note) - frequencies[note] );
        } else {
          percentDiff = diff / ( frequencies[note] - getPrevFrequency(note) );
        }
        if(lastNote === note){
          lengthOfCurrentNote += 1;
          if(lengthOfCurrentNote == 3){
            if(firstNote) {
              firstNote = false;
            } else {
              currentPositionX = nextX || currentPositionX;
            }
            recordNoteBeginning(y);
          }
          if(lengthOfCurrentNote >= 3){
            nextX = currentPositionX + (NOTE_RADIUS * 2) + GAP_BETWEEN_NOTES + lengthOfCurrentNote;
            recordLongNote(y, lengthOfCurrentNote - 1, percentDiff);
          }
        } else {
          lengthOfCurrentNote = 1;
        }
      }
      lastNote = note;
    }

    function recordNoteBeginning(y){
      context.beginPath();
      context.arc(currentPositionX, y, NOTE_RADIUS, 0 , 2 * Math.PI, false);
      context.lineWidth = 2;
      context.strokeStyle = '#003300';
      context.stroke();
    }

    function recordLongNote(y, leafletLength, percentDiff){
      if(leafletLength > 0){
        fillBeginningOfNote(y, percentDiff);
        context.rect(currentPositionX, y - NOTE_RADIUS, leafletLength, NOTE_RADIUS * 2);
        fillNote(y, context, percentDiff);
      }

      context.beginPath();
      context.lineWidth = 2;
      context.moveTo(currentPositionX, y - NOTE_RADIUS);
      context.lineTo(currentPositionX + leafletLength, y - NOTE_RADIUS);
      context.moveTo(currentPositionX, y + NOTE_RADIUS);
      context.lineTo(currentPositionX + leafletLength, y + NOTE_RADIUS);
      context.stroke();
      recordEndOfNote(leafletLength, y, percentDiff);
    }

    function recordEndOfNote(leafletLength, y, percentDiff){
      context.beginPath();
      context.arc(currentPositionX + leafletLength, y, NOTE_RADIUS, - Math.PI / 2, Math.PI / 2, false);
      fillNote(y, context, percentDiff);
      context.lineWidth = 2;
      context.strokeStyle = '#003300';
      context.stroke();
    }

    function fillBeginningOfNote(y, percentDiff){
      context.beginPath();
      context.arc(currentPositionX, y, NOTE_RADIUS - 1.4, - Math.PI / 2, Math.PI / 2, true);
      fillNote(y, context, percentDiff);
    }

    function fillNote(y, context, percentDiff){
      var fillStyle;
      if(Math.abs(percentDiff) <= 0.10){
        fillStyle = 'lightGreen';
      } else if(percentDiff < -0.10){
        fillStyle = context.createLinearGradient(currentPositionX, y, currentPositionX, y + NOTE_RADIUS);
        fillStyle.addColorStop(0, 'white');
        if ( percentDiff > -0.25 ) {
          fillStyle.addColorStop(1, 'green');
        } else {
          fillStyle.addColorStop(1, 'red');
        }
      } else if(percentDiff > 0.10){
        fillStyle = context.createLinearGradient(currentPositionX, y, currentPositionX, y - NOTE_RADIUS);
        fillStyle.addColorStop(0, 'white');
        if ( percentDiff < 0.25 ) {
          fillStyle.addColorStop(1, 'green');
        } else {
          fillStyle.addColorStop(1, 'red');
        }
      }
      context.fillStyle = fillStyle;
      context.fill();
    }

    return {
      process: process,
      clear: clear
    }
  }();
});