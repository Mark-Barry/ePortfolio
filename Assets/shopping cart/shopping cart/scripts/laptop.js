$(function() {
    $.ajax({
        type: "GET",
        url: "./images/items.csv",
        dataType: "text",
        success: function(data) {
            display(data);
        }
    });

    function display(data) {
        var laptops = $.csv.toObjects(data);
        for (i = 0; i < laptops.length; ++i) {
            let div = $("<div>", { "class": "laptop" });
            $("#laptop-container").append(div);
            let image = $("<img>", { "src": laptops[i].src, "class": "cart" });
            div.append(image);
            div.append("<br>");
            div.append("<br>");
            div.append("<br>");
            let price = $("<input>", { "type": "button", "class": "price", "value": "$" + laptops[i].price });
            div.append(price);
            let addCart = $("<input>", { "type": "button", "value": "Add", "class": "add-item", "id": i });
            div.append(addCart);
        }
        $(".add-item").click(function() {
            addToCart($(this).attr("id"), laptops[$(this).attr("id")]);
        });

    }

    function addToCart(id, laptop) {
        var cart = JSON.parse(sessionStorage.getItem('cart'));
        var inList = false;
        //console.log(cart);
        if (cart == undefined) {
            cart = {
                    "items": [],
                    "total": 0
                }
                /*console.log(cart);
                cart.items[0] = {
                        "item": laptop,
                        "quantity": 0
                    }
                    //console.log(cart);*/
        }
        for (i = 0; i < cart.items.length; ++i) {
            if (id == cart.items[i].item.num) {
                cart.items[i].quantity += 1;
                console.log(cart);
                cart.total = (parseInt(cart.total) + parseInt(laptop.price)).toString();
                inList = true;
                break;
            }
        }
        //console.log(cart);
        if (!inList) {
            var jsonCart = {
                "item": laptop,
                "quantity": 1
            }
            cart.items.push(jsonCart);
            cart.total = (parseInt(cart.total) + parseInt(laptop.price)).toString();
        }
        console.log(cart);
        sessionStorage.setItem('cart', JSON.stringify(cart));
    }

    $("#happy-text").mouseenter(function() {
        $("#happy-text").animate({ fontSize: '40px' }, "fast");
        $("#happy-text").animate({ fontSize: '20px' }, "fast");
    });

});