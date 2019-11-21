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

const buildNav = function(user) {
  let nav = `
  <div id="nav" class="top-bar">
  <div class="top-bar-left">
    <ul class="menu">
      <li class="menu-text">
        <h4>Site Title</h4>
      </li>
  `;
  if (user === 0) {
    return nav + `
      </ul>
    </div>
    <div class="top-bar-right">
      <ul class="menu">
        <li>Welcome</li>
        <li>
          <form id="form-logout" action="/user/logout" method="POST" >
            <input type="submit" class="button" value="Logout">
          </form>
        </li>
      </ul>
    </div>
  </div>`;
  } else if (user === 1) {
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
      <li>Welcome</li>
      <li>
        <form id="form-logout" action="/user/logout" method="POST" >
        <input type="submit" class="button" value="Logout">
        </form>
      </li>
    </ul>
  </div>
</div>`
  } else {
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
  }
};

$(() => {

  $('#form-sign-up').submit((e)=> {
    e.preventDefault();
    newUser(this);
  });

  $('.head-nav').append(buildNav(3));

  $('#form-login').submit(function(e) {
    e.preventDefault();
    postAjax(this).then((data) => {
      const user = JSON.parse(data);
      $('#nav').detach();
      $('.head-nav').append(buildNav(user));
    });
  });
});
