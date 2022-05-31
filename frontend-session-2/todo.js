const DOMAIN = 'http://localhost:4000';
const END_POINT = '/todos';
const API_HOST = `${DOMAIN}${END_POINT}`;

//list of all the items
let todoList = [];

// currenely selected items id and index
let selectedItem = {};

const resetForm = () => {
  $('form')[0].reset();
};

/**
 *
 * @param {Array} items
 * @returns
 */
const generateListItems = (items) => {
  if (items.length === 0) {
    return `<li>List is empty...</li>`;
  }

  return items.map(
    (item, index) => `<li id=${item.id} data-index=${index}>
  <input type="checkbox" ${JSON.parse(item.completed) && 'checked'}  />
  <span class="description">${item.description}</span>
  <i class="bx bxs-edit"></i>
  <i class="bx bxs-trash"></i>
  </li>`
  );
};

const renderListItems = () => {
  const items = generateListItems(todoList);
  $('#items').html(items);
  addEvents();
};

const showError = (message) => {
  $('#error').html(message);
};

const showAddItemButton = () => {
  $('#btnAddUpdate')
    .html('<i class="bx bx-list-plus"></i>')
    .removeClass('update');
};

const showUpdateItemButton = () => {
  $('#btnAddUpdate').html('Update').addClass('update');
};

const addEvents = () => {
  // UPDATE ITEM EVENT LISTENER
  $('.bx.bxs-edit').on('click', onEditIconClick);

  // DELETE ITEM EVENT LISTENER
  $('.bx.bxs-trash').on('click', onDeleteIconClick);

  //UPDATE ITEM STATUS
  $('input[type=checkbox]').on('click', toggleItemStatus);
};

//ADD ITEM
const addItem = (e) => {
  e.preventDefault();

  if (selectedItem.hasOwnProperty('id')) {
    return handleUpdateItem(e);
  }

  const inputNewItem = $('#inputTodoItem');
  const inputNewItemValue = inputNewItem.val().trim();

  if (inputNewItemValue === '') {
    showError('Input field mandetory');
    return;
  }

  //check for any duplicate text
  const duplicate = isDuplicate(inputNewItemValue);

  if (duplicate) {
    showError(
      `<span class='hl'>${duplicate.description}</span> is already listed</span>`
    );

    return resetForm();
  }

  // remove error message (if any) before updating the UI
  $('#error').html('');

  $.ajax({
    method: 'POST',
    url: API_HOST,
    data: {
      description: inputNewItemValue,
    },
    headers: getHeader(),
    success: (res) => {
      console.log('Item Added');
      todoList.push(res);
      renderListItems();
      resetForm();
    },
    error: (e) => {
      console.log('Failed to add the item');
    },
  });
};

// UPDATE ITEM
const handleUpdateItem = function (e) {
  e.preventDefault();
  const { id, index } = selectedItem;

  const inputTodoItemVal = $('#inputTodoItem').val();

  $.ajax({
    url: `${API_HOST}/${id}`,
    method: 'PATCH',
    headers: getHeader(),
    data: {
      description: inputTodoItemVal,
    },
    success: () => {
      todoList[index].description = inputTodoItemVal;
      renderListItems();

      //reset current selected item object
      selectedItem = {};
    },
    error: (error) => console.log('Failed to upate the item', error),
  });

  // reset input field
  resetForm();

  // show add button and hide update button
  showAddItemButton();
};

const toggleItemStatus = (e) => {
  const id = e.target.parentElement.id;

  $.ajax({
    url: `${API_HOST}/${id}`,
    method: 'PATCH',
    headers: getHeader(),
    data: {
      completed: e.target.checked,
    },
    success: (data) => {
      console.log(data);
      // handleUpdateItem();
    },
    error: (error) => {
      if (error.status === 401) {
        redirectToLoginPage();
      }
    },
  });
};

// DELETE ITEM
const handleDeleteItem = (id) => {
  $.ajax({
    url: `${API_HOST}/${id}`,
    method: 'DELETE',
    headers: getHeader(),
  })
    .then((res) => {
      const updatedTodoList = todoList.filter((todo) => todo.id !== id);
      todoList = updatedTodoList;
      renderListItems();
    })
    .catch((e) => console.error(e));
};

const onEditIconClick = (e) => {
  const text = e.target.parentElement.innerText;
  const id = e.target.parentElement.id;
  const index = e.target.parentElement.dataset.index;

  $('#inputTodoItem').val(text);

  showUpdateItemButton();

  selectedItem = { id, index };
};

const onDeleteIconClick = (e) => {
  const id = +e.target.parentElement.id;

  handleDeleteItem(id);
};

const init = () => {
  $.ajax({
    method: 'GET',
    url: API_HOST,

    headers: getHeader(),
  })
    .then((res) => {
      todoList = res;
      //add into DOM
      renderListItems();
    })
    .catch((e) => {
      // e.status === 401 : Unauthorized... jwt expired
      localStorage.removeItem('access_token');
      redirectToLoginPage();
    });
};

const handleLogout = () => {
  localStorage.removeItem('access_token');
  redirectToLoginPage();
};
// DOCUMENT READY
$(async () => {
  console.log('DOM READY....');
  await $.getScript('js/utils.js', () => console.log('utils.js loading'));
  // Fetch authenticated user's todo list and store in a variable todoList
  init();

  //ADD ITEM EVENT LISTENER
  $('#btnAddUpdate').on('click', addItem);

  // //UPDATE ITEM EVENT LISTENER
  // $('#btnUpdateItem').on('click', handleUpdateItem);

  $('.logout').on('click', handleLogout);
});


