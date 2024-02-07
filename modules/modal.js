/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
/* eslint-disable max-len */
import { createButton, createInput, createLabel } from './elements.js';

const createElementWithClass = (type, className) => {
  const element = document.createElement(type);
  element.className = className;

  return element;
};

const appendChildren = (parent, children) => {
  children.forEach(child => parent.append(child));
};

export const createModal = (content) => {
  const modal = createElementWithClass('div', 'modal show');
  modal.style.display = 'block';

  const modalBackdrop = createElementWithClass('div', 'modal-backdrop show');
  document.body.append(modalBackdrop);

  const modalDialog = createElementWithClass('div', 'modal-dialog modal-dialog-centered');
  const modalContent = createElementWithClass('div', 'modal-content');
  const modalHeader = createElementWithClass('div', 'modal-header');
  const modalBody = createElementWithClass('div', 'modal-body');
  const formGroup = createElementWithClass('div', 'mb-3');
  const form = document.createElement('form');
  const modalTitle = createElementWithClass('h5', 'modal-title');
  modalTitle.textContent = content;

  const closeButton = createButton('button', 'btn-close', '');
  closeButton.setAttribute('data-bs-dismiss', 'modal');

  const label = createLabel('Введите ваше имя:', 'name');

  const input = createInput('text', 'form-control', 'Имя');
  input.id = 'name';

  const submitButton = createButton(
    'submit',
    'btn btn-primary mt-3',
    'name-submit-button',
    'Подтвердить',
  );

  appendChildren(modalHeader, [modalTitle, closeButton]);
  appendChildren(formGroup, [label, input, submitButton]);
  appendChildren(form, [formGroup]);
  appendChildren(modalBody, [form]);
  appendChildren(modalContent, [modalHeader, modalBody]);
  appendChildren(modalDialog, [modalContent]);
  appendChildren(modal, [modalDialog]);

  return modal;
};

export const closeModal = (modal) => {
  const modalBackdrop = document.querySelector('.modal-backdrop');

  if (modalBackdrop) {
    modalBackdrop.remove();
  }

  modal.remove();
};
