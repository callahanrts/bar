
# Bar

Bar is an [Übersicht](https://github.com/felixhageloh/uebersicht) widget that shows some useful information in an elegant way.


## Modules
- Active application
- Currently playing music from
  - Soundcloud
  - Spotify
  - Youtube
- Battery
- Date
- Time

## Installation
Download (or clone) this repository and place the folder in your Übersicht widgets directory.

## Configuration

Open [index.coffee](https://github.com/callahanrts/bar/blob/master/index.coffee) and edit the
variables in the customization section. Changes will take effect on save.

## Current Track
Though spotify will work by default, there are a couple of extra steps to retrieve the currently
playing track from Soundcloud or Youtube.

1. Install the <a href="https://chrome.google.com/webstore/detail/current-track/idajgbpajjfifghfogpladkjkakafegj" target="_blank">Current Track</a> Chrome extension.
1. Generate a self signed ssl certificate

    ```
    $ cd bar/
    $ ./create_cert
    ```

    If you get an error, try running the `create_cert` script a few more times before resorting to
    submitting an issue.  A successful response should look like this.

    ![Successful ssl cert creation](http://i.imgur.com/niZlSM6.png)

1. Restart Übersicht and navigate to <a href="https://localhost:61322" target="_blank">https://localhost:61322</a>.
   Here you will need to click `advanced` and `Proceed to localhost (unsafe)`.


## Screenshots
![Soundcloud](http://i.imgur.com/ENprGEy.png)
![Spotify](http://i.imgur.com/HGJj6iR.png)
![Youtube](http://i.imgur.com/5dqSypY.png)
