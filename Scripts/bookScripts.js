//Quick way of declaring the onload funtionality
$(function () {

    //Set up some Ajax to pull data from a csv file
    $.ajax({
        type: "GET",
        url: "../Data/Books.csv",
        datatype: "text",
        success: function (data) {
            displayData(data);
        }
    });

    //This displays the data to the web page
    function displayData(data) {
        //first we create a list of book objects from the csv file
        var bookList = $.csv.toObjects(data);
        //Then we get the book id which was saved in the session storage from the onclick
        //used on the books.html page
        var getBook = sessionStorage.getItem("book");
        //Loop through the booklist
        for (var i = 0; i < bookList.length; ++i) {
            //If i is the same as the book that was clicked on then start printing that book
            if (i == getBook) {
                //Set up a div
                let div = $("<div>", {
                    "class": "bookDiv",
                    "id": "book-" +
                        i
                });
                //Append the new div to the one already on the .html page
                $(".booksDiv").append(div);

                /*Add the book image to the div  located to the left of the screen*/
                let bookImgDiv = $("<div>", {
                    "id": "bookImg"
                });
                $('.bookImgDiv').append(bookImgDiv);

                //Creating a simple break
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

                //From here on is all the information relating to the book
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

});