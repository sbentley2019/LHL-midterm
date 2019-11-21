const fetchOrderList = function() {
  return $.ajax({
    method: "GET",
    url: "/restaurant/owner/getOrders",
  });
};

/**
 * Retrieves menu item corresponding to order id
 * @param {*} order_id
 */
const retrieveMenuItem = function(order_id) {
  return $.ajax({
    method: "GET",
    url: '/order/' + order_id + "/loadMenuItems",
  });
};

const generateOrderItemsList = function(orderItemList) {
  let listBody = '';
  for (const menuItem of orderItemList) {
    let listItem = `
    <li><a>
    ${menuItem.name}:
    ${menuItem.quantity}
    </a></li>
    `;
    listBody += listItem;
  }
  return listBody;
}


const clearRenderOrderItem = function(element) {
  $(`#${element}`).children().detach();
};

const generateOrder = function(order) {
  let orderBody = $(`
  <div class="cell">
    <div class="card">
      <div class="card-divider">
          <div class="owner_order_card_header">
              <h4>Order #${order.id}</h4>
              <h6>${order.estimated_end_time - order.start_time} Minutes remaining</h6>
          </div>
      <div style="margin-left: auto; margin-top: auto">

        <form action="/owner/confirm_order" method="POST">
            <button class="button" type="submit">Confirm</button>
        </form>
        <form action="/owner/cancel_order" method="POST">
          <button class="button" type="submit">Cancel</button>
        </form>
      </div>
      </div>
      <div class="owner_order_card_body">
          <ul class="vertical menu" style="margin: 25px;" id="order-body">

          </ul>

      </div>
      <div class="card-divider">
          <span class="owner_order_card_footer">
              <div>
                  <p>From:</p>
                  <p>ID: ${order.user_id} </p>
              </div>
              <h5>Price ${order.total_cost}</h5>
          </span>
        </div>
      </div>
    </div>`);
  return orderBody;
};


$(() => {
  console.log("Orders page reloaded");
  clearRenderOrderItem('ordersGrid');
  fetchOrderList().then(orderList => {
    for (const key of Object.keys(orderList)) {
      const order = orderList[key][0];
      console.log(order);
      $("#ordersGrid").prepend(generateOrder(order));
      retrieveMenuItem(order.id).then(orderItemList => {
        $("#order-body").prepend(generateOrderItemsList(orderItemList));
      })

    }
  })
});
