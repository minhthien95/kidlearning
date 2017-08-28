// module.exports = {
//   entry: ['./app/maincontent.js','./app/slidebar.js','./app/statusbar.js'],
//   output: {
//     path: __dirname,
//     filename: './public/bundle.js'
//   },
//   watch: true,
//   module: {
//     loaders: [
//       {
//         loader: 'babel-loader',
//         query: {
//           presets: ['es2015', 'react']
//         },
//         test: /\.jsx?$/,
//         exclude: /node_modules/
//       }
//     ]
//   }
// };
const webpack = require('webpack');
const prod = process.argv.indexOf('-p') !== -1;

const config = {
  entry: ['./app/maincontent.js','./app/slidebar.js','./app/statusbar.js'],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  watch: true,
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        },
        test: /\.jsx?$/,
        exclude: /node_modules/
      }
    ]
  }
};


config.plugins = config.plugins||[];
if (prod) {
  config.plugins.push(new webpack.DefinePlugin({
      'process.env': {
          'NODE_ENV': `"production"`
      }
  }));
} else {
  config.plugins.push(new webpack.DefinePlugin({
      'process.env': {
          'NODE_ENV': `""`
      }
  }));
}

module.exports = config;