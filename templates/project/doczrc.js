import { createPlugin } from 'docz-core';

const FixesStyledComponentsProps = () => createPlugin({
  modifyBabelRc: (babelrc) => {
    babelrc.babelrc = true;
    babelrc.presets = [];
    babelrc.plugins = ['@babel/plugin-syntax-dynamic-import'];

    return babelrc;
  },
  modifyBundlerConfig: (config) => { // This should be fixed fixed with docz 0.14, keep it for now.
    const jsxPluginIndex = config.plugins.findIndex(plugin => plugin.config.id === 'jsx');
    const { loaders } = config.plugins[jsxPluginIndex].config;
    const docGenLoaderIndex = loaders.findIndex(loader => /react-docgen-typescript-loader/.test(loader.loader));
    const docGenLoader = loaders[docGenLoaderIndex];

    docGenLoader.options = {
      tsconfigPath: './tsconfig.json'
    };

    return config;
  }
});

export default {
  typescript: true,
  plugins: [FixesStyledComponentsProps()],
};
