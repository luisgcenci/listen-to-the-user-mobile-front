module.exports = function(api) {
  api.cache(true);

  const plugins = [
    [
      'babel-plugin-module-resolver',
      {
        alias : {
          '@src' : './src',
          '@assets': './assets',
          '@components' : './src/components',
          '@enums': './src/enums',
          '@helpers': './src/helpers',
          '@hooks': './src/hooks',
          '@store': './src/store',
          '@auth-app': './src/containers/auth-app',
          '@internal-app': './src/containers/internal-app',
          '@@firebase': './src/containers/firebase',
        }
      }
    ]
  ]
  
  return {
    presets: ['babel-preset-expo'],
    plugins: plugins
  };
};
