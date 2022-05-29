const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [path.join(__dirname, './src/app/utils/forms/')],
        sideEffects: true,
      },
    ],
  },
};
