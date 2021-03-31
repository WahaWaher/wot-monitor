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

module.exports = override(
  addWebpackAlias({
    '@': resolveApp(`src/`),
    '~': resolveApp(`node_modules/`),
  }),
  removeInternalBabelPlugin('ManifestPlugin'),
  addBabelPlugin([
    'babel-plugin-styled-components',
    {
      displayName: true,
    },
  ])
);
