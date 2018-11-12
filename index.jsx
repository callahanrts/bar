// Update every second for the clock. Expensive elements should
// throttle themselves
export const refreshFrequency = 5000 // ms

import { theme } from './lib/style.js';
import {
  Battery,
  Cpu,
  Time,
  Workspaces,
  Playing
} from './elements/index.jsx'

const config = {
  time: {
    format: "%l:%M",
    style: {
      padding: '0 15px',
      backgroundColor: theme.backgroundLight,
    }
  },
  battery: {
    style: {}
  },
  workspaces: {
    style: {}
  },
  cpu: {
    style: {}
  },
  playing: {
    style: {}
  }
}

const barStyle = {
  top: 0,
  right: 0,
  left: 0,
  position: 'fixed',
  background: theme.background,
  overflow: 'hidden',
  color: theme.text,
  height: '25px',
  fontFamily: 'Helvetica',
  fontSize: '.9rem',
  boxShadow: '0px 2px 5px 0 #000000',
}


const result = (data, key) => {
  try {
    return JSON.parse(data)[key]
  } catch (e) {
    return ''
  }
}

// export const command = 'sh bar/scripts/update'
export const command = `
BAT=$(pmset -g batt | egrep '([0-9]+\%).*' -o --colour=auto | cut -f1 -d';');
SPACE=$(if command -v chunkc >/dev/null 2>&1; then echo $(chunkc tiling::query -d id); else echo ""; fi)
SPOTIFY=$(osascript -e 'tell application "System Events"set processList to (name of every process)end tellif (processList contains "Spotify") is true thentell application "Spotify"if player state is playing thenset artistName to artist of current trackset trackName to name of current trackreturn artistName & " - " & trackNameelsereturn ""end ifend tellend if')


echo $(cat <<-EOF
  {
    "battery": "$BAT",
    "workspace": "$SPACE",
    "playing": "$SPOTIFY"
  }
EOF
);
`

export const render = ({ output, error }) => {
  if(error) {
    console.log(new Date())
    console.log(error)
    console.log(String(error))
  }
  let errorContent = (
    <div style={barStyle}></div>
  )
  let content = (
    <div style={barStyle}>
      <link rel="stylesheet" type="text/css" href="bar/assets/font-awesome/css/all.min.css" />
      <Workspaces config={config.workspaces} data={result(output, "workspace")} side="left" />

      <Playing config={config.playing} data={result(output, "playing")} />

      <Time config={config.time} side="right"></Time>
      <Battery config={config.battery} data={result(output, "battery")} side="right" />
    </div>
  )
  return error ? errorContent : content
}
