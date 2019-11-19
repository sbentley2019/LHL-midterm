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
    `<section class="order-card">
      <img src="${menu_item.image_url}">
        <header>${menu_item.name}</header>
        <div>
          <p>Price ${menu_item.price}</p>
        </div>
        <div>
          <p>Quantity ${menu_item.quantity}</p>
        </div>
      </div>
    </section>`);
};

const renderOrderItem = function(menu_items) {
  for (const menu_item of menu_items) {
    $("#orders").prepend(createOrderItem(menu_item));
  }
};

const clearRenderOrderItem = function() {
  $("#orders").children().detach();
};

$(() => {
  fetchOrderId().then(order_id => {
    retrieveOrderItem(order_id).then(menu_items => {
      renderOrderItem(menu_items);
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
      });
    }
    );
  });
});
