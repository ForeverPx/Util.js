# Util.js
javascript常用工具函数集合
具体的函数参数可在源码中看

# 依赖
`Jquery`，`Handlebar`

# Examples

## formatDate
格式化日期
```js
    var date = new Date();
    Util.formatDate(date,'YYYY/MM/DD hh:mm:ss'); // 2014/11/12 11:12:13
```

## downLoadAttachFileByUrl
根据URL下载文件
```js
    Util.downLoadAttachFileByUrl('http://localhost:8080/download?id=123');
```

## biggerThan
浮点数比较
```js
    //默认精度为2，第三个参数为精度
    Util.biggerThan(1.32,1.31); // true
```

## createHtml
创建html片段
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

## getRootPath
获取url根路径
```js
    Util.getRootPath(); //  http://127.0.0.1:3000/xxx
```

## getInputsData
获取相同name的input的value
```html
    <form>
        <input name='answer' type='text' value=1/>
        <input name='answer' type='text' value=2/>
    </form>
```

```js
    Util.getInputsData('answer');  //1,2
```

## debounce
```js
    $('elem').on('input',Util.debounce(function(){
        //search or do something
    },300));
```

## scorllTo
```js
    var option = {
        acceleration: 0.1,
        time: 16,
        targetX: 0,
        targetY: 0
    };
            
    Util.scrollTo(option);
    
    //默认option
    Util.scrollTo();
```

## cutStrWhenLoaded
在页面加载完成时，裁剪过长的字符串
```html
    //给目标元素设置class='cut' data-text='' maxLen="xx"
    <span id='guideName' class='cut' maxLen="15" data-text="你好啊"></c:out></span>
```

```js
    $(function(){
        Util.cutStrWhenLoaded();
    });
```

## subString
中英文通用字符串截取
```js
    Util.subString("abc你好abc",'4'); // abc
    
    Util.subString("abc你好abc",'5'); // abc你
         
    Util.subString("abc你好abc",'5'，true); // abc你...    
```

