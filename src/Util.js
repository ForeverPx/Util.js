/**
 * 工具类函数集合，
 * @Depens [Jquery,Handlebars]
 * @author foreverpx
 * @Date 2014-01-13
 */

Util = {};

/**
 * 工具类，一些常用的工具或初始化函数
 * @author foreverpx
 */
(function($, util) {
    /**
     * 时间格式化 返回格式化的时间
     * 格式：
     *    YYYY：4位年,如1993
     *　　YY：2位年,如93
     *　　MM：月份
     *　　DD：日期
     *　　hh：小时
     *　　mm：分钟
     *　　ss：秒钟
     *　　星期：星期，返回如 星期二
     *　　周：返回如 周二
     *　　week：英文星期全称，返回如 Saturday
     *　　www：三位英文星期，返回如 Sat
     * @method Util.formatDate
     * @param {object} date   可选参数，要格式化的data对象，没有则为当前时间
     * @param {string} fomat  格式化字符串，例如：'YYYY年MM月DD日 hh时mm分ss秒 星期' 'YYYY/MM/DD week' (中文为星期，英文为week)
     * @return {string} 返回格式化的字符串
     *
     * 例子:
     * @example
     *   formatDate(new Date("january 01,2012"));
     * @example
     *   formatDate(new Date());
     * @example
     *   formatDate('YYYY年MM月DD日 hh时mm分ss秒 星期 YYYY-MM-DD week');
     * @example
     *   formatDate(new Date("january 01,2012"),'YYYY年MM月DD日 hh时mm分ss秒 星期 YYYY/MM/DD week');
     */
    util.formatDate = function(date, format) {
        if (arguments.length < 2 && !date.getTime) {
            format = date;
            date = new Date();
        }
        typeof format != 'string' && (format = seewoLang.time_formate1);
        var week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', seewoLang.Day, seewoLang.One, seewoLang.Two, seewoLang.Three, seewoLang.Four, seewoLang.Five, seewoLang.Six];
        return format.replace(/YYYY|YY|MM|DD|hh|mm|ss|www|week/g, function(a) {
            switch (a) {
                case "YYYY":
                    return date.getFullYear();
                case "YY":
                    return (date.getFullYear() + "").slice(2);
                case "MM":
                    return (date.getMonth() + 1 +"").length < 2 ? "0"+( date.getMonth() + 1) : date.getMonth() + 1;
                case "DD":
                    return (date.getDate()+"").length < 2 ? "0"+date.getDate() : date.getDate();
                case "hh":
                    return (date.getHours()+"").length < 2 ? "0"+date.getHours() : date.getHours();
                case "mm":
                    return (date.getMinutes()+"").length < 2 ? "0"+ date.getMinutes() : date.getMinutes();
                case "ss":
                    return (date.getSeconds()+"").length < 2 ? "0"+ date.getSeconds() : date.getSeconds();
                case "星期":
                    return "星期" + week[date.getDay() + 7];
                case seewoLang.Week:
                    return seewoLang.Week + week[date.getDay() + 7];
                case "week":
                    return week[date.getDay()];
                case "www":
                    return week[date.getDay()].slice(0, 3);
            }
        });
    };

    /**
     * 下载附件
     * @method Util.downloadAttachFile
     * @param  {string} [url] 附件的下载URL，不传时使用默认值
     */
    util.downLoadAttachFileByUrl = function(url){
        var url = url ? url : '/download';
        var elemIF = document.createElement("iframe");
        elemIF.src = url;
        elemIF.style.display = "none";
        document.body.appendChild(elemIF);
    };

    /**
     * 重置（清空）表单数据 （不清空元素上带有 "except=1" 的元素）
     * @method Util.resetForm
     * @param {string} formId 表单的id
     */
    util.resetForm = function(formId) {
        var inputs = $("#" + formId + " input");
        var selects = $("#" + formId + " select");
        $("#" + formId)[0].reset();
        for (var i = 0; i < inputs.length; i++) {
            if ($(inputs[i]).attr("except") != "1") {
                $(inputs[i]).val("");
            }
        }
        for (var i = 0; i < selects.length; i++) {
            if ($(selects[i]).attr("except") != "1") {
                $(selects[i]).val("");
            }
        }
    };

    /**
     * 比较两个浮点数（支持字符串数字），如果前者大于后者，则返回true，否则false
     * @method Util.biggerThan
     * @param {float} doubleNum1
     * @param {float} doubleNum2
     * @param {string} opt_precision 精确度，默认2
     * @returns {boolean} true or false
     */
    util.biggerThan = function(doubleNum1, doubleNum2, opt_precision) {
        opt_precision = opt_precision || 2;
        return parseInt(parseFloat(doubleNum1) * Math.pow(10, opt_precision)) > parseInt(parseFloat(doubleNum2) * Math.pow(10, opt_precision));
    };

    /**
     * 根据模板创建html，依赖于Handlebars.js
     * @method Util.createHtml
     * @param  {string} tempId  模板ID
     * @param  {object} options 参数
     * @return {string} html
     */
    util.createHtml = function(tempId, options) {
        if (!tempId) {
            throw new Error("tempId is null or undefined");
            return "";
        }
        var source = $("#" + tempId).html();
        if (!source) {
            throw new Error("source not found");
            return "";
        }
        var template = Handlebars.compile(source);
        if (typeof options != 'object') {
            throw new Error("options is not a object");
            return "";
        }
        var html = template(options);
        return html;
    };

    /**
     * 获取网站的baseUrl
     * @method  Util.getRootPath
     * @return {string} 
     */
    util.getRootPath = function() {
        // 获取当前网址，如： http://localhost:8080/iclass/edu/teacher/task.jsp
        var curWwwPath = window.document.location.href;
        // 获取主机地址之后的目录，如： iclass/edu/teacher/task.jsp
        var pathName = window.document.location.pathname;
        var pos = curWwwPath.indexOf(pathName);
        // 获取主机地址，如： http://localhost:8080
        var localhostPaht = curWwwPath.substring(0, pos);
        // 获取带"/"的项目名，如：/iclass
        var projectName = pathName.substring(0,
            pathName.substr(1).indexOf('/') + 1);
        return (localhostPaht + projectName);
    };

    /**
     * 获取name相同的input的数据,并连接成一个字符串，以“，”分割
     * @method Util.getInputsData
     * @param {string} name input的name属性值
     * @returns {string} value,value,value,.....
     */
    util.getInputsData = function(name) {
        var inputs = $("input[name='" + name + "']");
        var strArr = [];
        for (var i = 0; i < inputs.length; i++) {
            strArr.push($(inputs[i]).val());
        }
        return strArr.join(",");
    };

    /**
     * 高频执行方法的防抖
     * @method Util.debounce
     * @param  {function} func      需要高频执行的函数
     * @param  {string} wait      执行间隔时间
     * @param  {boolean} immediate 是否立刻执行
     */
    util.debounce = function(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this,
                args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    /**
     * 滑动页面视窗到顶部
     * @method Util.scrollTo
     */
    util.scrollTo = function(options) {
        var option = {
            acceleration: 0.1,
            time: 16,
            targetX: 0,
            targetY: 0
        };

        var option = $.extend(option, options);

        var x1 = 0;
        var y1 = 0;
        var x2 = 0;
        var y2 = 0;
        var x3 = 0;
        var y3 = 0;

        if (document.documentElement) {
            x1 = document.documentElement.scrollLeft || 0;
            y1 = document.documentElement.scrollTop || 0;
        }
        if (document.body) {
            x2 = document.body.scrollLeft || 0;
            y2 = document.body.scrollTop || 0;
        }
        var x3 = window.scrollX || 0;
        var y3 = window.scrollY || 0;

        // 滚动条到页面顶部的水平距离
        var x = Math.max(x1, Math.max(x2, x3));
        // 滚动条到页面顶部的垂直距离
        var y = Math.max(y1, Math.max(y2, y3));

        // 滚动距离 = 目前距离 / 速度, 因为距离原来越小, 速度是大于 1 的数, 所以滚动距离会越来越小
        var speed = 1 + option.acceleration;
        window.scrollTo(Math.floor(x / speed), Math.floor(y / speed));

        // 如果距离不为零, 继续调用迭代本函数
        if (x > option.targetX || y > option.targetY) {
            window.setTimeout(function() {
                Util.scrollTo(option);
            }, option.time);
        }
    };

    /**
     * 在页面加载完时截取字符串长度
     * @method Util.cutStrWhenLoaded
     * @example
     *     <span id='guideName' class='cut' maxLen="15" data-text="你好啊"></c:out></span>
     */
    util.cutStrWhenLoaded = function() {
        var elems = $(".cut");
        for (var i = 0; i < elems.length; i++) {
            var elem = $(elems[i]);
            var maxLen = elem.attr("maxLen");
            var srcString = elem.attr("data-text");
            if (typeof srcString == "string") {
                var srcLen = srcString.length;
                if (srcLen > maxLen) {
                    srcString = Util.subString(srcString,maxLen,true);
                }
            }
            elem.html(srcString);
        }
    };

    /**
     * 自定义截取字符串长度
     * @method  Util.cutStr
     * @param  {string} str 原字符串
     * @param  {int} len 保留长度
     * @return {string} string
     */
    util.cutStr = function(str, len) {
        return str.substring(0, len) + "...";
    };

    /**
     * subString 通用中英文截取
     * @method Util.subString
     * @param  {string}  str 原字符串
     * @param  {int}  len 保留长度
     * @param  {Boolean} hasDot 是否在结尾加上“...”
     * @return {string} string
     */
    util.subString = function(str, len, hasDot){
        var newLength = 0;
        var newStr = "";
        var chineseRegex = /[^\x00-\xff]/g;
        var singleChar = "";
        var strLength = str.replace(chineseRegex,"**").length;
        for(var i = 0;i < strLength;i++) {
            singleChar = str.charAt(i).toString();
            if(singleChar.match(chineseRegex) != null) {
                newLength += 2;
            }else{
                newLength++;
            }

            if(newLength > len) {
                break;
            }
            newStr += singleChar;
        };

        if(hasDot && strLength > len) {
            newStr += "...";
        };
        return newStr;
    };

    /**
     * 验证码倒计时模块
     * @method  SC.util.autoTime
     * @param {jq object} selector 倒计时显示的元素
     * @param {int} time 倒计时总时间
     */
    util.autoTime = function(selector,time){
        $(selector).removeClass("btn-primary").addClass("btn-default").html(time);
        $(selector).attr("disabled","disabled");
        time -- ;
        if(time > 0){
            setTimeout(function(){
                Util.autoTime(selector,time);
            }, 1000);
        }else{
            $(selector).removeClass("btn-default").addClass("btn-primary").html("重新发送");
            $(selector).removeAttr("disabled");
            time = 60;
        }
    };

    /**
     * 根据key获取cookie的值
     * @method  Util.getCookie
     * @param {string} cname cookie的key
     * @return {string} cookie的值
     */
    util.getCookie = function(cname){
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
        }
        return "";
    };

    /**
     * 请求的状态值，true为正在请求，false为请求结束，配合Util.checkProcessing使用
     * @property {boolean} Util.isProcessing
     */
    util.isProcessing = false;

    /**
     * 检查是否有请求在执行中
     * @method Util.checkProcessing
     * @return {boolean} 如果正在执行，返回true，否则返回fals
     */
    util.checkProcessing = function(){
        if(Util.isProcessing){
            //此处可自定义提示
            alert('正在处理中');
            return true;
        }
        Util.isProcessing = true;//开始执行
        return false;
    };

    /**
     * 通用ajax的callback,所有ajax的返回由此函数处理
     * @method Util.comAjaxCallBack
     * @param  {object} data   ajax返回的data
     * @param  {object} option 自定义状态码处理
     * @example
     *     $.post("","",function(data){
     *         Util.comAjaxCallBack(data,{
     *             200:function(data){},
     *             300:function(data){},
     *             .....
     *         })
     *     });
     */
    util.comAjaxCallBack = function(data,option){
        data = typeof data == "string" ? JSON.parse(data) : data;
        for(var p in Util.Ack){
            if(p == data.statusCode){
                var type = typeof Util.Ack[p];
                if(option[p]){
                    option[p](data);
                }else if(type == 'function'){
                    Util.Ack[p](data);
                }else if(type == 'string'){
                    if(data.message){
                        toastr.error(data.message);
                    }else{
                        toastr.error(Util.Ack[p]);
                    }
                }
                Util.isProcessing = false;
            }
        }
        Util.isProcessing = false;
    };

    util.Ack = {
        200:'成功',
        400:function(data){
            //do something with data
        },
        500:'失败'
    };

    /**
     * 获取URL中的参数的值
     * @method  Util.getUrlParam
     * @param {string} paras 参数key
     * @returns {string} 返回参数的value
     */
    util.getUrlParam = function(paras){
        var url = location.href;
        var paraString = url.substring(url.indexOf("?")+1,url.length).split("&");
        var paraObj = {}
        for (i=0; j=paraString[i]; i++){
            paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length);
        }
        var returnValue = paraObj[paras.toLowerCase()];
        if(typeof(returnValue)=="undefined"){
            return "";
        }else{
            return returnValue;
        }
    };

    /**
     * 动态创建唯一的ID
     * @method  Util.createUUID
     * @return {string} UUID
     */
    util.createUUID = (function (uuidRegEx, uuidReplacer) {
        return function () {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(uuidRegEx, uuidReplacer).toUpperCase();
        };
    })(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == "x" ? r : (r & 3 | 8);
        return v.toString(16);
    });

    /**
     * 格式化文件大小
     * @param  {[type]} size [description]
     * @return {[type]}      [description]
     */
    util.formatFileSize = function(size) {
        var string;
        if (size >= 1024 * 1024 * 1024 * 1024 / 10) {
            size = size / (1024 * 1024 * 1024 * 1024 / 10);
            string = "TB";
        } else if (size >= 1024 * 1024 * 1024 / 10) {
            size = size / (1024 * 1024 * 1024 / 10);
            string = "GB";
        } else if (size >= 1024 * 1024 / 10) {
            size = size / (1024 * 1024 / 10);
            string = "MB";
        } else if (size >= 1024 / 10) {
            size = size / (1024 / 10);
            string = "KB";
        } else {
            size = size * 10;
            string = "b";
        }
        return "<strong>" + (Math.round(size) / 10) + "</strong> " + string;
    };

    /**
    * 动态创建script或者link标签
    */
    util.getScript = function(url,success,charset,type){
        var isCSS = type == "css" ?  true : /\.css(?:\?|$)/i.test(url),
            node = window.document.createElement(isCSS ? 'link' : 'script'),
            config = success,
            error,
            timeout,
            timer;
        if(Util.isPlainObject(config)){
            success = config.success;
            error = config.error;
            timeout = config.timeout;
            charset = config.charset;
        }

        if(isCSS){
            node.href = url;
            node.rel = "stylesheet";
        }else{
            node.src = url;
            node.async = true;
        }

        if(charset) node.charset = charset;

        if(isCSS){
            $.isFunction(success) && success.call(node);
        }else{
            Util.scriptOnload(node, function() {
                if (timer) {
                    timer.cancel();
                    timer = "undefined";
                }

                $.isFunction(success) && success.call(node);
            });
        }

        if($.isFunction(error)){
            timer = setTimeout(function(){
                timer = "undefined";
                error();
            },2000);
        }

        var head = window.document.getElementsByTagName('head')[0];
        $(node).insertBefore(head.lastChild)
        //document.insertBefore(node, head.lastChild);
        return node;
    };

    /**
    * 用于判断指定参数是否是一个纯粹的对象
    */
    util.isPlainObject = function(o){
        /**
         * isPlainObject(node=document.getElementById("xx")) -> false
         * toString.call(node) : ie678 == '[object Object]',other =='[object HTMLElement]'
         * 'isPrototypeOf' in node : ie678 === false ,other === true
         */
        return o && toString.call(o) === '[object Object]' && 'isPrototypeOf' in o;
    };

    /**
    * 用于script标签加载完成后的回调
    */
    util.scriptOnload = window.document.createElement('script').readyState ?
        function(node, callback) {
            var oldCallback = node.onreadystatechange;
            node.onreadystatechange = function() {
                var rs = node.readyState;
                if (rs === 'loaded' || rs === 'complete') {
                    node.onreadystatechange = null;
                    oldCallback && oldCallback();
                    callback.call(this);
                }
            };
        } :
        function(node, callback) {
            node.addEventListener('load', callback, false);
        };

    util.ValiReg = {
        "match": /^(.+?)(\d+)-(\d+)$/,
        "*": /[\w\W]+/,
        "*6-16": /^[\w\W]{6,16}$/,
        "n": /^\d+$/,
        "n6-16": /^\d{6,16}$/,
        "s": /^[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]+$/,
        "s6-18": /^[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]{6,18}$/,
        "p": /^[0-9]{6}$/,
        "m": /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$/,
        "e": /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
        "url": /^(\w+:\/\/)?\w+(\.\w+)+.*$/,
        "doubleNum": /^\d+(\.\d+)?$/gi,
        "fileName":/^[^/\\\\:\\*\\?\\<\\>\\|\"]{1,100}$/,
        "phone":/^((13[0-9])|(15[^4,\D])|(18[0-9]))\d{8}$/
    };

    /**
     * 判断是否为整数
     * @param target
     */
    util.isInteger = function(target){
        return typeof target === "number" && target%1 === 0;
    };
})($, Util);
