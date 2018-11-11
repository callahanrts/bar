import { element } from '../lib/style.js';

const render = ({ config, output, error, side }) => {
  var style = {
    ...element,
    ...config.style,
    float: side,
  }
  return error ? (
    <span style={style}>!</span>
  ) : (
    <span style={style}>
    CPU
    <i className="fa fa-chip"></i>
    </span>
  )
}

export default render
