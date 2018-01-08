var path = require('path')
import (./main.css)

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
}
// webpack-demo文件夹下执行命令
// webpack --config webpack.config.js
// 如果一个webpack.config。js是存在的，webpack命令默认选择它。我们在这里使用-config选项来显示您可以传递任何名称的配置。这将有助于更复杂的配置，这些配置需要拆分为多个文件。