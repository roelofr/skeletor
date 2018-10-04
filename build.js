/**
 * Electron packager
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */

const packager = require('electron-packager')
const path = require('path')

const shared = {
  name: 'doot-doot',
  executableName: 'doot',
  appCopyright: 'Mozilla Public License Version 2.0',
  dir: path.dirname(require.main.filename),
  asar: true,
  ignore: '/build.js',
  out: 'dist/',
  overwrite: true
}

const platforms = [
  {
    platform: 'win32',
    win32metadata: {
      CompanyName: "Roelof's Horrible Productions",
      'requested-execution-level': 'user'
    },
    icon: 'assets/doot.ico'
  },
  {
    platform: 'linux'
  }
]

Array.prototype.forEach.call(platforms, opts => {
  packager({
    ...shared,
    ...opts
  }).then((paths) => {
    console.log('Built files')
    paths.forEach(path => {
      console.log(`- ${path}`)
    })
  })
})
