/* eslint-disable object-curly-spacing */
import { closeModal } from './modal.js';

export const bindEvents = (modal, closeButton, form, input) => {
  modal.addEventListener('click', e => {
    if (e.target === modal) {
      closeModal(modal);
    }
  });

  closeButton.addEventListener('click', e => {
    e.stopPropagation();
    closeModal(modal);
  });

  form.addEventListener('submit', e => {
    e.preventDefault();

    if (input.value.trim() !== '') {
      closeModal(modal);
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeModal(modal);
    }
  });
};
