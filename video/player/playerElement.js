//生成一个对应播放器的标签
function playerEl(selector, options) {
    this.box = $(selector) //放置标签的容器
    this.ele = $('<' + options.type + ' ' + (options.autoplay ? 'autoplay' : '') + '  width="' + options.width + '">') //媒体标签
    this.ele.css({ 'display': 'block' })
    this.type = options.type
    this.sources = options.sources

}
playerEl.prototype = {
    insertSources: function() { //生成内部资源代码
        let str = ''
        for (const type in this.sources) {
            str +=
                `
            <source src="${this.sources[type]}" type='${this.type}/${type}'>
            `
        }
        return str
    },
    putSources: function() { //放入媒体资源
        let str = this.insertSources()
        this.ele.html(str)
    },
    putInBox: function() {
        this.putSources()
        this.box.append(this.ele)
    }
}