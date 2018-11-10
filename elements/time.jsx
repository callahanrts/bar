import strftime from '../lib/strftime.js';
import { element, icon, theme } from '../lib/style.js';
import Icon from '../icons/index.jsx';

const render = ({ config, output, error, side, theme }) => {
  let time = strftime(config.format, new Date());
  var style = {
    ...element,
    ...config.style,
    float: side,
  }
  var iconStyle = {
    ...icon,
    padding: '0 3px'
  }

  return error ? (
    <span style={style}>!</span>
  ) : (
    <span style={style}>
      {time}
      <Icon name="clock" style={iconStyle} />
    </span>
  )
}

export default render
