window.onload = window.onresize = function () {
    var windowW = document.body.clientWidth
    //iphone5 10px
    var htmlPx = windowW / 320 * 10
    document.getElementsByTagName("html")[0].style.fontSize = htmlPx + "px"
}
