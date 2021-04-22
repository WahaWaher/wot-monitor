const electronBuilder = require('electron-builder');
const { getConfig } = require('./build-config');

const buildRelease = async () => {
  await electronBuilder.build({
    x64: true,
    publish: 'always',
    config: getConfig(
      {
        asar: false,
      },
      {
        os: 'win',
        arch: 'x64',
      }
    ),
  });

  // await electronBuilder.build({
  //   ia32: true,
  //   publish: 'always',
  //   config: getConfig(
  //     {},
  //     {
  //       os: 'win',
  //       arch: 'x32',
  //     }
  //   ),
  // });
};

buildRelease();
