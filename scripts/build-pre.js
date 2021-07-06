const electronBuilder = require('electron-builder');
const { getConfig } = require('./build-config');

electronBuilder.build({
  x64: true,
  config: getConfig(
    {
      asar: false,
      directories: { output: 'build' },
      win: { target: ['dir'] },
    },
    { os: 'win', arch: 'x64' }
  ),
});
