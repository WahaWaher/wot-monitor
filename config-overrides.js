const fs = require('fs');
const path = require('path');
const {
  override,
  addWebpackAlias,
  removeInternalBabelPlugin,
  addBabelPlugin,
} = require('customize-cra');

const resolveApp = (relativePath) =>
  path.resolve(fs.realpathSync(process.cwd()), relativePath);

module.exports = {
  paths: (paths, env) => {
    paths.appSrc = resolveApp('view-src');
    paths.appIndexJs = resolveApp('view-src/index.js');
    paths.appPublic = resolveApp('view-src/public');
    paths.appHtml = resolveApp('view-src/index.html');
    paths.appBuild = resolveApp('view');

    return paths;
  },
  webpack: override(
    addWebpackAlias({
      '@': resolveApp(`view-src/`),
      '~': resolveApp(`node_modules/`),
    }),
    removeInternalBabelPlugin('ManifestPlugin'),
    addBabelPlugin([
      'babel-plugin-styled-components',
      {
        displayName: true,
      },
    ])
  ),
};
