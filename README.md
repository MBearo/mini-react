# simple-react

> 通过构建一个类似react的框架学习下

## 初始化项目

安装依赖

```bash
npm init -y
npm i parcel-bundler
```

项目目录

```
simple-react
  |- src
    |- index.html
    |- index.js
```

配置`.babelrc`

```json
{
  "presets": [
    [
      "@babel/preset-react",
      {
        //"pragma": "dom", // default pragma is React.createElement
        //"pragmaFrag": "DomFrag", // default is React.Fragment
        //"throwIfNamespace": false // defaults to true
      }
    ]
  ]
}
```

香还是 `parcel` 香
