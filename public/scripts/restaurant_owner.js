/**
 * Generates list of order item names
 * @param {*} order
 */
const getOrderItemsList = function(order) {
  let result = "";
}

const generateOrder = function(order) {
  let orderBody = $(`<div class="cell">
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
          <ul class="vertical menu" style="margin: 25px;">
              ${getOrderItemsList(order)}
          </ul>

      </div>
      <div class="card-divider">
          <span class="owner_order_card_footer">
              <div>
                  <p>From:</p>
                  <p>name</p>
              </div>
              <h5>price</h5>
          </span>
      </div>
  </div>
</div>`);
}
