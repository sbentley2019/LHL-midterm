$(() => {

  const postAjax = function(obj) {
    $.ajax({
      type: 'POST',
      url: '/user/login',
      data:$(obj).serialize()
    });
  }

  const logoutAjax = function() {
    $.ajax({
      type: 'POST',
      url: '/user/logout'
    });
  }

  const newUser = function(obj) {
    $.ajax({
      type: 'POST',
      url: '/user/new',
      data: $(obj).serialize()
    });
  }

  $('#logout').on('click', function() {
    logoutAjax();
  });

  $('#form-sign-up').submit((e)=> {
    e.preventDefault();
    newUser(this);
  })

  const buildNav = function(user) {
    if (user === 0) {
      return `<div class="top-bar">
      <div class="top-bar-left">
        <ul class="menu">
          <li class="menu-text">
            <h4>Site Title</h4>
          </li>
        </ul>
      </div>
      <div class="top-bar-right">
        <ul class="menu">
          <li>Welcome</li>
          <li>
            <a href="#">
              <button id="logout" class="button">Logout</button>
            </a>
          </li>
        </ul>
      </div>
    </div>`;
    } else if (user === 1) {
      return `<div class="top-bar">
    <div class="top-bar-left">
      <ul class="menu">
        <li class="menu-text">
          <h4>Site Title</h4>
        </li>
        <li>
          <a href="/restaurant/owner">
            <button class="button">Restaurant</button>
          </a>
        </li>
      </ul>
    </div>
    <div class="top-bar-right">
      <ul class="menu">
        <li>Welcome</li>
        <li>
          <a href="#">
            <button id="logout" class="button">Logout</button>
          </a>
        </li>
      </ul>
    </div>
  </div>`
    } else {
      return `<div class="top-bar">
      <div class="top-bar-left">
        <ul class="menu">
          <li class="menu-text">
            <h4>Site Title</h4>
          </li>
        </ul>
      </div>
      <div class="top-bar-right">
        <ul class="menu">
          <li>
            <form id="form-login" action="" method="POST" >
              <input type="email" id="email" name="email" placeholder="email">
              <button class="button" type="submit" value="login">Login</button>
            </form>
          </li>
          <li>
            <button class="button" data-open="signUpModal">Sign Up</button>
          </li>
        </ul>
      </div>
    </div>`;
    }
  }


  $('.head-nav').append(buildNav(3));

  $('#form-login').submit(function(e) {
    e.preventDefault();
    postAjax(this).then((body) => {
      console.log(body);
      const userObj = JSON.parse(body);
      console.log(userObj);
      $('.top-bar').detach();
      $('.head-nav').append(buildNav(Number(userObj.user)));
    });
  })
});
