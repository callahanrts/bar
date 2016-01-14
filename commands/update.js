
var fs = require("fs"),
    cp = require('child_process'),
    Promise = require('node-promise').Promise,
    all = require("node-promise").all,
    when = require("node-promise").when,
    strftime = require("strftime"),
    batteryLevel = require('battery-level');

var promises = [];

// Update battery level
promises.push(batteryLevel());

// Check soundcloud file for currenty playing
var updateSoundcloud = function(){
  return fs.readFileSync("bar/playing/soundcloud", "utf-8")
};

// Check youtube file for currently playing
var updateYoutube = function(){
  return fs.readFileSync("bar/playing/youtube", "utf-8")
};

var playing = {
  soundcloud: updateSoundcloud(),
  youtube: updateYoutube(),
  date: strftime("%a %d %b"),
  time: strftime("%l:%M")
};

var p = all(promises)
p.then(function(data){
  playing.battery = data[0] * 100
  console.log(JSON.stringify(playing))
});



//Applications/Übersicht.app/Contents/Resources/localnode
