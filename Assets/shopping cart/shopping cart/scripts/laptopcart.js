$(function() {

    var cart = JSON.parse(sessionStorage.getItem('cart'));
    var sum = 0;
    var table = $("<table>");
    $("#cart-table").append(table);
    for (i = 0; i < cart.items.length; ++i) {
        var row = $("<tr>", { "class": "table-row" });
        table.append(row);
        //var laptop = $("<li>", { "class": "list-item" }).append(cart.items[i].item.name + "    -  $" + cart.items[i].item.price);
        //$("#cart-list").append(laptop);
        var data1 = $("<td>").append($("<img>", { "src": cart.items[i].item.src }));
        row.append(data1);
        var data2 = $("<td>").append(cart.items[i].item.name);
        row.append(data2);
        var data3 = $("<td>").append("$" + cart.items[i].item.price);
        row.append(data3);
        var data4 = $("<td>").append(cart.items[i].quantity);
        row.append(data4);
        var data5 = $("<td>").append("$" + (cart.items[i].item.price * cart.items[i].quantity).toString());
        row.append(data5);
        sum += cart.items[i].item.price * cart.items[i].quantity;
    }
    var data5 = $("<tr>");
    table.append(data5);
    var data6 = $("<td>").append("Total: $" + sum);
    data5.append(data6);

    $("#clear").click(function() {
        sessionStorage.clear();
        table.hide();
    });

});