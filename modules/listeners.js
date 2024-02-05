/* eslint-disable object-curly-spacing */
import { closeModal } from './modal.js';

const handleModalClick = (e, modal) => {
  if (e.target === modal) {
    closeModal(modal);
  }
};

const handleCloseButtonClick = (e, modal) => {
  e.stopPropagation();
  closeModal(modal);
};

const handleFormSubmit = (e, input, modal) => {
  e.preventDefault();

  if (input.value.trim() !== '') {
    closeModal(modal);
  }
};

const handleEscapeKey = (e, modal) => {
  if (e.key === 'Escape') {
    closeModal(modal);
  }
};

const addEventListener = (element, eventType, handler) =>
  element.addEventListener(eventType, handler);

export const bindEvents = (modal, closeButton, form, input) => {
  addEventListener(modal, 'click', e => handleModalClick(e, modal));
  addEventListener(closeButton, 'click', e => handleCloseButtonClick(e, modal));
  addEventListener(form, 'submit', e => handleFormSubmit(e, input, modal));
  addEventListener(document, 'keydown', e => handleEscapeKey(e, modal));
};
