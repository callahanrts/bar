
var sonos = require('sonos');

// sonos.search - searches for Sonos devices on network
setTimeout(function(){
  console.log("");
  process.exit();
}, 900)

sonos.search(function(device) {
  // device is an instance of sonos.Sonos
  device.currentTrack(function(err, track){
    playing = track.artist + ' - ' + track.title;
    if(!!track.title){
      console.log(playing);
      process.exit();
    }
  });
});

