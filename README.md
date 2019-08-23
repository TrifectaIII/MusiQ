# **MusiQ**

[**PLAY THE GAME!**](https://musiq--trifectaiii.repl.co/)

*Note: Currently only tested on chrome for desktop/android, other browsers/devices may play the sound clips properly.*

Introducing **MusiQ**, a music quiz game you can play with your friends, or anybody else with access to a browser (desktop **AND/OR** mobile)!

Playing the game is super easy. You can join a lobby of up to 4 players by all using the same multiplayer link, then simply start the game, listen to a small section of a song, and try to answer the question! Games are 10 rounds each, with songs and questions chosen randomly. Whoever gets the most questions right is the winner!

## Technology

**MusiQ** runs on a [**node.js**](https://nodejs.org/) server, with [**express**](https://expressjs.com/) and [**socket.io**](https://socket.io/). Socket.io enables the multiplayer aspect of the game by letting all of the clients communicate with the server in real time.

The frontend was made with [**skeleton**](http://getskeleton.com/), [**p5.js**](https://p5js.org/), and [**progressbar.js**](https://progressbarjs.readthedocs.io/). Skeleton forms the base that the UI's CSS was built on, p5 was used to create the visualizer and handle audio playback, and progressbar was used to create the timer.

### About Us
**MusiQ** was created by Dakota Madden-Fong (@TrifectaIII), Anthony Doan-Ha (@adoanha) and Jie Chen (@jxchen26).

### Disclaimer
We do not own any of the music samples used, and they are the property of their respective creators who are not affiliated with this project. 
