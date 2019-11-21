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
    ${menuItem.name}
    </a></li>
    `;
    listBody += listItem;
  }
  return listBody;
}


const clearRenderOrderItem = function(element) {
  $(`#${element}`).children().detach();
};

const generateOrder = function(order, orderDetails) {
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

const generatePendingOrder = function(order) {
  let orderBody = $(`
  <div class="cell">
                    <div class="card" style='padding: 0%;'>
                        <div class="card-divider">
                            <div class="owner_order_card_header">
                                <h4>Order #${order.id}</h4>
                                <h6>Estimated Cook time: 1 hr</h6>
                            </div>
                            <div style="margin-left: auto; margin-top: auto">
                            </div>
                        </div>
                        <div class="owner_order_card_body">
                            <ul class="vertical menu" style="margin: 25px;" id="pendingOrderBody">

                            </ul>
                        </div>
                        <div class="card-divider owner_order_card_footer">
                            <span style="width: 60%; margin: auto">
                                    <div>
                                        <div class="slider" data-slider data-initial-start="50" data-step="5">

                            <span class="slider-fill" data-slider-fill></span>
                        </div>

                    </div>
                    <div class="cell small-2">
                        <input type="number" id="sliderOutput2">
                    </div>
                    </span>

                    <div>
                        <form action="/owner/confirm_order" method="POST">
                            <button class="button" type="submit">Accept</button>
                        </form>
                        <form action="/owner/cancel_order" method="POST">
                            <button class="button" type="submit">Cancel</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>`);
  return orderBody;
};

$(() => {
  clearRenderOrderItem('ordersGrid');
  fetchOrderList().then(orderList => {
    for (const order of orderList.orderItems) {
      console.log(order);
      if (order.current_status !== 'Pending') {
        $("#ordersGrid").prepend(generateOrder(order));
        retrieveMenuItem(order.id).then(orderItemList => {
          console.log(orderItemList);
          $("#order-body").prepend(generateOrderItemsList(orderItemList));
        })
      } else {
        console.log('pending order');
        $("#pendingOrdersGrid").prepend(generatePendingOrder(order));
        retrieveMenuItem(order.id).then(orderItemList => {
          console.log(orderItemList);
          $("#pendingOrderBody").prepend(generateOrderItemsList(orderItemList));
        });
      }
    }
  })
});
