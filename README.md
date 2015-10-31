# Util.js
javascript常用工具函数集合
具体的函数参数可在源码中看

# 依赖
`Jquery`，`Handlebar`

# Examples

## formatDate
```js
    var date = new Date();
    Util.formatDate(date,'YYYY/MM/DD hh:mm:ss'); // 2014/11/12 11:12:13
```

## downLoadAttachFileByUrl
```js
    Util.downLoadAttachFileByUrl('http://localhost:8080/download?id=123');
```

## biggerThan
```js
    //默认精度为2，第三个参数为精度
    Util.biggerThan(1.32,1.31); // true
```

## createHtml
```html
    <script id="item" type="text/x-handlebars-template">
    	<dd type="{{type}}">
    		<a href="javascript:void(0);" data="{{id}}" class="{{status}}">{{key}}</a>
    	</dd>
    </script>
```

```js
    //此处用了handlebar
    Util.createHtml('item',{
        type:'product',
        id:'123',
        status:'345',
        key:'678'
    });
```



