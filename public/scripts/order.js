const submitOrderItem = function(url, data) {
  return $.ajax({
    method: "POST",
    url: url,
    data,
  });
};

$(() => {
  $("form").submit(function(event) {
    event.preventDefault();
    const url = this.action;
    const data = $(this).serialize();
    submitOrderItem(url, data);
  });
});
