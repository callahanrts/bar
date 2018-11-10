// Update every second for the clock. Expensive elements should
// throttle themselves
export const refreshFrequency = 1000 // ms
import { theme } from './lib/style.js';
import {
  Time
} from './elements/index.jsx'

const config = {
  time: {
    format: "%l:%M",
    style: {
      padding: '0 15px',
      backgroundColor: theme.backgroundLight,
    }
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

export const command = "echo Hello World!"
export const render = ({ output }) => (
  <div style={barStyle}>
    {output}
    <Time config={config.time} theme={theme} side="right"></Time>
  </div>
)
