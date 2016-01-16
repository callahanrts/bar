#############################################################################
# Customization
#############################################################################
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

# Order represents priority
playing:
  spotify: ""
  youtube: ""
  soundcloud: ""
  sonos: ""

# Time format
time: "%l:%M:%S"

# Date Format
date: "%a %d %b"

#############################################################################

style: """
  width: calc(#{bar.width} - #{bar.gap.left * 2 + bar.gap.right}px)
  height: #{bar.height}px
  left: #{bar.gap.left}px
  top: #{bar.gap.top}px
  color: #{bar.font.color}
  background-color: #{bar.background.color}
  padding: #{bar.padding}
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

    .fa-youtube, .fa-youtube-play
      color: #e62117

    .fa-soundcloud
      color: #f50
      font-size: 18px

  .battery
    .icon
      margin-left: 3px
    .fa-battery-empty
      color: red

  .icon
    font-size: 16px

"""

command: "#{process.argv[0]} bar/commands/update.js"

refreshFrequency: 1000 # ms

render: (output) ->
  @run("bar/install")
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
      <span class="icon"></span>
      <span></span>
    </div>
  """

update: (output, el) ->
  data = JSON.parse(output)
  @addFocused(data.active, el)
  @addTime(data.time, el)
  @addDate(data.date, el)
  @addBattery(data.battery, el)
  @addPlaying(data, el)

addFocused: (focused, el) ->
  $(".focused span", el).text(focused)

addDate: (date, el) ->
  $(".date span", el).text(date)

addTime: (time, el) ->
  $(".time span, el").text(time)

addBattery: (battery, el) ->
  battery = parseInt(battery)
  $(".battery span:first-child", el).text("#{battery}%")
  $icon = $(".battery span.icon", el)
  $icon.removeClass().addClass("icon")
  $icon.addClass("fa #{@batteryIcon(battery)}")

addPlaying: (music, el) ->
  @source ||= {}

  # DOM handles
  $icon = $(".playing span.icon")
  $playing = $(".playing span:last-child", el)

  playing = { track: "", source: "", icon: "" }

  if music.spotify and music.spotify.playing
    playing.track = music.spotify.track
    playing.icon = @playingIcon(music.spotify.source)
    playing.source = music.spotify.source
  else if music.browser and music.browser.playing
    playing.track = music.browser.track
    playing.icon = @playingIcon(music.browser.source)
    playing.source = music.browser.source

  # Current source has changed
  if @source != playing.source
    $icon.removeClass().addClass("icon")
    $icon.addClass("fa fa-#{playing.icon}")
    $playing.text(playing.track)

  @source = music.source

batteryIcon: (percentage) =>
  return if percentage > 90
    "fa-battery-full"
  else if percentage > 70
    "fa-battery-three-quarters"
  else if percentage > 40
    "fa-battery-half"
  else if percentage > 20
    "fa-battery-quarter"
  else
    "fa-battery-empty"

playingIcon: (source) =>
  return switch source
    when "youtube" then "youtube-play"
    when "soundcloud" then "soundcloud"
    when "spotify" then "spotify"
    else ""
