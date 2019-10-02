
// Import stuff
const { app, Menu, Tray, NativeImage } = require('electron')
const path = require('path')
const Doot = require('./src/doot')

// Load Mr. Skeletor
const skeletor = new Doot()

// Define system tray handle
let tray = null

/**
 * This method will be called when Electron has finished initialization and is
 * ready to create browser windows.  Some APIs can only be used after this event
 * occurs.
 */
app.on('ready', () => {
  let trayIconPath = path.normalize(`${__dirname}/assets/doot-x32.png`)
  let trayIcon
  try {
    trayIcon = NativeImage.createFromPath(trayIconPath)
    tray = new Tray(trayIcon)
    tray.setContextMenu(Menu.buildFromTemplate([
      {
        label: 'Doot',
        click: () => skeletor.doot()
      },
      {
        role: 'quit',
        label: 'Exit application'
      }
    ]))
  } catch (err) {
    // Ignore
  }

  // Tell Mr Skeletor we're ready
  skeletor.ready()

  // Start off with a doot
  skeletor.start()
})

/**
 * Remove tray icon and stop spooping the user on exit
 */
app.on('will-quit', () => {
  skeletor && skeletor.stop()
  tray && tray.destroy()
})
