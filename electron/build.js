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
  asar: false, // DO NOT BUNDLE, the binaries will break!
  ignore: [
    '/build.js',
    /lib\/cmdmp3\/(cmdmp3.+|readme.txt)$/,
    '/Makefile',
    '/yarn.lock'
  ],
  out: 'dist/',
  overwrite: true
}

const platforms = {
  win32: {
    platform: 'win32',
    win32metadata: {
      CompanyName: "Roelof's Horrible Productions"
    },
    icon: 'assets-win/doot-large.ico'
  },
  linux: {
    platform: 'linux'
  }
}

let actionList = []
let platform = process.argv.length > 2 ? process.argv[2] : null

if (platform === 'all') {
  Array.prototype.forEach.apply(platforms, config => actionList.push(config))
} else if (platforms.hasOwnProperty(platform)) {
  actionList.push(platforms[platform])
} else {
  throw Error(`Cannot find platform config for [${platform}]!`)
}

Array.prototype.forEach.call(actionList, opts => {
  let platform = opts.platform

  packager({
    ...shared,
    ...opts
  }).then(paths => {
    console.log(`Built files for ${platform}`)
    paths.forEach(path => {
      console.log(`- ${path}`)
    })
  })
})
