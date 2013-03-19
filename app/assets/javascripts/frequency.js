var frequency;
$(function(){
  frequency = function(){
    var canvas, context;
    canvas = $('.tuner canvas#frequency')[0];
    canvas.height = 250;
    canvas.width = $('body').width();
    context = canvas.getContext('2d');

    function draw(spectrum){
      context.clearRect(0, 0, canvas.width, canvas.height);
      var f, freqWidth, _j, _ref1, _results;
      context.fillStyle = '#F77';
      freqWidth = (canvas.width - 100) / (spectrum.length / 4);
      _results = [];
      for (f = _j = 10, _ref1 = (spectrum.length / 4) - 10; 10 <= _ref1 ? _j < _ref1 : _j > _ref1; f = 10 <= _ref1 ? ++_j : --_j) {
        _results.push(context.fillRect(freqWidth * f, canvas.height / 2, freqWidth, -Math.pow(1e4 * spectrum[f], 2)));
      }
      return _results;
    }

    function clear(){
      context.clearRect(0,0, canvas.width, canvas.height);
    }

    return {
      draw: draw,
      clear: clear
    }
  }();
});