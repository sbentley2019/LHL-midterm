$(() => {

  const postAjax = function(obj) {
    $.ajax({
      type: 'POST',
      url: '/user',
      data:$(obj).serialize()
    });
  }

  const escape = function(str) {
    // escape str so there's no cross-site scripting, returns text.
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  $('#form-login').submit(function(e) {
    e.preventDefault();
    postAjax(this);
  })
});
