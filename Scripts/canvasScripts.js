var canvas = document.getElementById("coverCanvas");
var ctx = canvas.getContext("2d");
var painting = document.getElementById("contentDiv");
var paintStyle = getComputedStyle(painting);
canvas.width = parseInt(paintStyle.getPropertyValue("width"));
canvas.height = parseInt(paintStyle.getPropertyValue("height"));

var mouse = {
    x: 0,
    y: 0
};

canvas.addEventListener('mouseover', function (e) {
    console.log("Mouse Over");
    console.log("X: " + mouse.x + ", Y: " + mouse.y);
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
}, false);

ctx.lineWidth = 3;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.strokeStyle = 'Black';

canvas.addEventListener('mousedown', function (e) {
    console.log("Mouse Down, X: " + mouse.x + ", Y: " + mouse.y);
    ctx.beginPath();
    ctx.moveTo(mouse.x, mouse.y);
    canvas.addEventListener('mousemove', onPaint, false);
}, false);

canvas.addEventListener('mouseup', function () {
    console.log("Mouse Up");
    canvas.removeEventListener('mousemove', onPaint, false);
}, false);

var onPaint = function (e) {
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
    console.log("Paint, X: " + mouse.x + ", Y: " + mouse.y);
    ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();
};