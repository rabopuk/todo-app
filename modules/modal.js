/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
import { createButton, createInput, createLabel } from './elements.js';

export const createModal = (content) => {
  const modal = document.createElement('div');
  modal.className = 'modal show';
  modal.style.display = 'block';

  const modalBackdrop = document.createElement('div');
  modalBackdrop.className = 'modal-backdrop show';
  document.body.append(modalBackdrop);

  const modalDialog = document.createElement('div');
  modalDialog.className = 'modal-dialog modal-dialog-centered';
  modal.append(modalDialog);

  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';
  modalDialog.append(modalContent);

  const modalHeader = document.createElement('div');
  modalHeader.className = 'modal-header';
  modalContent.append(modalHeader);

  const modalTitle = document.createElement('h5');
  modalTitle.className = 'modal-title';
  modalTitle.textContent = content;
  modalHeader.append(modalTitle);

  const closeButton = createButton('button', 'btn-close');
  closeButton.setAttribute('data-bs-dismiss', 'modal');
  modalHeader.append(closeButton);

  const modalBody = document.createElement('div');
  modalBody.className = 'modal-body';
  modalContent.append(modalBody);

  const form = document.createElement('form');
  modalBody.append(form);

  const formGroup = document.createElement('div');
  formGroup.className = 'mb-3';
  form.append(formGroup);

  const label = createLabel('Введите ваше имя', 'name');
  formGroup.append(label);

  const input = createInput('text', 'form-control', 'Введите ваше имя');
  input.id = 'name';
  formGroup.append(input);

  const submitButton = createButton(
    'submit',
    'btn btn-primary mt-3',
    'name-submit-button',
    'Подтвердить',
  );
  formGroup.append(submitButton);

  return modal;
};

export const closeModal = (modal) => {
  const modalBackdrop = document.querySelector('.modal-backdrop');

  if (modalBackdrop) {
    modalBackdrop.remove();
  }

  modal.remove();
};
