var notes = function(){
  var _samples = [];
  function addSample(freq, note, diff, fft){
    var spectrum;
    if (fft) {
      var spectrum = new Float32Array(fft.spectrum.subarray(0));
    }
    _samples.push({freq: freq, note: note, diff: diff, spectrum: spectrum});
  }

  function clear(){
    _samples = [];
  }

  function samples(){
    return _samples;
  }

  return {
    addSample: addSample,
    samples: samples,
    clear: clear
  }
}();

$(function(){
  var canvas = $('canvas#foreground');
  canvas.on('click', function(e) {
    var mouse = {
      x: e.offsetX,
      y: e.offsetY
    };
    sample = foreground.sampleAt(mouse.x);
    if(sample){
      frequency.draw(sample.spectrum)
    }
  });
  Tuner(updatePage);
  background.draw();
  $('button#clear').click(function(){
    foreground.clear();
    notes.clear();
  });
  $('button#stop').click(function(){
    clearInterval(setIntervalId);
    frequency.clear();
  });
  test();
});

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

function updatePage(freq, note, diff, fft){
  if(fft){
    frequency.draw(fft);
  }
  if(note){
    notes.addSample(freq, note, diff, fft);
    display.draw(freq, note, diff);
    foreground.displaySamples(notes.samples());
  }
}

function test(){
  updatePage(420, "A4", 420 - frequencies["A4"]);
  updatePage(430, "A4", 430 - frequencies["A4"]);
  updatePage(440, "A4", 440 - frequencies["A4"]);
  updatePage(440, "A4", 440 - frequencies["A4"]);
  updatePage(440, "A4", 440 - frequencies["A4"]);
  updatePage(440, "A4", 440 - frequencies["A4"]);
  updatePage(440, "A4", 440 - frequencies["A4"]);
  updatePage(440, "A4", 440 - frequencies["A4"]);
  updatePage(440, "A4", 440 - frequencies["A4"]);
  updatePage(440, "A4", 440 - frequencies["A4"]);
  updatePage(440, "A4", 440 - frequencies["A4"]);
  updatePage(440, "A4", 440 - frequencies["A4"]);
  updatePage(450, "A4", 450 - frequencies["A4"]);
  updatePage(460, "A4", 460 - frequencies["A4"]);

  updatePage(500, "B4", 500 - frequencies["B4"]);
  updatePage(500, "B4", 500 - frequencies["B4"]);

  updatePage(440, "A4", 440 - frequencies["A4"]);
  updatePage(440, "A4", 440 - frequencies["A4"]);
  updatePage(440, "A4", 440 - frequencies["A4"]);
}

