'use strict';

// Selecting containers
const modalEl = document.querySelector('.modal');
const overlayEl = document.querySelector('.overlay');

// Selecting buttons
const btnsShowModal = document.querySelectorAll('.btn--show-modal');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnLogin = document.querySelector('.btn--login');

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
