import { theme } from '../lib/style.js'

const getViewBox = name => {
  switch (name) {
    case "clock":
      return "0 0 512 512";
    case "battery-0":
    case "battery-1":
    case "battery-2":
    case "battery-3":
    case "battery-4":
      return "0 0 640 512";
    default:
      return "0 0 32 32";
  }
};

const getPath = (name, props) => {
  switch (name) {
    case "clock":
      return (
        <path
          {...props}
          d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z"
        />
      );
    case "battery-0":
      return (
        <path
          {...props}
          d="M544 160v64h32v64h-32v64H64V160h480m16-64H48c-26.51 0-48 21.49-48 48v224c0 26.51 21.49 48 48 48h512c26.51 0 48-21.49 48-48v-16h8c13.255 0 24-10.745 24-24V184c0-13.255-10.745-24-24-24h-8v-16c0-26.51-21.49-48-48-48z"
        />
      );
    case "battery-1":
      return (<path
          {...props}
          d="M544 160v64h32v64h-32v64H64V160h480m16-64H48c-26.51 0-48 21.49-48 48v224c0 26.51 21.49 48 48 48h512c26.51 0 48-21.49 48-48v-16h8c13.255 0 24-10.745 24-24V184c0-13.255-10.745-24-24-24h-8v-16c0-26.51-21.49-48-48-48zm-336 96H96v128h128V192z"
        />
      );
    case "battery-2":
      return (<path
          {...props}
          d="M544 160v64h32v64h-32v64H64V160h480m16-64H48c-26.51 0-48 21.49-48 48v224c0 26.51 21.49 48 48 48h512c26.51 0 48-21.49 48-48v-16h8c13.255 0 24-10.745 24-24V184c0-13.255-10.745-24-24-24h-8v-16c0-26.51-21.49-48-48-48zm-240 96H96v128h224V192z"
        />
      );
    case "battery-3":
      return (<path
          {...props}
          d="M544 160v64h32v64h-32v64H64V160h480m16-64H48c-26.51 0-48 21.49-48 48v224c0 26.51 21.49 48 48 48h512c26.51 0 48-21.49 48-48v-16h8c13.255 0 24-10.745 24-24V184c0-13.255-10.745-24-24-24h-8v-16c0-26.51-21.49-48-48-48zm-144 96H96v128h320V192z"
        />
      );
    case "battery-4":
      return (<path
          {...props}
          d="M544 160v64h32v64h-32v64H64V160h480m16-64H48c-26.51 0-48 21.49-48 48v224c0 26.51 21.49 48 48 48h512c26.51 0 48-21.49 48-48v-16h8c13.255 0 24-10.745 24-24V184c0-13.255-10.745-24-24-24h-8v-16c0-26.51-21.49-48-48-48zm-48 96H96v128h416V192z"
        />
      );
    default:
      return <path />;
  }
};

const divStyle = (style) => {
  return {
    ...style,
    position: 'relative',
    maxHeight: '100%',
    display: 'inline-block',
  }
}

const iconStyle = () => {
  return {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-25%, -32%)',
  }
}

const Icon = ({
  name = "",
  style = {},
  fill = style.color || theme.textDim,
  viewBox = "",
  width = "100%",
  className = "",
  height = "100%"
}) => (
  <span style={divStyle(style)}>
    <svg
      style={iconStyle()}
      viewBox={getViewBox(name)}
      role="img"
      xmlns="http://www.w3.org/2000/svg"
    >
      { getPath(name, { fill })}
    </svg>
  </span>
);

export default Icon;
