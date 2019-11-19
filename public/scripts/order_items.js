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
      <img src="https://via.placeholder.com/650x250" alt="">
      <div>
        <header>Pad Thai</header>
        <span>Price</span>
        <span>Quantity</span>
      </div>
    </section>`);
};

const renderOrderItem = function(menu_items) {
  return
}

$(() => {
  fetchOrderId().then(order_id => {
    retrieveOrderItem(order_id).then(menu_items => menu_items));
  });

  $("form").submit(function(event) {
    event.preventDefault();
    const url = this.action;
    const data = $(this).serialize();
    submitOrderItem(url, data).then(res => console.log('order submitted!'));
  });
});
