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

// Declaring main variables
let currentAccount;

// Accounts
const account1 = {
  owner: 'Stephen Thomas',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  password: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  password: 2222,
};

const accounts = [account1, account2];

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

// Displaying account movements
const displayMovements = function (account) {
  // Removing exsisting elements
  movementsContainer.innerHTML = '';

  // Adding accounts movements
  account.movements.forEach(function (movement, index) {
    const movementType = movement > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${movementType}">${
      index + 1
    } ${movementType}</div>
    <div class="movements__value">${movement} €</div>
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
  labelBalance.textContent = `${account.balance} €`;
};

// Displaying summary
const displaySummary = function (account) {
  const incomeValue = account.movements
    .filter(movement => movement > 0)
    .reduce((accumlator, movement) => accumlator + movement);
  labelIncome.textContent = `${incomeValue} €`;

  const outcomeValue = account.movements
    .filter(movement => movement < 0)
    .reduce((accumlator, movement) => accumlator + movement);
  labelOutcome.textContent = `${Math.abs(outcomeValue)} €`;

  const interestValue = account.movements
    .filter(movement => movement > 0)
    .map(movement => (movement * 2) / 100)
    .filter(movement => movement >= 1)
    .reduce((accumlator, movement) => accumlator + movement);
  labelInterest.textContent = `${interestValue} €`;
};

const updateUI = function (account) {
  displayMovements(account);
  displayBalance(account);
  displaySummary(account);
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
    showName(currentAccount);
    showApp();
    showButton();
    updateUI(currentAccount);
  }

  // Reseting input fields
  usernameInputLogin.value = passwordInputLogin.value = '';
  passwordInputLogin.blur();
});

// Hiding container app
const hideApp = function () {
  headerEL.style.opacity = 100;
  appEL.style.opacity = 0;

  setTimeout(() => {
    headerEL.classList.remove('hidden');
    appEL.classList.add('hidden');
  }, 1000);
};

// Hiding log out button
const hideButton = function () {
  // Removing log in components
  usernameInputLogin.classList.remove('hidden');
  passwordInputLogin.classList.remove('hidden');
  btnLogin.classList.remove('hidden');

  btnLogout.classList.add('hidden');
};

btnLogout.addEventListener('click', function (event) {
  event.preventDefault();

  hideApp();
  hideButton();
  labelWelcome.textContent = 'Log in to get started';
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
      receiverAccount.movements.push(amount);
      updateUI(currentAccount);
    }, 3000);
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
      updateUI(currentAccount);
    }, 3000);
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
    labelWelcome.textContent = 'Log in to get started';
  }

  // Reseting input fields
  usernameInputClose.value = passwordInputClose.value = '';
  passwordInputClose.blur();
});
