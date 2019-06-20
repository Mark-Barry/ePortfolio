$(function () {

    $.ajax({
        type: "GET",
        url: "../Data/Books.csv",
        datatype: "text",
        success: function (data) {
            displayData(data);
        }
    });

    function displayData(data) {
        var bookList = $.csv.toObjects(data);
        var getBook = sessionStorage.getItem("book");
        for (var i = 0; i < bookList.length; ++i) {
            if (i == getBook) {
                let div = $("<div>", {
                    "class": "bookDiv",
                    "id": "book-" +
                        i
                });
                $(".contentDiv").append(div);

                /*Add the book image to the div  located to the left of the screen*/
                let bookImgDiv = $("<div>", {
                    "id": "bookImg"
                });
                $('.bookImgDiv').append(bookImgDiv);

                let br = $("<br>");

                let bookImg = $("<img>", {
                    "src": bookList[i].image,
                    "id": "bookImg"
                });
                bookImgDiv.append(bookImg);

                /*Contains the basic description for the book*/
                let bookDescDiv = $("<div>", {
                    "id": "bookDesc"
                });

                let book = $("<h2>", {
                    "id": "bookName"
                }).append(bookList[i].series + ": " + bookList[i].numberInSeries + ", " + bookList[i].name);

                $('.bookDescDiv').append(bookDescDiv);
                let bookDesc = $("<p>", {
                    "id": "desc"
                }).append(bookList[i].description);

                let bookDate = $("<p>", {
                    "id": "Date",
                    "class": "addCont"
                }).append("Date Published: " + bookList[i].datePublished);
                let bookISBN = $("<p>", {
                    "id": "ISBN",
                    "class": "addCont"
                }).append("ISBN: " + bookList[i].ISBN);

                bookDescDiv.append(book, br, bookDesc, br, bookDate, bookISBN);
            }
        }
    }

    $("#bookImg").click(function () {
        $(".bookImageDiv").css("display","block");
let displayImageSrc = $(this).attr("src");
$(".modal").css
    });
});