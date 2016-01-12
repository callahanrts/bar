
var sonos = require('sonos');

// sonos.search - searches for Sonos devices on network

sonos.search(function(device) {
  // device is an instance of sonos.Sonos
  device.currentTrack(console.log);
});

// var s = new sonos.Sonos(host, [port]);
var s = new sonos.Sonos('192.168.2.17')
s.currentTrack(console.log);

// sonos.Services - wrappers arounds all UPNP services provided by sonsos
// These aren't used internally by the module at all but may be useful
// for more complex projects.
