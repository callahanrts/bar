
# Bar

Bar is an  [Übersicht](https://github.com/felixhageloh/uebersicht) widget
that places a customizable bar on your desktop.


## Elements

- Currently playing music from
  - Soundcloud
- Battery
- Date/Time


## Installation

Download (or clone) this repository and place the folder in your Übersicht widgets directory.


## Configuration

Open [index.jsx](https://github.com/callahanrts/bar/blob/master/index.coffee)
and edit as you'd like. Some of the objects toward the top should make
customization a little easier.

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

## Questions?

If you find a bug or have any questions about Bar, [submit an issue](https://github.com/callahanrts/bar/issues/new).


## Screenshots
![Spotify](./screenshots/1.png)

