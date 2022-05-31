const isDuplicate = (text) =>
  todoList.find(
    (item) => item.description.toLowerCase() === text.toLowerCase()
  );

const redirectToLoginPage = () => {
  $(window).attr('location', './login.html');
};

const redirectToHomePage = () => {
  $(window).attr('location', './index.html');
};

const getHeader = () => ({
  authorization: `Brearer ${localStorage.getItem('access_token')}`,
});

