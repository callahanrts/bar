
# Bar

Bar is an [Übersicht](https://github.com/felixhageloh/uebersicht) widget that shows some useful information in an elegant way.


## Modules

- Active application
- Currently playing music from
  - Soundcloud
  - Spotify
  - Youtube
- Battery
- Date
- Time


## Installation

Download (or clone) this repository and place the folder in your Übersicht widgets directory.


## Configuration

Open [index.coffee](https://github.com/callahanrts/bar/blob/master/index.coffee) and edit the
variables in the customization section. Changes will take effect on save.

## Space configuration
It's possible to get chunkwm to update when spaces are switched. You can
use the following in your `~/.khdrc`.
```
cmd - 1 : khd -p "cmd + alt - 1" && uberrefresh
...
```
`uberrefresh` is a shell script included in this repository. Copy it to
`/usr/local/bin`
```
cp bin/uberrefresh /usr/local/bin/uberrefresh
```


## Current Track

Though spotify will work by default, you will need to
Install the <a href="https://chrome.google.com/webstore/detail/current-track/idajgbpajjfifghfogpladkjkakafegj" target="_blank">Current Track</a> ([source](https://github.com/callahanrts/current-track))
Chrome extension to display current tracks from Youtube and Soundcloud.


## Questions?

If you find a bug or have any questions about Bar, [submit an issue](https://github.com/callahanrts/bar/issues/new).


## Screenshots
![Soundcloud](http://i.imgur.com/ENprGEy.png)
![Spotify](http://i.imgur.com/HGJj6iR.png)
![Youtube](http://i.imgur.com/5dqSypY.png)

