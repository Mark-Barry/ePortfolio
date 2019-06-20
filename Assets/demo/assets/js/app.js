jQuery(document).ready(function($) {

	//
	// Generate items from the given .csv file
	constructCart();

	//
	// Display items from the cart
	displayCart();

	//
	// This function generates the items from the .csv files. Each item is represented in JSON format e.g.
	// { Brand: "Samsung", Model: "One", Codename: "Best in the house", Price: "325.99", URL: "tablet1.jpg" }
	function constructCart() {
		$.ajax({
			url: "/practice0/assets/ds/tablets.csv", // TODO: UPDATE WITH YOUR PATH
			type: "GET"
		})
		.done(function(responseData) {

			//
			// Convert string from the .csv file into an array of objects using jQuery.csv library
			var productsArray = $.csv.toObjects(responseData);

			//
			// Access the products from the products array created above
			for (i=0; i < productsArray.length; i++) {

				//
				// Specify the destination for the generated HTML to be injected
				let outputDestination = $("#products");

				//
				// Generate HTML and populate it with data from the products array
				outputContent =
				"<div class='product'>" +
					"<h6>" + productsArray[i]["Codename"] + "</h6>" +
					"<ul>" + 
						"<li>" + "Brand: "  + productsArray[i]["Brand"] + "</li>" +
						"<li>" + "Model: "  + productsArray[i]["Model"] + "</li>" +
						"<li>" + "Price: £" + productsArray[i]["Price"] + "</li>" +
					"</ul>" +
					"<img src='/practice0/assets/img/" + productsArray[i]["URL"] + "' alt='" + productsArray[i]["Codename"] + "'>" + // TODO: UPDATE WITH YOUR PATH
					"<p>" +
						"<input onClick='addItemToCart(" + i + ")' type='submit' name='add-to-cart' id='" + i + "' value='Add " + productsArray[i]["Model"] + " to cart'>" +
					"</p>" +
				"</div>";

				//
				// Write the generated HTML from above into the specified #products container
				outputDestination.append(outputContent);

			};

		})
		.fail(function(responseData) {

			//
			// Display descriptive error message if the connection was not made with .csv file
			console.log(responseData);

		});
	};

	//
	// This function displays the content of the stored products in the session storage
	// Added previously by the addItemToCart function that is defined below
	function displayCart() {

		$.ajax({
			url: "/practice0/assets/ds/tablets.csv",
			type: "GET",
			dataType: "text"
		})
		.done(function(responseData) {

			//
			// Convert string from the .csv file into an array of objects using jQuery.csv library
			var productsArray = $.csv.toObjects(responseData);

			//
			// Access the products from the session storage
			for (let i in productsArray) {

				//
				// Skip products that have not been added to the session storage cart
				if (typeof sessionStorage[i] !== "undefined") {

					//
					// Convert product from session storage into object
					let productToJson = JSON.parse(sessionStorage[i]);

					//
					// Specify the destination for the generated HTML to be injected
					let outputDestination = $("#cart");

					//
					// Calculate the total price of each product in the cart
					let outputTotalPrice = (Number(productToJson["qty"]) * Number(productsArray[productToJson["id"]]["Price"])).toFixed(2);

					let outputContent =
					"<tr>" +
						"<td>" + productsArray[productToJson["id"]]["Brand"] + "</td>" +
						"<td>" + productsArray[productToJson["id"]]["Model"] + "</td>" +
						"<td>" + productsArray[productToJson["id"]]["Codename"] + "</td>" +
						"<td>" + productsArray[productToJson["id"]]["Price"] + "</td>" +
						"<td>" + productToJson["qty"] + "</td>" +
						"<td>" + outputTotalPrice + "</td>" +
					"</tr>";

					//
					// Write the generated HTML from above into the specified #cart container
					outputDestination.append(outputContent);

				};

			};

		})
		.fail(function(responseData) {

			//
			// Display descriptive error message if the connection was not made with .csv file
			console.log(responseData);

		});

	};

});

// This function adds items and increments quantity of item into the session storage
// It stores each item as a separate entry in the session storage e.g. {"id": 0, "qty": 1}
function addItemToCart(id) {

	// Check if item exists in the session storage
	if (sessionStorage.getItem(id) == null) {

		// Create a new item object
		let newItem = {
			"id": id,
			"qty": 1
		};

		// Convert item object to string
		let objectToString = JSON.stringify(newItem);

		// Insert new item to the session storage
		sessionStorage.setItem(id, objectToString);

	} else {

		// Get the item from session storage as a string
		item = sessionStorage.getItem(id);

		// Convert item string into object
		itemToJSON = JSON.parse(item);

		// Get the quantity value of the item
		itemQtyValue = itemToJSON["qty"];

		// Increment the item quantity value by 1
		itemToJSON["qty"] = itemQtyValue + 1;

		// Convert item object back to string
		itemToString = JSON.stringify(itemToJSON);

		// Update item in the session storage
		sessionStorage.removeItem(id);
		sessionStorage.setItem(id, itemToString);

	};

};
