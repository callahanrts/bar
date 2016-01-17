
var fs = require("fs"),
    cp = require('child_process'),
    Promise = require('node-promise').Promise,
    all = require("node-promise").all,
    strftime = require("strftime"),
    batteryLevel = require('battery-level'),
    spotify = require('spotify-node-applescript');

var getActiveWindow = function(){
  var awPromise = new Promise();
  var script = "osascript -e 'tell application \"System Events\"' -e 'set frontApp to name of first application process whose frontmost is true' -e 'end tell'"
  cp.exec(script, function(err, stdout, stderr){
    awPromise.resolve(stdout.replace("\n", ""));
  });
  return awPromise;
};

// Check soundcloud file for currenty playing
var browserPlaying = function(){
  stat = fs.statSync("bar/playing/browser");
  lastModified = new Date(stat.mtime);
  data = fs.readFileSync("bar/playing/browser", "utf-8");

  if(!!data && new Date().getTime() - lastModified.getTime() < 5000){
    data = JSON.parse(data)
  }

  return data;
};

var spotifyPlaying = function(){
  var promise = new Promise();
  var state = {
    track: "",
    playing: false,
    source: "spotify"
  };

  spotify.getState(function(err, s){
    if (!err && !!s){
      state.playing = s.state == "playing";
      if(state.playing){
        spotify.getTrack(function(err, track){
          if(!err && !!track && state.playing){
            state.track = track.artist + ' - ' + track.name;
          }
          promise.resolve(state);
        });
      } else {
        promise.resolve(state);
      }
    } else {
      promise.resolve(state);
    }
  });

  return promise;
};

var playing = {
  browser: browserPlaying(),
  date: strftime("%a %d %b"),
  time: strftime("%l:%M"),
  active: getActiveWindow()
};

var promises = [
  // Update battery level
  batteryLevel(),
  spotifyPlaying(),
  getActiveWindow(),
];

var p = all(promises)
p.then(function(data){
  playing.battery = data[0] * 100;
  playing.spotify = data[1];
  playing.active = data[2];
  console.log(JSON.stringify(playing));
});

