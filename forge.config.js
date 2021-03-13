
module.exports = {
  packagerConfig: {
    name: 'WOTMonitor',
    executableName: 'WOTMonitor',
    overwrite: true,
    platform: 'win32',
    arch: 'x64',
    // asar: true,
    ignore: [
      'src',
      'public',
      '.gitignore',
      'forge.config.js',
      'config-overrides.js',
      'jsconfig.json',
    ],
  },
};
