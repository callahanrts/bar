// Update every second for the clock. Expensive elements should
// throttle themselves
export const refreshFrequency = 5000 // ms

import { theme } from './lib/style.js';
import {
  Time,
  Battery
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
}


const result = (data, key) => {
  try {
    return JSON.parse(data)[key]
  } catch (e) {
    return null
  }
}

export const command = 'sh bar/scripts/update'
export const render = ({ output, error }) => (
  <div style={barStyle}>
  { output }
  {error}
    <Time config={config.time} side="right"></Time>
    <Battery config={config.battery} data={result(output, "battery")} side="right" />
  </div>
)
