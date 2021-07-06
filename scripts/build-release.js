const electronBuilder = require('electron-builder');
const { getConfig } = require('./build-config');

const buildRelease = async () => {
  await electronBuilder.build({
    x64: true,
    publish: 'always',
    config: getConfig(
      {},
      {
        os: 'win',
        arch: 'x64',
      }
    ),
  });
};

buildRelease();
