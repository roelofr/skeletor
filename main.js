
// Import stuff
const { app, Menu, Tray, NativeImage } = require('electron')
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
  let trayIconName = process.platform === 'win32' ? 'doot.ico' : 'doot.png'
  let trayIconPath = `${__dirname}/assets/${trayIconName}`
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
