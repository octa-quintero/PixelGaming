// webpack.config.js
const webpack = require('webpack');

module.exports = {
  // ... Otras configuraciones de Webpack ...

  resolve: {
    fallback: {
      buffer: require.resolve('buffer/'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      util: require.resolve('util/'),
    },
  },
  
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
};


