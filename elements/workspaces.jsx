import { element } from '../lib/style.js';

const render = ({ config, output, error, side, data }) => {
  var style = {
    ...element,
    ...config.style,
    float: side,
  }

  var spaceStyle = (position, space) => {
    var style = {
      height: "23px",
      display: 'inline-block',
      padding: '0 8px'
    }
    if (position == parseInt(space)) {
      style.borderBottom = '2px solid #c678dd'
    }
    return style
  }

  let errorContent = (
    <span style={style}>!</span>
  )

  let workspaces = (
    <span style={style}>
      <span style={spaceStyle(1, data)}>
        <i className="fa fa-terminal"></i>
      </span>
      <span style={spaceStyle(2, data)}>
        <i className="fab fa-firefox"></i>
      </span>
      <span style={spaceStyle(3, data)}>
        <i className="fab fa-slack-hash"></i>
      </span>
      <span style={spaceStyle(4, data)}>
        <i className="fab fa-spotify"></i>
      </span>
      <span style={spaceStyle(5, data)}>
        <i className="far fa-calendar"></i>
      </span>
    </span>
  )

  let noChunkwm = (
    <span style={{...style, opacity: 0.4}}>ChunkWM not installed</span>
  )

  return workspaces//error ? errorContent : data ? workspaces : noChunkwm
}

export default render
