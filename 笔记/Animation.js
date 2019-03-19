var animation = function(obj) {
    this.obj = obj;
    this.frames = 0;
    this.timmer = undefined;
    this.running = false;
    this.ms = [];
}

animation.prototype = {
    fps: 36,
    init: function(props, duration, tween) {
        //console.log('初始化');
        this.curframe = 0;
        this.initstate = {};
        this.props = props;
        this.duration = duration || 1000;
        this.tween = tween || function(t, b, c, d) {
            return t * c / d + b;
        };
        this.frames = Math.ceil(this.duration * this.fps/1000);
        for (var prop in this.props) {
            this.initstate[prop] = {
                from: parseFloat($util.dom.getStyle(this.obj, prop)),
                to: parseFloat(this.props[prop])
            };
        }
    },
    start: function() {
        if (!this.running && this.hasNext()) {
            //console.log('可以执行...');
            this.ms.shift().call(this)
        }
        return this;
    },
    //开始播放
    play: function(callback) {
        //console.log('开始动画！');
        var that = this;

        this.running = true;

        if (this.timmer) {
            this.stop();
        }

        this.timmer = setInterval(function() {
            if (that.complete()) {
                that.stop();
                that.running = false;
                if (callback) {
                    callback.call(that);
                }
                return;
            }
            that.curframe++;
            that.enterFrame.call(that);
        },this.fps);

        return this;
    },
    // 停止动画
    stop: function() {
        //console.log('结束动画！');
        if (this.timmer) {
            clearInterval(this.timmer);
            // 清除掉timmer id
            this.timmer = undefined;
        }

    },
    go: function(props, duration, tween) {
        var that = this;
        //console.log(tween)
        this.ms.push(function() {
            that.init.call(that, props, duration, tween);
            that.play.call(that, that.start);
        });
        return this;
    },
    //向后一帧
    next: function() {
        this.stop();
        this.curframe++;
        this.curframe = this.curframe > this.frames ? this.frames: this.curframe;
        this.enterFrame.call(this);
    },
    //向前一帧
    prev: function() {
        this.stop();
        this.curframe--;
        this.curframe = this.curframe < 0 ? 0 : this.curframe;
        this.enterFrame.call(this);
    },
    //跳跃到指定帧并播放
    gotoAndPlay: function(frame) {
        this.stop();
        this.curframe = frame;
        this.play.call(this);
    },
    //跳到指定帧停止播放
    gotoAndStop: function(frame) {
        this.stop();
        this.curframe = frame;
        this.enterFrame.call(this);
    },
    //进入帧动作
    enterFrame: function() {
        //console.log('进入帧：' + this.curframe)
        var ds;
        for (var prop in this.initstate) {
            //console.log('from: ' + this.initstate[prop]['from'])
            ds = this.tween(this.curframe, this.initstate[prop]['from'], this.initstate[prop]['to'] - this.initstate[prop]['from'], this.frames).toFixed(2);
            //console.log(prop + ':' + ds)
            $util.dom.setStyle(this.obj, prop, ds)
        }
    },
    //动画结束
    complete: function() {
        return this.curframe >= this.frames;
    },
    hasNext: function() {
        return this.ms.length > 0;
    }
}