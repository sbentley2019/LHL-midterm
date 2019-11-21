const fetchOrderId = function() {
  return $.ajax({
    method: "GET",
    url: "/api/session",
  });
};

const submitOrderItem = function(url, data) {
  return $.ajax({
    method: "POST",
    url: url,
    data,
  });
};

const retrieveOrderItem = function(order_id) {
  return $.ajax({
    method: "GET",
    url: '/order/' + order_id + "/loadMenuItems",
  });
};

const getOrderTotal = function(order_id) {
  return $.ajax({
    method: "GET",
    url: '/order/' + order_id + "/orderTotal",
  });
};

const removeOrderItem = function(data) {
  return $.ajax({
    method: "POST",
    url: '/order/' + data.order_id + "/deleteItem",
    data,
  });
};

const processCheckout = function(data) {
  return $.ajax({
    method: "POST",
    url: "/order/checkout",
    data
  });
};

const createOrderItem = function(menu_item) {
  return $(
    `<div class="order-card">
      <div class="order-item-description">
        <p class="order-item-quantity">${menu_item.quantity}</p>
        <p class="order-item-name">${menu_item.name}</p>
        <p class="order-item-price">$ ${menu_item.price}</p>
      </div>
    </div>`);
};


const clearRenderOrderItem = function() {
  $("#orders").empty();
};

const updateOrderTotal = function(orderTotal) {
  $('#checkout-total').text(`$ ${orderTotal || 0}`);
};

const renderOrderItem = function(menu_items) {
  for (const menu_item of menu_items) {
    const $order = createOrderItem(menu_item);
    $("#orders").prepend($order)

    /* Event Listener for order item hover state */
    $order.hover(function(event) {
      $(this).children().children('.order-item-price').html(`<button id ="remove-item">remove</button>`);

      /* Event Listener for remove order items */
      $("#remove-item").click(function(event) {

        removeOrderItem(menu_item).then(deleted => {

          console.log('deleted');
          clearRenderOrderItem();
          console.log('cleared');
          retrieveOrderItem(menu_item.order_id).then(menu_items => {
            renderOrderItem(menu_items);

            getOrderTotal(menu_item.order_id).then(orderTotal => {
              updateOrderTotal(orderTotal);
            });
          });
        });

      });

    }, function(event) {
      $("#remove-item").empty();
      $(this).children().children('.order-item-price').html(`$ ${menu_item.price}`);
    });
  }
};


$(() => {
  fetchOrderId().then(order_id => {
    retrieveOrderItem(order_id).then(menu_items => {
      renderOrderItem(menu_items);

      getOrderTotal(order_id).then(orderTotal => {
        updateOrderTotal(orderTotal);
      });
    });
  });

  /* Event Listener for Checkout */
  $("#checkout").click(function(event) {
    processCheckout();
  });


  /* Event Listener for Adding Items*/
  $("form.order-form").submit(function(event) {
    event.preventDefault();
    const url = this.action;
    const data = $(this).serialize();
    submitOrderItem(url, data).then(submited => {

      clearRenderOrderItem();

      retrieveOrderItem(submited.order_id).then(menu_items => {
        console.log(menu_items);
        renderOrderItem(menu_items);

        getOrderTotal(submited.order_id).then(orderTotal => {
          updateOrderTotal(orderTotal);
        });
      });

    });
  });

});
