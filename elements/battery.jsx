import { element } from '../lib/style.js';

const render = ({ output, error, side, config, data }) => {
  var batColor = (level) => {
    var level = parseInt(level)

    if (level > 80)
      return "#97c475"; // Green
    else if (level > 55)
      return "#e5c07b"; // Yellow
    else if (level > 30)
      return "#d09a6a"; // Orange
    return "#e06c75";   // Red
  }

  var style = (level) => {
    return {
      ...element,
      ...config.style,
      float: side,
      color: batColor(level)
    }
  }

  var iconStyle = {
    padding: '0 0 0 10px',
    fontSize: '16px'
  }

  var iconName = (level) => {
    var level = parseInt(level)
    if (level > 80)
      return "battery-full"
    if (level > 60)
      return "battery-three-quarters"
    if (level > 40)
      return "battery-half"
    if (level > 20)
      return "battery-quarter"
    return "battery-empty"
  }

  return error ? (
    <span style={style(0)}>!</span>
  ) : (
    <span style={style(data)}>
      <span>{data}</span>
      <span style={iconStyle}>
        <i className={'far fa-' + iconName(data)}></i>
      </span>
    </span>
  )
}

export default render
