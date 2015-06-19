这是flux官方的一个例子,自己拿来学习用;

### webpack ###
1. 这是个神器,之前一直都用requirejs,其蛋疼的调试让人想死;
2. 对其中的代码做一些自己的记录
```js
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/dev-server',
    './js/index'
    ]
```
用上了webpack的**dev-server**和它著名的**react-hot-loader**,主要配置参考[这里](http://gaearon.github.io/react-hot-loader/getstarted/);

3. 输入文件配置
```js
    ...
  output: {
    path: __dirname,
    filename: 'bundle.js',
    // 作为引用的路径
    publicPath: '/static/'
    }
    ...
```
最终输出的文件名为**bundle.js**, 引用时的目录为 **/static/**,也就是说,你在html中引入**bundle.js**的时候是这样的
```html
<script src="/static/bundle.js"></script>
````

当然这个时候你在你的目录中是找不到/static/bundle.js的,因为webpack这里的处理都在内存中解决,当你一切完好了,直接执行

```shell
webpack -p --config=webpack.config.js #前提是你在有webpack.config.js这个目录下
```
4. loaders的说明
```js
{
    test: /\.jsx?$/,
        loaders: ['react-hot', 'babel?optional[]=runtime&stage=0'],
        include: path.join(__dirname, 'js')
}
```

**test**: 这一行表明的是该loader匹配哪些文件,比如这里就是匹配**js**或者**jsx**;

**loaders**: 这一行有着不止一个loader,执行顺序是从右到左,也就是说,对与所有的**js**和**jsx**文件,先进行babel的处理,然后交给react-hot;

**inlucde**: 这一行是表明在那个目录下工作,也可以换成**exclude**,也就是不包含哪个目录;


### ES6 ###
包含极多语法糖的ES版本,具体学习可以参考[阮一峰](http://es6.ruanyifeng.com/);

### ES6和Reactjs 0.13.x ###
1. 这个版本包含了一些变化,详情请见[这里](http://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html);
最明显的就是：　
>　In React 0.13.0 you no longer need to use React.createClass to create React components. If you have a transpiler you can use ES6 classes today. You can use the transpiler we ship with react-tools by making use of the harmony option: jsx --harmony.

2. **getInitialState: **这个函数在ES6中的reactjs中也不再有了,全部丢到这里
```js
  constructor(props) {
    super(props);

    this._onToggleComplete = this._onToggleComplete.bind(this);
    this._onDoubleClick = this._onDoubleClick.bind(this);
    this._onSave = this._onSave.bind(this);
    this._onDestroyClick = this._onDestroyClick.bind(this);

    this.state = {
      isEditing: false
    }

  }
```

### 后话 ###

现在对这个repo没有完全的了解,只是暂时改成了ES6+webpack的,下一阶段的目标是添加:
> 
1.  react-router;
2.  API数据交换;
3.  D3;
4.  .....
