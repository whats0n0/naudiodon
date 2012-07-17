'use strict';

var portAudio = require('../');

exports.sine = {
  "play 8 bit, single channel": function (test) {
    var sampleRate = 44100;
    var tableSize = 200;
    var buffer = new Buffer(tableSize);
    for (var i = 0; i < tableSize; i++) {
      buffer[i] = (Math.sin((i / tableSize) * 3.1415 * 2.0) * 127) + 127;
    }

    portAudio.open({
      channelCount: 1,
      sampleFormat: portAudio.SampleFormat8Bit,
      sampleRate: sampleRate
    }, function (err, pa) {
      if (err) {
        return test.fail(err);
      }
      for(var i=0; i<5 * sampleRate / tableSize; i++) {
        pa.write(buffer);
      }
      pa.start();
      setTimeout(function () {
        pa.stop();
        test.done();
      }, 4 * 1000);
    });
  }
};
