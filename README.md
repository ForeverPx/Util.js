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

## getCookie
根据key获取cookie的value
```js
    Util.getCookie('name');
```

## comAjaxCallBack
通用ajax返回处理，可针对statusCode做默认处理，也可定制化处理
```js
    Util.Ack = {
        200:'成功',
        400:function(data){
            //do something with data
        },
        500:'失败'
    };
    
    //返回的data中需要有statusCode
    $.post('',{},function(data){
        util.comAjaxCallBack(data,{
            //如果此处不配置200，则会alert出ACK中200对应的'成功'
            200:function(){
                //dosometing
            },
            //如果此处不配置400，则会执行ACK中400对应的function
            400:function(){
            
            }
        })
    });
```

## getUrlParam
根据key获取url中的参数
```js
    // http://www.a.com?username=123&age=234
    Util.getUrlParam('username'); //123
```

## createUUID
生成UUID
```js
    Util.createUUID();
```

## formatFileSize
格式化文件大小
```js
    //文件a的大小为1024B
    Util.formatFileSize(1024); // 1KB
```

## getScript
动态创建script或者link标签
```js
    Util.getScript("http://aa.js",function(){
    alert('success')},'UTF-8','script')
```

## isPlainObject
用于判断指定参数是否是一个纯粹的对象
```js
    Util.isPlainObject({});  //true
    Util.isPlainObject([]);  //false
```

## isInteger
判断是否为整数
```js
    Util.isInteger(1.1); //false
    Util.isInteger(2); //true
```



