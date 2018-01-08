


## 我主要是看了这2部分内容
- 我在网上找了个fake-webpack项目，我是对打包的文件debug一下，看一下打包后的文件的执行逻辑
  [fake-webpack](https://github.com/youngwind/fake-webpack)

- [中文教程](https://doc.webpack-china.org/guides/getting-started)

## 项目说明
- 项目代码是 [中文教程](https://doc.webpack-china.org/guides/getting-started) 相应的demo。覆盖了大部分但不是全部
- 目的是各位如何根据 webpack中文教程 配置不成功，可以试一下下我的配置
- 使用步骤
  - 其实只要根据 [中文教程](https://doc.webpack-china.org/guides/getting-started) 一步一步来，把起步的教程给跟着走一遍就知道怎么做了
  - 进入各个文件夹下的 `package.json` 的平行目录
  - `npm install --registry=https://registry.npm.taobao.org`，安装需要的npm包
  - 全局安装webpack
  - 命令行执行webpack命令


## 记录
<font color=red>这些是我的记录，方便我查找</font>
- url-loader
  Loads files as base64 encoded URL
- html-webpack-plugin
  生成一个html文件，引用的js可以动态改变
- Manifest，生成一个源文件和输出文件对应关系的json文件
- webpack watch，webpack跟踪
- 打包的时候，如果不使用uglifyjs等压缩工具，所有的export都会被打包，尽管它没有被import,使用uglifyjs，会删除没有被引用的js文件中的export
- webpack --config webpack.prod.js
- 如果您正在使用像 react 这样的 library，那么在添加此 DefinePlugin 插件后，你应该看到 bundle 大小显著下降。
当使用 process.env.NODE_ENV === 'production' 时，一些 library 可能针对具体用户的环境进行代码优化，从而删除或添加一些重要代码。
- 任何位于 /src 的本地代码都可以关联到 process.env.NODE_ENV 环境变量
- webpack有官方的包分析工具
- 如果入口 chunks 之间包含重复的模块，那些重复模块都会被引入到各个 bundle 中。
CommonsChunkPlugin，将公用的模块生成一个单独的js文件（在有多入口文件的前提下）

- vue-router也可以懒加载
  部分js文件可以懒加载
  懒加载的意思是页面加载的时候，部分代码先不加载，用到这段代码的时候立即请求
- clean-webpack-plugin
  每次打包的时候清空文件夹
- html-webpack-plugin
  打包的时候生成一个html入口文件，这个html文件可以引用打包好的js文件
- 集成，webpack负责打包，任务执行可能需要Grunt等，这些工具可以相互配合使用

- file-loader 和 url-loader 可以接收并加载任何文件，然后将其输出到构建目录。
- 加载css要用到css-loader和style-loader
- 加载图片要用到file-loader

### 01_Getting Started
```js
// 01/03-useing a Configuration
var path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```


```js
// 01/04
var path = require('path')
// package.json
{
	...
	"scripts": {
	  "build": "webpack"
	}
	...
}
```


```js
// 01/04
var path = require('path')
// package.json
{
	...
	"scripts": {
	  "build": "webpack"
	}
	...
}
```


### 02-Asset Management
```js
// 01-loading CSS
var path = require('path')

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
```

```js
// 02-loading Images
var path = require('path')

var path = require('path')

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
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
}

```

### 03-管理输出

```js
// 01-HtmlWebpackPlugin
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: './src/index.js',
    print: './src/print.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management'
    })
  ]
}
```


### 04-开发

```js
// 01-使用 source map
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: './src/index.js',
    print: './src/print.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management'
    })
  ]
  ,
  // 添加这一句报错会定义文件在哪里
  devtool: 'inline-source-map'
}
```

#### 02-使用 webpack-dev-middleware
```js
// server.js
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});
```

```js
// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
    print: './src/print.js'
  },
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Output Management'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
    ,
    // http://localhost:3000/sss
    // publicPath: '/sss'
    // html文件引用静态资源会添加路径前缀
    publicPath: '/'
  }
};
```


### 05-生产环境构建

#### 01-简单生产和开发环境配置

```js
// package.json
{
  "name": "00-test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "webpack-dev-server --open --config webpack.dev.js",
    "build": "webpack --config webpack.prod.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "clean-webpack-plugin": "^0.1.17",
    "html-webpack-plugin": "^2.30.1",
    "uglifyjs-webpack-plugin": "^1.1.5",
    "webpack-dev-server": "^2.9.7",
    "webpack-merge": "^4.1.1"
  }
}
```

```js
// webpack.common.js
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: {
    app: './src/index.js'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Production'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

```js
// webpack.dev.js
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  }
});
```

```js
// webpack.prod.js
 const merge = require('webpack-merge');
 const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
 const common = require('./webpack.common.js');

 module.exports = merge(common, {
   devtool: 'source-map',
   plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    })
   ]
 });
```

### 06-代码分离

#### 01-CommonChunkPlugin防止重复引用
```js
// package.json
{
  "name": "00-test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "html-webpack-plugin": "^2.30.1"
  }
}
```


```js
// webpack.config.js
const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
    another: './src/another-module.js'
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'Code Splitting'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common' // 指定公共 bundle 的名称。
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```


### 07-懒加载

#### 01-示例

```js
// webpack.config.js
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js'
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'Code Splitting'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

### 09-创建Library

```js
// package.json
{
  "name": "eddietest",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "main": "dist/webpack-numbers.js",
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "lodash": "^4.17.4"
  },
  "scripts": {
    "build": "webpack"
  }
}
```


```js
// webpack.config.js
var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'webpack-numbers.js',
    library: 'webpackNumbers',
    library: 'webpackNumbers',
    libraryTarget: 'umd'
  },
  externals: {
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_'
    }
  }
};
```

