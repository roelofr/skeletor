/**
 * Doot
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */

const path = require('path')
const playerFunction = require('play-sound')

// Get player options, for Windows
const mp3Bin = path.normalize(`${__dirname}/../bin/cmdmp3.exe`)
const playerOptions = {
  player: process.platform === 'win32' ? mp3Bin : null
}

// Get audio path
const audioFile = path.dirname(__dirname) + '/assets/doot.mp3'

class Doot {
  /**
   * Get a random timeout, between 10 and 20 minutes
   */
  static timeout () {
    return (Math.random() * 600 + 600) * 1000
  }

  /**
   * Create player and timeout handle
   */
  constructor () {
    this.player = playerFunction(playerOptions)
    this.timeout = null
  }

  /**
   * Perform a single doot
   */
  doot () {
    if (this.player) {
      this.player.play(audioFile, {}, err => {
        if (err) {
          console.warn('Failed to doot: %O', err)
        } else {
          console.log('User has been spooked!')
        }
      })
    }
  }

  /**
   * Perform a timed doot and start a new timeout
   */
  timed () {
    this.doot()
    this.timeout = setTimeout(this.timed.bind(this), Doot.timeout())
  }

  /**
   * Start spooping the user
   */
  start () {
    if (this.timeout) {
      this.stop()
    }

    // Doot and set timeout
    this.timed()
  }

  /**
   * Stop spooping the user
   */
  stop () {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
  }
}

module.exports = Doot
