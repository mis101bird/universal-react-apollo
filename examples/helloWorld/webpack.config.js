module.exports = {
  mode: 'production',
  entry: {
    'home': './src/clientEntry',
    'module': './src/moduleClientEntry'
  },
  output: {
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              highlightCode: true
            }
          }
        ]
      }
    ]
  }
}
