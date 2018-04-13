$util = {
    /**
    * 类型检测
    */
    type : function(obj){
        var rep = /\[object\s+(\w+)\]/i;
        var str = Object.prototype.toString.call(obj).toLowerCase();
        str.match(rep);
        return RegExp.$1;
    },
    /**
    * 深拷贝
    */
    $unlink :function (object){
        var unlinked;
        switch ($type(object)){
            case 'object':
                unlinked = {};
                for (var p in object) {
                    unlinked[p] = $unlink(object[p]);
                }
            break;
            case 'array':
                unlinked = [];
                for (var i = 0, l = object.length; i < l; i++) {
                    unlinked[i] = $unlink(object[i]);
                }
            break;
            default: return object;
        }
        return unlinked;
    },
    /**
    *Dom 相关操作
    */ 
    dom:{
        $: function(id) {
            return document.getElementById(id);
        },
        getStyle: function(obj, prop) {
            var style = obj.currentStyle || window.getComputedStyle(obj, '');
            if (obj.style.filter) {
                return obj.style.filter.match(/\d+/g)[0];
            }
            return style[prop];
        },
        setStyle: function(obj, prop, val) {
            switch (prop) {
            case 'opacity':
                if($util.client.browser.ie){
                    obj.style.filter = 'alpha(' + prop + '=' + val*100 + ')'    
                }else{
                    obj.style[prop] = val;
                }
                break;
            default:
                obj.style[prop] = val + 'px';
                break;
            }
        },
        setStyles: function(obj, props) {
            for (var prop in props) {
                switch (prop) {
                case 'opacity':
                    if($util.client.browser.ie){
                        obj.style.filter = 'alpha(' + prop + '=' + props[prop] + ')'        
                    }else{
                        obj.style[prop] = props[prop];
                    }
                    break;
                default:
                    obj.style[prop] = props[prop] + 'px';
                    break;
                }
            }
        }
    },
    /**
    *Event 事件相关
    */
    evt : {
        addEvent : function(oTarget, sEventType, fnHandler) {
            if (oTarget.addEventListener) {
                oTarget.addEventListener(sEventType, fnHandler, false);
            } else if (oTarget.attachEvent) {
                oTarget.attachEvent("on" + sEventType, fnHandler);
            } else {
                oTarget["on" + sEventType] = fnHandler;
            }
        },
        rmEvent : function removeEventHandler (oTarget, sEventType, fnHandler) {
            if (oTarget.removeEventListener) {
                oTarget.removeEventListener(sEventType, fnHandler, false);
            } else if (oTarget.detachEvent) {
                oTarget.detachEvent("on" + sEventType, fnHandler);
            } else { 
                oTarget["on" + sEventType] = null;
            }
        }
    },
    /**
    *Ajax 异步加载
    */
    ajax : {
        request:function (options) {
                var xhr, res;
                var url = options.url, 
                    context = options.context, 
                    success = options.success, 
                    type = options.type, 
                    datatype = options.datatype, 
                    async = options.async, 
                    send = options.send,
                    headers = options.headers;
                    
                try {
                    xhr = new XMLHttpRequest();
                } catch(e) {
                    try {
                        xhr = new ActiveXObject('MSXML2.XMLHTTP');
                    } catch(e) {
                        xhr = new ActiveXObject('Microsoft.XMLHTTP');
                    }
                }
                
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        res = xhr.responseText;
                        success(res);
                    }
                }
                xhr.open(type, url, async);
                xhr.send(send);
        }
    },
    /**
    *Array 数组相关
    */
    array : {
        minIndex : function(ary){
            return Math.min.apply(null,ary);    
        },
        maxitem : function(ary){
            return Math.max.apply(null,ary);
        }
    },
    /**
    *Client 客户端检测
    */
    client : function(){
        // 浏览器渲染引擎 engines
        var engine = {            
            ie: 0,
            gecko: 0,
            webkit: 0,
            khtml: 0,
            opera: 0,

            //complete version
            ver: null  
        };
        
        // 浏览器
        var browser = {
            //browsers
            ie: 0,
            firefox: 0,
            safari: 0,
            konq: 0,
            opera: 0,
            chrome: 0,
            //specific version
            ver: null
        };
        
        // 客户端平台platform/device/OS
        var system = {
            win: false,
            mac: false,
            x11: false,
            
            //移动设备
            iphone: false,
            ipod: false,
            ipad: false,
            ios: false,
            android: false,
            nokiaN: false,
            winMobile: false,
            
            //game systems
            wii: false,
            ps: false 
        };    

        // 检测浏览器引擎
        var ua = navigator.userAgent;    
        if (window.opera){
            engine.ver = browser.ver = window.opera.version();
            engine.opera = browser.opera = parseFloat(engine.ver);
        } else if (/AppleWebKit\/(\S+)/.test(ua)){
            engine.ver = RegExp["$1"];
            engine.webkit = parseFloat(engine.ver);
            
            //figure out if it's Chrome or Safari
            if (/Chrome\/(\S+)/.test(ua)){
                browser.ver = RegExp["$1"];
                browser.chrome = parseFloat(browser.ver);
            } else if (/Version\/(\S+)/.test(ua)){
                browser.ver = RegExp["$1"];
                browser.safari = parseFloat(browser.ver);
            } else {
                //approximate version
                var safariVersion = 1;
                if (engine.webkit < 100){
                    safariVersion = 1;
                } else if (engine.webkit < 312){
                    safariVersion = 1.2;
                } else if (engine.webkit < 412){
                    safariVersion = 1.3;
                } else {
                    safariVersion = 2;
                }   
                
                browser.safari = browser.ver = safariVersion;        
            }
        } else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)){
            engine.ver = browser.ver = RegExp["$1"];
            engine.khtml = browser.konq = parseFloat(engine.ver);
        } else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)){    
            engine.ver = RegExp["$1"];
            engine.gecko = parseFloat(engine.ver);
            
            //determine if it's Firefox
            if (/Firefox\/(\S+)/.test(ua)){
                browser.ver = RegExp["$1"];
                browser.firefox = parseFloat(browser.ver);
            }
        } else if (/MSIE ([^;]+)/.test(ua)){    
            engine.ver = browser.ver = RegExp["$1"];
            engine.ie = browser.ie = parseFloat(engine.ver);
        }
        
        //detect browsers
        browser.ie = engine.ie;
        browser.opera = engine.opera;
        

        //detect platform
        var p = navigator.platform;
        system.win = p.indexOf("Win") == 0;
        system.mac = p.indexOf("Mac") == 0;
        system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);

        //detect windows operating systems
        if (system.win){
            if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)){
                if (RegExp["$1"] == "NT"){
                    switch(RegExp["$2"]){
                        case "5.0":
                            system.win = "2000";
                            break;
                        case "5.1":
                            system.win = "XP";
                            break;
                        case "6.0":
                            system.win = "Vista";
                            break;
                        case "6.1":
                            system.win = "7";
                            break;
                        default:
                            system.win = "NT";
                            break;                
                    }                            
                } else if (RegExp["$1"] == "9x"){
                    system.win = "ME";
                } else {
                    system.win = RegExp["$1"];
                }
            }
        }
        
        //mobile devices
        system.iphone = ua.indexOf("iPhone") > -1;
        system.ipod = ua.indexOf("iPod") > -1;
        system.ipad = ua.indexOf("iPad") > -1;
        system.nokiaN = ua.indexOf("NokiaN") > -1;
        
        //windows mobile
        if (system.win == "CE"){
            system.winMobile = system.win;
        } else if (system.win == "Ph"){
            if(/Windows Phone OS (\d+.\d+)/.test(ua)){;
                system.win = "Phone";
                system.winMobile = parseFloat(RegExp["$1"]);
            }
        }

        //determine iOS version
        if (system.mac && ua.indexOf("Mobile") > -1){
            if (/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)){
                system.ios = parseFloat(RegExp.$1.replace("_", "."));
            } else {
                system.ios = 2;  //can't really detect - so guess
            }
        }
        
        //determine Android version
        if (/Android (\d+\.\d+)/.test(ua)){
            system.android = parseFloat(RegExp.$1);
        }
        
        //gaming systems
        system.wii = ua.indexOf("Wii") > -1;
        system.ps = /playstation/i.test(ua);
        
        //return it
        return {
            engine:     engine,
            browser:    browser,
            system:     system        
        };

    }(),
    /**
    *Tween 缓动相关
    */
    tween: {
        Linear: function(t, b, c, d) {
            return c * t / d + b;
        },
        Quad: {
            easeIn: function(t, b, c, d) {
                return c * (t /= d) * t + b;
            },
            easeOut: function(t, b, c, d) {
                return - c * (t /= d) * (t - 2) + b;
            },
            easeInOut: function(t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t + b;
                return - c / 2 * ((--t) * (t - 2) - 1) + b;
            }
        },
        Cubic: {
            easeIn: function(t, b, c, d) {
                return c * (t /= d) * t * t + b;
            },
            easeOut: function(t, b, c, d) {
                return c * ((t = t / d - 1) * t * t + 1) + b;
            },
            easeInOut: function(t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
                return c / 2 * ((t -= 2) * t * t + 2) + b;
            }
        },
        Quart: {
            easeIn: function(t, b, c, d) {
                return c * (t /= d) * t * t * t + b;
            },
            easeOut: function(t, b, c, d) {
                return - c * ((t = t / d - 1) * t * t * t - 1) + b;
            },
            easeInOut: function(t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
                return - c / 2 * ((t -= 2) * t * t * t - 2) + b;
            }
        },
        Quint: {
            easeIn: function(t, b, c, d) {
                return c * (t /= d) * t * t * t * t + b;
            },
            easeOut: function(t, b, c, d) {
                return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
            },
            easeInOut: function(t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
                return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
            }
        },
        Sine: {
            easeIn: function(t, b, c, d) {
                return - c * Math.cos(t / d * (Math.PI / 2)) + c + b;
            },
            easeOut: function(t, b, c, d) {
                return c * Math.sin(t / d * (Math.PI / 2)) + b;
            },
            easeInOut: function(t, b, c, d) {
                return - c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
            }
        },
        Expo: {
            easeIn: function(t, b, c, d) {
                return (t == 0) ? b: c * Math.pow(2, 10 * (t / d - 1)) + b;
            },
            easeOut: function(t, b, c, d) {
                return (t == d) ? b + c: c * ( - Math.pow(2, -10 * t / d) + 1) + b;
            },
            easeInOut: function(t, b, c, d) {
                if (t == 0) return b;
                if (t == d) return b + c;
                if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
                return c / 2 * ( - Math.pow(2, -10 * --t) + 2) + b;
            }
        },
        Circ: {
            easeIn: function(t, b, c, d) {
                return - c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
            },
            easeOut: function(t, b, c, d) {
                return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
            },
            easeInOut: function(t, b, c, d) {
                if ((t /= d / 2) < 1) return - c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
                return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
            }
        },
        Elastic: {
            easeIn: function(t, b, c, d, a, p) {
                if (t == 0) return b;
                if ((t /= d) == 1) return b + c;
                if (!p) p = d * .3;
                if (!a || a < Math.abs(c)) {
                    a = c;
                    var s = p / 4;
                } else var s = p / (2 * Math.PI) * Math.asin(c / a);
                return - (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            },
            easeOut: function(t, b, c, d, a, p) {
                if (t == 0) return b;
                if ((t /= d) == 1) return b + c;
                if (!p) p = d * .3;
                if (!a || a < Math.abs(c)) {
                    a = c;
                    var s = p / 4;
                } else var s = p / (2 * Math.PI) * Math.asin(c / a);
                return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
            },
            easeInOut: function(t, b, c, d, a, p) {
                if (t == 0) return b;
                if ((t /= d / 2) == 2) return b + c;
                if (!p) p = d * (.3 * 1.5);
                if (!a || a < Math.abs(c)) {
                    a = c;
                    var s = p / 4;
                } else var s = p / (2 * Math.PI) * Math.asin(c / a);
                if (t < 1) return - .5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
                return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
            }
        },
        Back: {
            easeIn: function(t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                return c * (t /= d) * t * ((s + 1) * t - s) + b;
            },
            easeOut: function(t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
            },
            easeInOut: function(t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
                return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
            }
        },
        Bounce: {
            easeIn: function(t, b, c, d) {
                return c - Tween.Bounce.easeOut(d - t, 0, c, d) + b;
            },
            easeOut: function(t, b, c, d) {
                if ((t /= d) < (1 / 2.75)) {
                    return c * (7.5625 * t * t) + b;
                } else if (t < (2 / 2.75)) {
                    return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
                } else if (t < (2.5 / 2.75)) {
                    return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
                } else {
                    return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
                }
            },
            easeInOut: function(t, b, c, d) {
                if (t < d / 2) return Tween.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
                else return Tween.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
            }
        }
    }

}