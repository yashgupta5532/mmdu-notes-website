
module.exports = {
  // Other Webpack configuration options...

  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify'),
    },
  },

  // Entry point and output configuration...
};
