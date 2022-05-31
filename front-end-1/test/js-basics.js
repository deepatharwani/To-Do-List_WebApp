// // Function Declaration
// function square(x) {
//   return x * x;
// }
// // Function Expression
// const square = function (x) {
//   return x * x;
// };
// // Arrow Function
// const square = (x = 1) => {
//   return x * x;
// };

// // Concise Arrow Function
// const square = (x) => x * x;

// const result = square(3);
// console.log(result);

// const fruits = ['apples', 'oranges', 'strawberries'];

// fruits.push('mangoes');
// // Output: ['apples','oranges', 'strawberries', 'mangoes'];

// fruits.unshift('pears');
// // Output: ['pears','apples','oranges', 'strawberries', 'mangoes'];

// fruits.pop();
// fruits.shift();

// // Output: ['pears','apples','oranges', 'strawberries'];
// console.log(fruits)
// const index = fruits.findIndex(function (fruit) {
//   return fruit === 'oranges';
// });
// // Output: 2

// const index = fruits.indexOf('oranges');
// // Output: 2

// const filteredFruites = fruits.filter(function (fruit) {
//   return fruit.length > 6;
// });

// const data = {}; // object literals

// const user = {
//   firstName: 'John',
//   lastName: 'Doe',
//   age: 30,
//   hobbies: ['music', 'movies', 'sports'],
//   address: {
//     street: 'Main St, Hiranandani Gardens',
//     city: 'Mumbai',
//   },
// };

// //OLD WAY
// const firstName = user.firstName;
// const lastName = user.lastName;
// const city = user.address.city;

// console.log(firstName, lastName, city);

//NEW WAY

// const{firstName, lastName, address:{city}} = user;

// console.log(firstName, lastName, city);

const todos = [
    {
      id: 1,
      description: 'delectus aut autem',
      completed: false,
    },
    {
      id: 2,
      description: 'quis ut nam facilis et officia qui',
      completed: true,
    },
    {
      id: 3,
      description: 'fugiat veniam minus',
      completed: true,
    },
  ];
  
  for (let i = 0; i < todos.length; i++) {
    console.log(todos[i].description);
  }
  
  //for of
  for (let todo of todos) {
    console.log(todo.description);
  }
  
  todos.forEach((d) => {
    console.log(d.description);
  })
  

const result = todos.map((todo) => todo.description);

console.log(result);

// syntax: condition ? <expression if true> : <expression if false>

const renderApp = () => {
    console.log('in renderApp fn');
  };
  
  const renderLogin = () => {function Person(firstName, lastName, dob) {
    (this.firstName = firstName),
      (this.lastName = lastName),
      (this.dob = new Date(dob));
  }
  
  Person.prototype.getFullName = function () {
    return `${this.firstName} ${this.lastName}`;
  };
  
  class Person {
    constructor(firstName, lastName, dob) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.dob = new Date(dob);
    }
  
    getFullName() {
      return `${this.firstName} ${this.lastName}`;
    }
  
    getBirthYear() {
      return this.dob.getFullYear();
    }
  }
  
    console.log('in renderLogin fn');
  };
  
  const authenticated = true;
  authenticated ? renderApp() : renderLogin();
  
  const isMomHappy = true;
  // Promise
  const willIGetNewPhone = new Promise((resolve, reject) => {
    // fat arrow
    if (isMomHappy) {
      const phone = {
        brand: 'Samsung',
        color: 'black',
      };
      resolve(phone);
    } else {
      const reason = new Error('mom is not happy');
      reject(reason);
    }
  });

  console.log(willIGetNewPhone);

  //then, catch
  willIGetNewPhone
  .then((data) => console.log(data))
  .catch((error) => console.log(error.message));

  const phone = () => {
      try{
        const data = await willIGetNewPhone;
        console.log(data);
      } catch(e){
      console.log(e.message);
      }
    };
    phone();
    


    