import { element, icon } from '../lib/style.js';
import Icon from '../icons/index.jsx';

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

  var iconStyle = (level) => {
    return {
      ...icon,
      padding: '0 3px',
      height: '16px',
      width: '20px',
      color: batColor(level),
    }
  }

  var iconName = (level) => {
    var level = parseInt(level)
    if (level > 80)
      return "battery-4"
    if (level > 60)
      return "battery-3"
    if (level > 40)
      return "battery-2"
    if (level > 20)
      return "battery-1"
    return "battery-0"
  }

  return error ? (
    <span style={style(0)}>!</span>
  ) : (
    <span style={style(data)}>
      {data}
      <Icon name={iconName(data)} style={iconStyle(data)} />
    </span>
  )
}

export default render
