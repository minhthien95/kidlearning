module.exports = {
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