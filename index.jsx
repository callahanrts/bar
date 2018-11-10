// Update every second for the clock. Expensive elements should
// throttle themselves
export const refreshFrequency = 1000 // ms

import {
  Time
} from './elements/index.jsx'

const theme = {
  background: '#333',
  text: '#efefef',
  textDim: '#ccc'
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
}

export const command = "echo Hello World!"
export const render = ({ output }) => (
  <div style={barStyle}>
    {output}
    <Time side="right"></Time>
  </div>
)
