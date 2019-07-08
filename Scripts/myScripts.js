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
            })

            let br = $("<br>");

            if (count == 0) {
                let divSeries = $("<div>", {
                    "class": "seriesDiv"
                });
                let series = $("<h1>", {
                    "class": "seriesH1"
                }).append(bookList[i].series);
                $("#booksDiv").append(divSeries);
                divSeries.append(series);
            }
            if (count == 3) {
                let divSeries = $("<div>", {
                    "class": "seriesDiv"
                });
                let series = $("<h1>", {
                    "class": "seriesH1"
                }).append(bookList[i].series);
                $("#booksDiv").append(divSeries);
                divSeries.append(series);
            }
            if (count == 8) {
                let divSeries = $("<div>", {
                    "class": "seriesDiv3"
                });
                let series = $("<h1>", {
                    "class": "seriesH1"
                }).append(bookList[i].series);
                $("#booksDiv").append(divSeries);
                divSeries.append(series);
            }

            $("#booksDiv").append(div);

            let book = $("<h2>").append(bookList[i].series + ": " + bookList[i].numberInSeries + ", " + bookList[i].name);
            div.append(book);

            let bookLink = $("<a>", {
                "bookId": i,
                "href": "./book.html"
            });
            $(bookLink).click(function () {
                storeData($(this).attr('bookId'));
            });

            let bookImg = $("<img>", {
                "src": bookList[i].image,
                "class": "bookImg"
            });
            div.append(bookLink.append(bookImg));

            div.append(br);

            let bookISBN = $("<h3>").append("ISBN: " + bookList[i].ISBN);
            div.append(bookISBN);

            let bookDate = $("<h3>").append("Date Published: " + bookList[i].datePublished);
            div.append(bookDate);
            count += 1;
        }
    }

    function storeData(data) {
        sessionStorage.setItem("book", data);
    }
});

if ("serviceWorker" in navigator) {

	// Listen for the event when the windows is loading
	window.addEventListener("load", () => {

		navigator.serviceWorker
		// Register Service Worker file
		.register("../sw_cached_site.js")
		// Promise with the registration object
		.then(reg => console.log("SW Registered."))
		// Error handling
		.catch(err => console.log(`SW Error: ${err}`));

	});

} else {
	console.log("SW not supported.");
}