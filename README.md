# simple-react

> 通过构建一个类似react的框架学习下

## 初始化项目

安装依赖

```bash
npm init -y
npm i webpack webpack-cli webpack-dev-server babel-loader html-loader html-webpack-plugin @babel/core @babel/preset-env @babel/plugin-transform-react-jsx --save-dev
```

项目目录

```
simple-react
  |- src
    |- index.html
    |- index.js
```

配置webpack.config.js

```javascript
const HtmlWebPackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [['@babel/plugin-transform-react-jsx']]
          }
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.css$/i,
        use: [
          // The `injectType`  option can be avoided because it is default behaviour
          { loader: 'style-loader', options: { injectType: 'styleTag' } },
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    })
  ]
}
```

这里除了基本配置外，关键是 `@babel/plugin-transform-react-jsx` 这个插件。它有几个参数：

```javascript
{
  "presets": [
    [
      "@babel/preset-react",
      {
        "pragma": "dom", // default pragma is React.createElement
        "pragmaFrag": "DomFrag", // default is React.Fragment
        "throwIfNamespace": false // defaults to true
      }
    ]
  ]
}
```

