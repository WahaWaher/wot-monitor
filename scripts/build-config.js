const { name, version, author, productName } = require('../package.json');
const deepMerge = require('deepmerge');

const getConfig = (customConfig = {}, params = {}) => {
  const { os, arch } = params;
  const config = deepMerge(
    {
      productName,
      appId: 'com.app.wotMonitor',
      copyright: `Copyright © ${new Date().getFullYear()} ${author.name}`,
      artifactName: `${name}-${version}-${os}-${arch}.\${ext}`,
      asar: true,
      extends: null,
      directories: {
        output: 'release',
      },
      files: [
        {
          "from": "main/build",
          "to": "src/main",
          "filter": ["**/*"]
        },
        {
          "from": "ui/build",
          "to": "src/ui",
          "filter": ["**/*"]
        },
        '.env',
        '.env.production',
        'package.json',
        'node_modules/**/*',
      ],
      extraMetadata: {
        main: 'src/main/index.js',
      },
      nsis: {
        oneClick: false,
        allowToChangeInstallationDirectory: true,
        displayLanguageSelector: true,
        multiLanguageInstaller: true,
        runAfterFinish: true,
        createDesktopShortcut: true,
        menuCategory: true,
        artifactName: `${name}-${version}-setup-${os}-${arch}.\${ext}`,
      },
      win: {
        icon: '../assets/icons/favicon-reserve.ico',
        target: [
          'nsis',
          'zip'
        ],
      },
    },
    customConfig,
    { arrayMerge: (dest, src) => src }
  );

  return config;
};

module.exports = { getConfig };
