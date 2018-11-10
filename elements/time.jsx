import strftime from '../lib/strftime.js';
import { element, icon } from '../lib/style.js';
import Icon from '../icons/index.jsx';

const render = ({ output, error, side }) => {
  let time = strftime("%l:%M:%S", new Date());
  var style = {
    ...element,
    float: side,
    backgroundColor: '#444',
  }

  return error ? (
    <span style={style}>!</span>
  ) : (
    <span style={style}>
      <Icon name="clock" style={icon} fill={icon.color} />
      {time}
    </span>
  )
}

export default render
