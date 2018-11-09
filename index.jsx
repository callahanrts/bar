export const refreshFrequency = 5000 // ms

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
  </div>
)
