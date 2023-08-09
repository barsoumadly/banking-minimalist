'use strict';

// Selecting input elements
const usernameInputLogin = document.querySelector('.login__input--user');
const passwordInputLogin = document.querySelector('.login__input--pin');
const amountLoanInput = document.querySelector('.form__input--loan-amount');
const usernameInputClose = document.querySelector('.form__input--user');
const passwordInputClose = document.querySelector('.form__input--pin');
const receiverAccountInput = document.querySelector('.form__input--to');
const amountTransferInput = document.querySelector('.form__input--amount');

// Selecting text elements
const labelWelcome = document.querySelector('.welcome');
const labelBalance = document.querySelector('.balance__value');
const labelDate = document.querySelector('.date');
const labelTimer = document.querySelector('.timer');
const labelIncome = document.querySelector('.summary__value--in');
const labelOutcome = document.querySelector('.summary__value--out');
const labelInterest = document.querySelector('.summary__value--interest');

// Selecting containers
const headerEL = document.querySelector('.header__title');
const appEL = document.querySelector('.app');
const movementsContainer = document.querySelector('.movements');

// Selecting buttons
const btnLogin = document.querySelector('.login__btn');
const btnLogout = document.querySelector('.log-out');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnSort = document.querySelector('.btn--sort');

// Declaring main variables
let currentAccount, timer;

// Accounts
const account1 = {
  owner: 'Stephen Thomas',
  // old way
  movements: [200, 255.23, -306.5, 25000, -342.21, -133.9, 79.97, 1300],
  movementsDates: [
    '2023-02-28T12:20:30.267Z',
    '2023-03-30T12:20:30.267Z',
    '2023-04-05T12:20:30.267Z',
    '2023-04-12T12:20:30.267Z',
    '2023-05-18T12:20:30.267Z',
    '2023-05-27T12:20:30.267Z',
    '2023-08-04T12:20:30.267Z',
    '2023-08-05T12:20:30.267Z',
  ],

  // for sorting
  movementsData: [
    {
      value: 200,
      date: '2023-02-28T12:20:30.267Z',
    },
    {
      value: 255.23,
      date: '2023-03-30T12:20:30.267Z',
    },
    {
      value: -306.5,
      date: '2023-04-05T12:20:30.267Z',
    },
    {
      value: 25000,
      date: '2023-04-12T12:20:30.267Z',
    },
    {
      value: -342.21,
      date: '2023-05-18T12:20:30.267Z',
    },
    {
      value: -133.9,
      date: '2023-05-27T12:20:30.267Z',
    },
    {
      value: 79.97,
      date: '2023-08-04T12:20:30.267Z',
    },
    {
      value: 1300,
      date: '2023-08-05T12:20:30.267Z',
    },
  ],
  password: 1111,
  locale: 'pt-PT',
  currency: 'EUR',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  movementsDates: [
    '2021-11-01T13:15:33.035Z',
    '2021-11-30T09:48:16.867Z',
    '2021-12-25T06:04:23.907Z',
    '2022-01-25T14:18:46.235Z',
    '2022-02-05T16:33:06.386Z',
    '2022-04-10T14:43:26.374Z',
    '2022-06-25T18:49:59.371Z',
    '2023-08-05T12:01:20.894Z',
  ],

  // for sorting
  movementsData: [
    {
      value: 5000,
      date: '2021-11-01T13:15:33.035Z',
    },
    {
      value: 3400,
      date: '2021-11-30T09:48:16.867Z',
    },
    {
      value: -150,
      date: '2021-12-25T06:04:23.907Z',
    },
    {
      value: -790,
      date: '2022-01-25T14:18:46.235Z',
    },
    {
      value: -3210,
      date: '2022-02-05T16:33:06.386Z',
    },
    {
      value: -1000,
      date: '2022-04-10T14:43:26.374Z',
    },
    {
      value: 8500,
      date: '2022-06-25T18:49:59.371Z',
    },
    {
      value: -30,
      date: '2023-08-05T12:01:20.894Z',
    },
  ],
  password: 2222,
  locale: 'en-US',
  currency: 'USD',
};

let accounts = [account1, account2];

// Retrieve account from local storage
const reteriveDate = function () {
  accounts = JSON.parse(localStorage.getItem('accounts'));
  if (
    localStorage.getItem('account') &&
    !accounts.includes(JSON.parse(localStorage.getItem('account')))
  ) {
    accounts.push(JSON.parse(localStorage.getItem('account')));
  }
};

reteriveDate();

// Save accounts in local storage
const saveData = function (accounts) {
  localStorage.clear();
  localStorage.setItem('accounts', JSON.stringify(accounts));
};

saveData(accounts);

// Create username
const createUsername = function (accounts) {
  accounts.forEach(
    account =>
      (account.username = account.owner
        .toLowerCase()
        .split(' ')
        .map(name => name[0])
        .join(''))
  );
};

createUsername(accounts);

// Showing name of the user
const showName = function (account) {
  const firstName = account.owner.split(' ')[0];
  labelWelcome.innerHTML = `Welcome back, <span class = "name">${firstName}</span>`;
};

// Showing container app
const showApp = function () {
  headerEL.style.opacity = 0;
  appEL.style.opacity = 100;

  setTimeout(() => {
    headerEL.classList.add('hidden');
    appEL.classList.remove('hidden');
  }, 1000);
};

// Showing log out button
const showButton = function () {
  // Removing log in components
  usernameInputLogin.classList.add('hidden');
  passwordInputLogin.classList.add('hidden');
  btnLogin.classList.add('hidden');

  btnLogout.classList.remove('hidden');
};

// Formating movement date
const formatDate = function (date) {
  // Calc difference between dates
  const calcPassedDays = function (date1, date2) {
    return Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));
  };
  const daysPassed = calcPassedDays(new Date(), date);

  // display the suitable style
  if (daysPassed === 0) {
    return 'Today';
  } else if (daysPassed === 1) {
    return 'Yesterday';
  } else if (daysPassed <= 7) {
    return `${daysPassed} days ago`;
  } else {
    // Old way
    // return `${String(date.getDate()).padStart(2, 0)}/${String(
    //   date.getMonth() + 1
    // ).padStart(2, 0)}/${date.getFullYear()}`;

    // Internationalize movement date
    const options = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };

    return new Intl.DateTimeFormat(currentAccount.locale, options).format(date);
  }
};

// Displaying account movements
const displayMovements = function (account, sort = false) {
  // Removing exsisting elements
  movementsContainer.innerHTML = '';

  // Checking sort variable
  const movements = sort
    ? account.movementsData.slice().sort((a, b) => a.value - b.value)
    : account.movementsData;

  // Adding accounts movements
  movements.forEach(function (movement, index) {
    // Checking movement type
    const movementType = movement.value > 0 ? 'deposit' : 'withdrawal';
    const color = movement.value > 0 ? 'd' : 'w';

    // Displaying movement date
    const date = formatDate(new Date(movement.date));

    const mov = new Intl.NumberFormat(account.locale, {
      style: 'currency',
      currency: account.currency,
    }).format(movement.value);

    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${movementType}">${
      index + 1
    } ${movementType}</div>
    <div class="movements__date">${date}</div>
    <div class="movements__value ${color}"> ${mov}</div>
  </div>`;
    movementsContainer.insertAdjacentHTML('afterbegin', html);
  });
};

// Displaying current balance
const displayBalance = function (account) {
  account.balance = account.movements.reduce(
    (accumlator, movement) => accumlator + movement
  );

  // Showing balance
  labelBalance.textContent = `${new Intl.NumberFormat(account.locale, {
    style: 'currency',
    currency: account.currency,
  }).format(account.balance)}`;
};

// Displaying summary
const displaySummary = function (account) {
  const incomeValue = account.movements
    .filter(movement => movement > 0)
    .reduce((accumlator, movement) => accumlator + movement);
  labelIncome.textContent = `${new Intl.NumberFormat(account.locale, {
    style: 'currency',
    currency: account.currency,
  }).format(incomeValue)}`;

  if (account.movements.some(movement => movement < 0)) {
    const outcomeValue = account.movements
      .filter(movement => movement < 0)
      .reduce((accumlator, movement) => accumlator + movement);
    labelOutcome.textContent = `${new Intl.NumberFormat(account.locale, {
      style: 'currency',
      currency: account.currency,
    }).format(Math.abs(outcomeValue))}`;
  }

  const interestValue = account.movements
    .filter(movement => movement > 0)
    .map(movement => (movement * 2) / 100)
    .filter(movement => movement >= 1)
    .reduce((accumlator, movement) => accumlator + movement);
  labelInterest.textContent = `${new Intl.NumberFormat(account.locale, {
    style: 'currency',
    currency: account.currency,
  }).format(interestValue)}`;
};

const updateUI = function (account) {
  displayMovements(account);
  displayBalance(account);
  displaySummary(account);
};

// Hiding container app
const hideApp = function () {
  headerEL.style.opacity = 100;
  appEL.style.opacity = 0;

  setTimeout(() => {
    headerEL.classList.remove('hidden');
    appEL.classList.add('hidden');
  }, 1000);
  labelWelcome.textContent = 'Log in to get started';
};

// Hiding log out button
const hideButton = function () {
  // Removing log in components
  usernameInputLogin.classList.remove('hidden');
  passwordInputLogin.classList.remove('hidden');
  btnLogin.classList.remove('hidden');

  btnLogout.classList.add('hidden');
};

// Displaying current date
const displayCurrentDate = function () {
  // Old way
  // const now = new Date();
  // const day = String(now.getDate()).padStart(2, 0);
  // const month = String(now.getMonth() + 1).padStart(2, 0);
  // const year = now.getFullYear();

  // const hour = String(now.getHours() - 12).padStart(2, 0);
  // const minutes = String(now.getMinutes()).padStart(2, 0);
  // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${minutes}`;

  // Internationalize date
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  const currentTime = new Intl.DateTimeFormat(
    currentAccount.locale,
    options
  ).format();

  labelDate.textContent = currentTime;
};

// Setting log out timer
const startLogOutTimer = function () {
  let time = 120;
  const setTimer = () => {
    const minutes = String(Math.trunc(time / 60)).padStart(2, 0);
    const seconds = String(time % 60).padStart(2, 0);
    labelTimer.textContent = `${minutes}:${seconds}`;

    if (time === 0) {
      hideApp();
      hideButton();
      clearInterval(timer);
    }
    time--;
  };
  setTimer();
  timer = setInterval(setTimer, 1000);
  return timer;
};

// Actions of buttons
btnLogin.addEventListener('click', function (event) {
  event.preventDefault();

  // Find account by username
  currentAccount = accounts.filter(
    account => account.username === usernameInputLogin.value
  )[0];

  // Checking account password
  if (currentAccount?.password === Number(passwordInputLogin.value)) {
    // show container app
    showName(currentAccount);
    showApp();
    showButton();
    updateUI(currentAccount);

    // display today date
    displayCurrentDate();

    // display log out timer
    if (timer) {
      clearInterval(timer);
      timer = startLogOutTimer();
    } else {
      startLogOutTimer();
    }
  }

  // Reseting input fields
  usernameInputLogin.value = passwordInputLogin.value = '';
  passwordInputLogin.blur();
});

btnLogout.addEventListener('click', function (event) {
  event.preventDefault();

  hideApp();
  hideButton();
});

btnTransfer.addEventListener('click', function (event) {
  event.preventDefault();

  const amount = Number(amountTransferInput.value);
  const receiverAccount = accounts.find(
    account => account.username === receiverAccountInput.value
  );

  // Checking amount and receiver account validation
  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiverAccount &&
    receiverAccount?.username !== currentAccount.username
  ) {
    setTimeout(() => {
      currentAccount.movements.push(-amount);
      currentAccount.movementsDates.push(new Date().toISOString());
      currentAccount.movementsData.push({
        value: -amount,
        date: new Date().toISOString(),
      });
      receiverAccount.movements.push(amount);
      receiverAccount.movementsDates.push(new Date().toISOString());
      receiverAccount.movementsData.push({
        value: amount,
        date: new Date().toISOString(),
      });
      updateUI(currentAccount);

      // Send data to local storage
      saveData(accounts);
    }, 3000);

    // reset the log out timer
    if (timer) {
      clearInterval(timer);
      timer = startLogOutTimer();
    }
  }

  // Reseting input fields
  amountTransferInput.value = receiverAccountInput.value = '';
  amountTransferInput.blur();
});

btnLoan.addEventListener('click', function (event) {
  event.preventDefault();

  // Checking amount validation
  const amount = Number(amountLoanInput.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(() => {
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString());
      currentAccount.movementsData.push({
        value: amount,
        date: new Date().toISOString(),
      });
      updateUI(currentAccount);

      // Send data to local storage
      saveData(accounts);
    }, 3000);

    // reset the log out timer
    if (timer) {
      clearInterval(timer);
      timer = startLogOutTimer();
    }
  }

  // Reseting input field
  amountLoanInput.value = '';
  amountLoanInput.blur();
});

btnClose.addEventListener('click', function (event) {
  event.preventDefault();

  // Checking validation of username and password
  if (
    usernameInputClose.value === currentAccount.username &&
    Number(passwordInputClose.value) === currentAccount.password
  ) {
    const index = accounts.findIndex(
      account => account.username === currentAccount.username
    );
    accounts.splice(index, 1);

    hideApp();
    hideButton();
  }

  // Reseting input fields
  usernameInputClose.value = passwordInputClose.value = '';
  passwordInputClose.blur();
});

let isSorted = false;

btnSort.addEventListener('click', function (event) {
  event.preventDefault();

  displayMovements(currentAccount, !isSorted);
  isSorted = !isSorted;
});
