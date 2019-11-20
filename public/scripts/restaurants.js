

$(() => {
  $("form").submit(function(event) {
    event.preventDefault();
    const url = this.action;
    const data = $(this).serialize();
    submitOrderItem(url, data).then(res => console.log('success'));
  });
});
