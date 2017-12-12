//实现播放，暂停，时间
function Player(...args) {
    playerEl.apply(this, args)
    this.options = args[1]
        // console.log(args)
    this.controls = {}

    this.init()
}
$.extend(Player.prototype, playerEl.prototype, {
    init: function() {
        this.putInBox()
        this.insertControls()
        this.showTime()

    },
    playAndPause: function() {
        if (this.ele[0].paused) {
            this.ele[0].play()
            this.controls.playBtn.html('暂停')
        } else {
            this.ele[0].pause()
            this.controls.playBtn.html('播放')
        }
    },
    insertControls: function() {
        this.controls.playBtn = $('<button class="btn btn-success">').html(this.options.autoplay ? '暂停' : '播放')
        this.box.append(this.controls.playBtn)
        this.controls.playBtn.on('click', this.playAndPause.bind(this))

        //插入时长显示
        this.controls.time = $('<button class="btn btn-default"><span>00:00</span>/<span>00:00</span></button>').appendTo(this.box)

        if (this.type == 'video') {
            this.controls.fullscreen = $('<button class="btn btn-primary">全屏</button>').appendTo(this.box)
            this.controls.fullscreen.on("click", function() {
                this.launchFullscreen(this.ele[0])
            }.bind(this))
        }


    },
    showTime: function() {
        let that = this
        this.ele.on("canplay", function() {
            that.controls.time.find('span:last-child').html(that.formatTime(this.duration))

        })
        this.ele.on("timeupdate", function() {
            that.controls.time.find('span:first-child').html(that.formatTime(this.currentTime))

        })
    },
    formatTime: function(time) {
        var h = Math.floor(time / 3600)
        var m = Math.floor(time / 60) - h * 60
        var s = Math.floor(time) - h * 3600 - m * 60
        let _h = h > 9 ? h : '0' + h
        let _m = m > 9 ? m : '0' + m
        let _s = s > 9 ? s : '0' + s
        return time > 3600 ? _h + ':' + _m + ':' + _s : _m + ':' + _s
    },
    launchFullscreen: function(element) {
        //此方法不可以在異步任務中執行，否則火狐無法全屏
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        } else if (element.oRequestFullscreen) {
            element.oRequestFullscreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullScreen();
        } else {

            var docHtml = document.documentElement;
            var docBody = document.body;
            var videobox = document.getElementById('videobox');
            var cssText = 'width:100%;height:100%;overflow:hidden;';
            docHtml.style.cssText = cssText;
            docBody.style.cssText = cssText;
            videobox.style.cssText = cssText + ';' + 'margin:0px;padding:0px;';
            document.IsFullScreen = true;

        }
    },
    //退出全屏
    exitFullscreen: function() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.oRequestFullscreen) {
            document.oCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else {
            var docHtml = document.documentElement;
            var docBody = document.body;
            var videobox = document.getElementById('videobox');
            docHtml.style.cssText = "";
            docBody.style.cssText = "";
            videobox.style.cssText = "";
            document.IsFullScreen = false;
        }
    }
})