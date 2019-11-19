const submitOrderItem = function(data) {
  return $.ajax({
    method: "POST",
    url: "/api/reservations",
    data,
  });
};
