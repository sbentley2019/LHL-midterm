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
    url: "/restaurant/owner/" + order_id + "/loadMenuItems",
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
};


const clearRenderOrderItem = function(element) {
  $(`#${element}`).children().detach();
};

const generateOrder = function(order) {
  let orderBody = $(`
  <div class="cell">
    <div class="card active_order_card_container">
      <div class="card-divider">
          <div class="owner_order_card_header">
              <h4>Order #${order.id}</h4>
              <h6>${order.estimated_end_time - order.start_time} Minutes remaining</h6>
          </div>
      <div style="margin-left: auto; margin-top: auto">

        <form action="/restaurant/owner/complete_order" method="POST" class="orderButtons">
            <button class="button orderButtons" type="submit" id="completeButton">Confirm</button>
            <input type="hidden" name="order_id" value="${order.id}">
        </form>
        <form action="/restaurant/owner/cancel_order" method="POST" class="orderButtons">
          <button class="button orderButtons" type="submit" id="cancelButton">Cancel</button>
          <input type="hidden" name="order_id" value="${order.id}">
        </form>
      </div>
      </div>
      <div class="owner_order_card_body">
          <ul class="vertical menu" style="margin: 25px;" id="order-body-${order.id}">

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

  // var form_1 = document.createElement("form");
  // form_1.setAttribute("action", "/restaurant/owner/confirm_order");
  // form_1.setAttribute("method", "POST");
  // form_1.setAttribute("class", "orderButtons");
  // form_1.setAttribute("id", "acceptForm");
  // form_1.innerHTML = "";

  // button_1 = $(`<button class="button orderButtons" type="submit" id="acceptButton">Accept</button>`);
  // input_1 = $(`<input type="hidden" name="order_id" value="${order.id}">`);

  // form_1.innerHTML = button_1.outerHTML + input_1.outerHTML;

  let form1 = $(
    `<form action="/restaurant/owner/confirm_order" method="POST" class="orderButtons" id="acceptForm">
  <button class="button orderButtons" type="submit" id="acceptButton">Accept</button>
  <input type="hidden" name="order_id" value="${order.id}">
  </form>
  `
  );

  let form2 = $(
    `<form action="/restaurant/owner/cancel_order" method="POST" class="orderButtons">
    <button class="button orderButtons" type="submit" id="cancelButton2">Cancel</button>
    <input type="hidden" name="order_id" value="${order.id}">
    </form>
    `
  );

  let orderBody = $(`
  <div class="cell">
                    <div class="card" style='padding: 0%;'>
                        <div class="card-divider">
                            <div class="owner_order_card_header">
                                <h4>Order #${order.id}</h4>
                                <h6>Estimated Cook time: ${order.estimated_end_time - order.start_time}</h6>
                            </div>
                            <div style="margin-left: auto; margin-top: auto">
                            </div>
                        </div>
                        <div class="owner_order_card_body">
                            <ul class="vertical menu" style="margin: 25px;" id="pendingOrderBody-${order.id}">

                            </ul>
                        </div>
                          <div class="card-divider owner_order_card_footer">
                            <span style="width: 60%; margin: auto">
                              <div class="cell small-2">
                                <input type="number" id="sliderOutput2" name="order_time" form="acceptForm">
                              </div>
                            </span>
                          <div>
                          <form action="/restaurant/owner/confirm_order" method="POST" class="orderButtons" id="acceptForm"
                          data-order-id=${order.id}
                          data-order-action="accept">
  <button class="button orderButtons" type="submit" id="acceptButton">Accept</button>
  <input type="hidden" name="order_id" value="${order.id}">
  </form>
  <form action="/restaurant/owner/cancel_order" method="POST" class="orderButtons">
  <button class="button orderButtons" type="submit" id="cancelButton2">Cancel</button>
  <input type="hidden" name="order_id" value="${order.id}">
  </form>
                    </div>
                </div>
            </div>
        </div>`);

  // form1.on("submit", function(event) {
  //   debugger;
  //   event.preventDefault();
  //   console.log(event);
  //   $.ajax({
  //     method: 'POST',
  //     url: '/restaurant/owner/confirm_order',
  //   })
  // })

  // form2.find('button').on('click', function($button) {
  //   $.ajax({
  //     method: 'POST',
  //     url: '/restaurant/owner/cancel_order'
  //   })
  // });
  return orderBody;
};

$(() => {
  clearRenderOrderItem('ordersGrid');
  clearRenderOrderItem('pendingOrdersGrid')

  const renderOrders = function() {
    fetchOrderList().then(orderList => {
      for (const order of orderList.orderItems) {

        console.log(order.current_status);

        if (order.current_status !== 'Rejected') {
          if (order.current_status === 'Accepted') {
            $("#ordersGrid").prepend(generateOrder(order));
            retrieveMenuItem(order.id).then(orderItemList => {
              $(`#order-body-${order.id}`).prepend(generateOrderItemsList(orderItemList));
            })
          } else if (order.current_status === 'Pending') {
            $("#pendingOrdersGrid").prepend(generatePendingOrder(order));
            retrieveMenuItem(order.id).then(orderItemList => {
              $(`#pendingOrderBody-${order.id}`).prepend(generateOrderItemsList(orderItemList));
            });
          }
        }
      }
    });
  };

  renderOrders();

  function acceptOrder(orderId) {
    return $.ajax({
      method: 'POST',
      url: '/restaurant/owner/confirm_order',
      data: {
        order_id: orderId
      }
    })
  }

  $(document).on('submit', "form.orderButtons", function(event) {
    event.preventDefault();

    var $this = $(this)

    var orderId = $this.data('order-id');
    var action = $this.data('order-action');

    if (action == "accept") {
      acceptOrder(orderId).then(function(response) {
        clearRenderOrderItem('ordersGrid');
        clearRenderOrderItem('pendingOrdersGrid');
        renderOrders();
      })
    }
  });
});
