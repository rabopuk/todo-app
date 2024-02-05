export const createModal = (content) => {
  const modal = document.createElement('div');
  modal.className = 'modal show d-block';
  modal.style.backgroundColor = 'rgba(0,0,0,0.5)';

  const modalDialog = document.createElement('div');
  modalDialog.className = 'modal-dialog';

  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  const modalHeader = document.createElement('div');
  modalHeader.className = 'modal-header';

  const modalTitle = document.createElement('h5');
  modalTitle.className = 'modal-title';
  modalTitle.textContent = content;
  modalHeader.appendChild(modalTitle);

  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.className = 'btn-close';
  closeButton.setAttribute('data-bs-dismiss', 'modal');
  modalHeader.appendChild(closeButton);

  const modalBody = document.createElement('div');
  modalBody.className = 'modal-body';

  const form = document.createElement('form');
  const formGroup = document.createElement('div');
  formGroup.className = 'form-group';

  const label = document.createElement('label');
  label.textContent = 'Ваше имя';
  label.htmlFor = 'input-name';
  formGroup.appendChild(label);

  const input = document.createElement('input');
  input.type = 'text';
  input.id = 'input-name';
  input.className = 'form-control';
  input.placeholder = 'Введите ваше имя';
  formGroup.appendChild(input);

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.className = 'btn btn-primary mt-3';
  submitButton.textContent = 'Подтвердить';
  formGroup.appendChild(submitButton);

  form.appendChild(formGroup);
  modalBody.appendChild(form);

  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modalDialog.appendChild(modalContent);
  modal.appendChild(modalDialog);

  return modal;
};

export const closeModal = (modal) => {
  modal.remove();
};
