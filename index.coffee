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

server:  "#{process.argv[0]} bar/server.js"
#sonos: "#{process.argv[0]} bar/commands/sonos.js 1000"

render: (output) ->
  @updateBattery = true

  #@run @server
  @run "cat '' > bar/playing/soundcloud"
  @run "cat '' > bar/playing/youtube"

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
  @addFocused(el)
  data = JSON.parse(output)
  @addTime(data.time, el)
  @addDate(data.date, el)
  @addBattery(data.battery, el)
  #$playing = $(".playing span:last-child", el)
  #$playing.text(output)
  @addPlaying(el)

addFocused: (el) ->
  @run "osascript -e 'tell application \"System Events\"' -e 'set frontApp to name of first application process whose frontmost is true' -e 'end tell'", (err, focused) =>
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

addPlaying: (el) ->
  @getPlayingTracks()

  for source, track of @playing
    $icon = $(".playing span.icon")
    $icon.removeClass().addClass("icon")
    $playing = $(".playing span:last-child", el)
    $playing.text("")
    if track
      $icon.addClass("fa fa-#{@playingIcon(source)}")
      $playing.text(track)
      break

getPlayingTracks: ->
  @run "sh bar/commands/spotify", (err, spotify) =>
    @playing.spotify = if !!spotify then spotify else ""

  @run "cat bar/playing/youtube", (err, track) =>
    @playing.youtube = if !!track then track else ""

  @run "cat bar/playing/soundcloud", (err, track) =>
    @playing.soundcloud = if !!track then track else ""

  #if @updateSonos
  #  @updateSonos = false
  #  setTimeout =>
  #    @updateSonos = true
  #  , 5000
  #@run @sonos, (err, sonos) =>
  #  @playing.sonos = err + " | " + sonos



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
