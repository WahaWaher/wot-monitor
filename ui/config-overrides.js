const fs = require('fs');
const path = require('path');
const {
  override,
  addWebpackAlias,
  removeInternalBabelPlugin,
  addBabelPlugin,
  removeModuleScopePlugin
} = require('customize-cra');

const resolveApp = (relativePath) =>
  path.resolve(fs.realpathSync(process.cwd()), relativePath);

module.exports = {
  paths: (paths, env) => {
    paths.appIndexJs = resolveApp('src/index.tsx');
    paths.appPublic = resolveApp('../assets');
    paths.appHtml = resolveApp('src/index.html');
    paths.appTypeDeclarations = resolveApp('src/react-app-env.d.ts');
    paths.appBuild = resolveApp('build');

    return paths;
  },
  webpack: override(
    (config) => {
      config.target = 'electron-renderer';

      return config;
    },
    addWebpackAlias({
      '@': resolveApp(`src/`),
      '~': resolveApp(`node_modules/`),
    }),
    removeInternalBabelPlugin('ManifestPlugin'),
    removeModuleScopePlugin(),
    addBabelPlugin([
      'babel-plugin-styled-components',
      {
        displayName: true,
      },
    ])
  ),
};
