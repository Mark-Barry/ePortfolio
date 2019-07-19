// This pages contains all the javascript for the canvas application to work 
// on the DesignACover.html page.
// Basically it controls all the heavy lifting

//First of all set up some variables to use
//This gets the canvas based on the canvas's id set in the html
var canvas = document.getElementById("coverCanvas");
//This sets the type of canvas it is, 2D
var ctx = canvas.getContext("2d");
//This gets the area to paint to, the same as the canvas.
var painting = document.getElementById("coverCanvas");
//This sets up the area to paint on
var paintStyle = window.getComputedStyle(painting);
//This is a place holder for a changing variable for an image
var image;
canvas.width = parseInt(paintStyle.getPropertyValue("width"));
canvas.height = parseInt(paintStyle.getPropertyValue("height"));

var mouse = {
    x: 0,
    y: 0
};

canvas.addEventListener('mouseover', function (e) {
    // console.log("Mouse Over");
    // console.log("X: " + mouse.x + ", Y: " + mouse.y);
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
}, false);

ctx.lineWidth = 3;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.strokeStyle = 'Black';

canvas.addEventListener('mousedown', function (e) {
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
    // console.log("Mouse Down, X: " + mouse.x + ", Y: " + mouse.y);
    ctx.beginPath();
    ctx.moveTo(mouse.x, mouse.y);
    canvas.addEventListener('mousemove', onPaint, false);
}, false);

canvas.addEventListener('mouseup', function () {
    // console.log("Mouse Up");
    canvas.removeEventListener('mousemove', onPaint, false);
}, false);

var onPaint = function (e) {
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
    // console.log("Paint, X: " + mouse.x + ", Y: " + mouse.y);
    ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();
};


function changeSize(e) {
    ctx.lineWidth = e;
}

function changeColor(e) {
    ctx.strokeStyle = e;
}

function clearArea() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function imageToDraw(e) {
    console.log("Book " + e + " clicked.");
    ctx.drawImage(e,0,0);
}


$(function () {
    $.ajax({
        type: "GET",
        url: "../Data/Books.csv",
        dataType: "text",
        success: function (data) {
            displayData(data);
        }
    });

    var count = 0;

    function displayData(data) {
        var bookList = $.csv.toObjects(data);
        for (var i = 0; i < bookList.length; ++i) {

            let div = $("<div>", {
                "class": "bookDiv",
                "id": "book-" +
                    i,
            });

            let br = $("<br>");

            $("#drawBookDiv").append(div);

            let bookImg = $("<img>", {
                "src": bookList[i].image,
                "class": "bookImg"
            });
            
            div.append(bookImg);

            $(bookImg).click(function () {
                imageToDraw($(this).attr('src'));
            });
        }
    }
});