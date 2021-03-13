const fs = require('fs');
const path = require('path');
const rewireAliases = require('react-app-rewire-aliases');
const removeWebpackPlugins = require('react-app-rewire-unplug');

const resolveApp = (relativePath) =>
  path.resolve(fs.realpathSync(process.cwd()), relativePath);

module.exports = {
  webpack: function (config, env) {
    /**
     * Aliases
     */
    config = rewireAliases.aliasesOptions({
      '@': resolveApp(`src/`),
      '~': resolveApp(`node_modules/`),
    })(config, env);

    /**
     * Remove unnecessary plugins
     */
    config = removeWebpackPlugins(config, env, {
      pluginNames: ['ManifestPlugin'/* , 'ESLintWebpackPlugin' */],
      verbose: true,
    });

    return config;
  },
};