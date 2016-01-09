
bar =
  width: "100%"
  height: 23 # Text vertically aligns best with odd heights

  gap:
    left: 20
    right: 20
    top: 4

  font:
    color: "#fff"

  background:
    color: "rgba(48, 48, 48, 1)"

  border:
    radius: 1
    color: "transparent"

  padding: "0 10px"

style: """
  width: calc(#{bar.width} - #{bar.gap.left * 2 + bar.gap.right}px)
  height: #{bar.height}px
  left: #{bar.gap.left}px
  top: #{bar.gap.top}px
  color: #{bar.font.color}
  background-color: #{bar.background.color}
  padding: #{navbar.padding}
  z-index: 20

  border-radius: #{bar.border.radius}px;
  border-color: #{bar.border.color}

  -webkit-box-shadow: 0px 2px 5px 0 #000000
  box-shadow: 0px 2px 5px 0 #000000

  font-size: 14px
  font-family: 'Helvetica'

  div
    display: inline-block
    height: #{bar.height}px
    line-height: #{bar.height}px

  span
    vertical-align: middle
    line-height: normal

  .left
    float: left

  .right
    float: right
    padding-left: 15px

  .focused
    color: #999

  .center
    position: absolute
    left: 0
    width: 100%
    text-align: center

  .playing
    .icon
      padding: 0 3px

    .fa-spotify
      color: #2fd566

  .battery
    .icon
      margin-left: 3px
    .fa-battery-empty
      color: red

  .icon
    font-size: 16px

"""

command: ""
refreshFrequency: 1000 # ms

render: (output) ->
  """
    <link rel="stylesheet" href="bar/assets/font-awesome/css/font-awesome.min.css" />

    <div class='left focused'>
      <span></span>
    </div>

    <div class='right time'>
      <span></span>
    </div>

    <div class='right date'>
      <span></span>
    </div>

    <div class='right battery'>
      <span></span>
      <span class="icon"></span>
    </div>

    <div class='center playing'>
      <span class="icon fa fa-spotify"></span>
      <span></span>
    </div>
  """

update: (output, el) ->

  @run "sh bar/commands/time", (err, time) =>
    $(".time span", el).text(time)

  @run "sh bar/commands/date", (err, date) =>
    $(".date span", el).text(date)

  @run "sh bar/commands/battery", (err, battery) =>
    battery = parseInt(battery)
    $(".battery span:first-child", el).text("#{battery}%")
    $(".battery span.icon", el).removeClass(":not(.icon)")
    icon = if battery > 90
      "fa-battery-full"
    else if battery > 70
      "fa-battery-three-quarters"
    else if battery > 40
      "fa-battery-half"
    else if battery > 20
      "fa-battery-quarter"
    else
      "fa-battery-empty"
    $(".battery span.icon", el).addClass("fa #{icon}")

  @run "sh bar/commands/spotify", (err, spotify) =>
    $(".playing span:last-child", el).text(spotify)

  @run "osascript -e 'tell application \"System Events\"' -e 'set frontApp to name of first application process whose frontmost is true' -e 'end tell'", (err, focused) =>
    $(".focused span", el).text(focused)


log: (string) =>
  @run "echo \"#{string}\" > bar/dev.log"
