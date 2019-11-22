const postAjax = function(obj) {
  return $.ajax({
    type: 'POST',
    url: '/user/login',
    data:$(obj).serialize()
  });
};

const newUser = function(obj) {
  return $.ajax({
    type: 'POST',
    url: '/user/new',
    data: $(obj).serialize()
  });
};

const clearMsg = function() {
  return $.ajax({
    type: 'POST',
    url:'/order/clearSession'
  });
};

const checkIfUserIdExist = function() {
  return $.ajax({
    type: 'POST',
    url:'/user/findUser'
  });
};

const buildNav = function(user) {
  let nav = `
  <div id="nav" class="top-bar">
  <div class="top-bar-left">
    <ul class="menu">
      <li class="menu-text">
        <h3>!Ritual</h3>
      </li>
  `;
  if (user === null) {
    return nav + `
      </ul>
    </div>
    <div class="top-bar-right">
      <ul class="menu">
        <li>
          <form id="form-login" action="/user/login" method="POST" >
            <input type="email" id="email" name="email" placeholder="email">
            <button class="button" type="submit">Login</button>
          </form>
        </li>
        <li>
          <button class="button" data-open="signUpModal">Sign Up</button>
        </li>
      </ul>
    </div>
  </div>`;
  } else if (user === 0) {
    return nav + `
      </ul>
    </div>
    <div class="top-bar-right">
      <ul class="menu">
        <li><h4>Welcome<h4></li>
        <li>
          <form id="form-logout" action="/user/logout" method="POST" >
            <input type="submit" class="button" value="Logout">
          </form>
        </li>
      </ul>
    </div>
  </div>`;
  } else {
    return nav + `
      <li>
        <a href="/restaurant/owner">
          <button class="button">Restaurant</button>
        </a>
      </li>
    </ul>
  </div>
  <div class="top-bar-right">
    <ul class="menu">
      <li><h4>Welcome</h4></li>
      <li>
        <form id="form-logout" action="/user/logout" method="POST" >
        <input type="submit" class="button" value="Logout">
        </form>
      </li>
    </ul>
  </div>
</div>`
  }
};

$(() => {

  $('#form-sign-up').submit((e)=> {
    e.preventDefault();

  });


  // HARDCODED RESTAURANT ONE
  $('.head-nav').append(buildNav(null));

  $('#form-login').submit(function(e) {
    e.preventDefault();
    postAjax(this).then((data) => {
      const user = JSON.parse(data);
      $('#nav').detach();
      $('.head-nav').append(buildNav(user));
    });
  });


  // Get the modal
  let modal = document.getElementById("myModal");

  // Get the button that opens the modal
  let btn = document.getElementById("myBtn");

  // Get the <span> element that closes the modal
  let span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
    clearMsg();

  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      clearMsg();
    }
  };

});
