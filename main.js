
// Import stuff
const { app, Menu, Tray, nativeImage } = require('electron')
const player = require('play-sound')()

// Define variables and cnstants
let iconPath = process.platform === 'win32' ? 'assets/doot.ico' : 'assets/doot.png'
const icon = nativeImage.createFromPath(iconPath)
const sound = 'assets/doot.m4a'

// Define tracking, for garbage collection
let tray = null
let audio = null
let nextDoot = null

const doDoot = () => {
  // Abort if player is gone
  if (!player) {
    return
  }

  // Play the audio
  audio = player.play(sound, err => {
    if (err) {
      throw err
    }
  })

  // Show a balloon
  if (tray && !tray.isDestroyed()) {
    tray.displayBalloon({
      title: 'Spook',
      content: 'You have been spooked'
    })
  }

  // Wait a while
  nextDoot = setTimeout(doDoot, (Math.random() * 600 + 600) * 1000);
}

// Create icon
const registerTrayIcon = () => {
  tray = new Tray(icon)
  const contextMenu = Menu.buildFromTemplate([{
    role: 'quit',
    label: 'Exit application',
    sublabel: 'Stop the spooking'
  }])
  tray.setToolTip('Doot doot.')
  tray.setContextMenu(contextMenu)

  // Start off with a doot
  doDoot()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', registerTrayIcon)

// Unbind audio listener on exit
app.on('will-quit', () => {
  if (audio) {
    audio.kill()
  }
  if (nextDoot) {
    clearTimeout(nextDoot)
  }
  if (tray) {
    tray.destroy()
  }
})
