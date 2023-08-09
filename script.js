'use strict';

// Selecting input text
const firstNameInput = document.querySelector('.first-name');
const lastNameInput = document.querySelector('.last-name');
const passwordInput = document.querySelector('.password');
const depositInput = document.querySelector('.deposit');
const localeInput = document.querySelector('.locale');
const currencyInput = document.querySelector('.currency');

// Selecting labels
const firstNameLabel = document.querySelector('.firstname--label');
const lastNameLabel = document.querySelector('.lastname--label');
const passwordLabel = document.querySelector('.password--label');
const depositLabel = document.querySelector('.deposit--label');
const localeLabel = document.querySelector('.locale--label');
const currencyLabel = document.querySelector('.currency--label');

// Selecting containers
const modalEl = document.querySelector('.modal');
const modalFormEl = document.querySelector('.modal__form');
const overlayEl = document.querySelector('.overlay');

// Selecting buttons
const btnsShowModal = document.querySelectorAll('.btn--show-modal');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnLogin = document.querySelector('.btn--login');
const btnNext = document.querySelector('.btn--next');
const btnDone = document.querySelector('.btn--done');

// Declaring main variables
let account = {};

// Closing Modal
const closeModal = function () {
  modalEl.classList.add('hidden');
  overlayEl.classList.add('hidden');
};

// Showing Modal
btnsShowModal.forEach(btn =>
  btn.addEventListener('click', function (event) {
    event.preventDefault();
    modalEl.classList.remove('hidden');
    overlayEl.classList.remove('hidden');
  })
);

// Close Modal by using btn or overlay
btnCloseModal.addEventListener('click', closeModal);
overlayEl.addEventListener('click', closeModal);

// Close Modal using Esc button
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    closeModal();
  }
});

btnLogin.addEventListener('click', function (event) {
  event.preventDefault();
  location.href = 'login.html';
});

// Display other input fields
const displayOtherInputs = function () {
  // Hide firstname contents
  firstNameLabel.classList.add('hide');
  firstNameInput.classList.add('hide');

  // Hide lastname contents
  lastNameLabel.classList.add('hide');
  lastNameInput.classList.add('hide');

  // Hide password contents
  passwordLabel.classList.add('hide');
  passwordInput.classList.add('hide');

  // Show deposit contents
  depositLabel.classList.remove('hide');
  depositInput.classList.remove('hide');

  // Show locale contents
  localeLabel.classList.remove('hide');
  localeInput.classList.remove('hide');

  // Show currency contents
  currencyLabel.classList.remove('hide');
  currencyInput.classList.remove('hide');

  // Remove log in , next buttons and show done button
  btnNext.classList.add('hide');
  btnLogin.classList.add('hide');
  btnDone.classList.remove('hide');
};

btnNext.addEventListener('click', function (event) {
  event.preventDefault();

  // check inputs validation
  if (
    firstNameInput.value !== '' &&
    lastNameInput.value !== '' &&
    passwordInput.value !== ''
  ) {
    // Add data to account object
    account.owner = firstNameInput.value + ' ' + lastNameInput.value;
    account.password = Number(passwordInput.value);
    displayOtherInputs();
  }

  // Reseting input fields
  firstNameInput.value = lastNameInput.value = passwordInput.value = '';
});

// Display successful message
const displayMessage = function () {
  modalFormEl.style.display = 'inline';
  modalFormEl.innerHTML = `<p class="message">Welcome, <span class="name">${
    account.owner.split(' ')[0]
  }</span><br>let's start</p>         
  <button class="btn btn--login">Log in &rarr;</button>`;

  document
    .querySelector('.btn--login')
    .addEventListener('click', function (event) {
      event.preventDefault();
      location.href = 'login.html';
      localStorage.setItem('account', JSON.stringify(account));
    });

  // Remove done button
  btnDone.classList.add('hide');
};

btnDone.addEventListener('click', function (event) {
  event.preventDefault();

  // check inputs validation
  if (
    depositInput.value !== '' &&
    localeInput.value !== '' &&
    currencyInput.value !== ''
  ) {
    // Add data to account object
    account.movements = [Number(depositInput.value)];
    account.movementsDates = [new Date().toISOString()];
    account.movementsData = [
      { value: Number(depositInput.value), date: new Date().toISOString() },
    ];
    account.locale = localeInput.value;
    account.currency = currencyInput.value;

    // displaying successfull message and log in
    displayMessage();
  }

  // Reseting input fields
  depositInput.value = localeInput.value = currencyInput.value = '';
});
