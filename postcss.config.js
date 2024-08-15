module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 16,
      propList: ['*', '!border'],
      selectorBlackList: [],
      exclude: (file) => {
        if (file.indexOf('flexiable') !== -1) {
          return true;
        }
      },
    },
  },
};
