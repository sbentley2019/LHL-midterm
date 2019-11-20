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

const renderOrderItem = function(menu_items) {
  for (const menu_item of menu_items) {
    $("#orders").prepend(createOrderItem(menu_item));
  }
};

const getOrderTotal = function(order_id) {
  return $.ajax({
    method: "GET",
    url: '/order/' + order_id + "/orderTotal",
  });
};

const clearRenderOrderItem = function() {
  $("#orders").children().detach();
};

const updateOrderTotal = function(orderTotal) {
  $('#checkout-total').text(`$ ${orderTotal || 0}`);
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

  $("form").submit(function(event) {
    event.preventDefault();
    const url = this.action;
    const data = $(this).serialize();
    submitOrderItem(url, data).then(submited => {
      clearRenderOrderItem();

      retrieveOrderItem(submited.order_id).then(menu_items => {
        renderOrderItem(menu_items);

        getOrderTotal(submited.order_id).then(orderTotal => {
          updateOrderTotal(orderTotal);
        });
      });


    }
    );
  });
});
