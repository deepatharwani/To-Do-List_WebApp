console.log("test");

//Single Element
// const login = document.getElementById('loginForm');
// const title = document.querySelector('.title');
// title.style.color = 'red';
// title.textContent = 'Hello';
// console.log(login);
// console.log(title);

//Multiple Elements
// const group = document.querySelectorAll('.form-group');
// console.log(group);

// const test = () => {
//     console.log('clicked...');
// }

// title.addEventListener('click', test);


//jQuery
// const title = $('.title');
// console.log(title)

// $.ajax({
//     method : 'GET',
//     url: 'https://jsonplaceholder.typicode.com/users'
// }).then(data => console.log(data)).catch(error => console.log(error));


// $.ajax({
//   method: 'GET',
//   url: 'https://jsonplaceholder.typicode.com/users',
//   success: (data) => console.log(data),
//   error: (error) => console.log(error),
// });

// fetch('https://jsonplaceholder.typicode.com/users')
//   .then((response) => response.json())
//   .then((data) => console.log(data))
//   .catch((error) => console.log(error));

// const showSignupForm = () => {
//     $('#loginForm').css('display', 'none');
//     $('#signUpForm').css('display', 'flex');
//   };
  
//   const showLoginFor = () => {
//     $('#loginForm').css('display', 'flex');
//     $('#signUpForm').css('display', 'none');
//   };
  
//   $(() => {
//     $('#showSignupForm').on('click', showSignupForm);
//     $('#showLoginForm').on('click', showLoginFor);
//   });
  
const handleSuccessLogin = (data) => {
  localStorage.setItem('access_token', data.accessToken);
  $(window).attr('location', './index.html');
};

const showLoginForm = () => {
  $('#loginForm').css('display', 'flex');
  $('#signUpForm').css('display', 'none');
};

const showSignupForm = () => {
  $('#loginForm').css('display', 'none');
  $('#signUpForm').css('display', 'flex');
};

// LOGIN
const handleLogin = async (e) => {
  e.preventDefault();

  const email = $('#username').val();
  const password = $('#password').val();

  $.ajax({
    method: 'POST',
    url: 'http://localhost:4000/login',
    data: {
      email,
      password,
    },
    success: (data) => handleSuccessLogin(data),
    error: (err) => {
      $('#error_login').text(err.responseText);
    },
  });
};

// SIGN UP
const handleSignUp = (e) => {
  e.preventDefault();

  const email = $('#new_username').val();
  const password = $('#new_password').val();
  const name = $('#name').val();

  $.ajax({
    method: 'POST',
    url: 'http://localhost:4000/register',
    data: {
      email,
      password,
      name,
    },

    success: (data) => handleSuccessLogin(data),
    error: (err) => {
      $('#error_signup').text(err.responseText);
    },
  });
};

$(async () => {
  $('#btnLogin').on('click', handleLogin);
  $('#btnSignUp').on('click', handleSignUp);
  $('#showLoginForm').on('click', showLoginForm);
  $('#showSignupForm').on('click', showSignupForm);

  await $.getScript('./js/utils.js', () => console.log('utils.js loaded'));
});

  
  