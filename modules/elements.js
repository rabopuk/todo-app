/* eslint-disable object-curly-spacing */
/* eslint-disable max-len */
/* eslint-disable indent */
import { IMPORTANCE_CLASSES, TASK_IMPORTANCES, buttonLabels } from './constants.js';

const createElementWithClass = (type, className) => {
  const element = document.createElement(type);
  element.className = className;

  return element;
};

export const createButton = (type, className, id, text) => {
  const button = createElementWithClass('button', className);

  button.type = type;
  button.id = id;
  button.textContent = text;

  return button;
};

export const createInput = (type, className, placeholder) => {
  const input = createElementWithClass('input', className);

  input.type = type;
  input.placeholder = placeholder;

  return input;
};

export const createLabel = (text, htmlFor) => {
  const label = createElementWithClass('label', '');

  label.textContent = text;
  label.htmlFor = htmlFor;

  return label;
};

const createSelect = () => {
  const select = createElementWithClass('select', 'form-select me-3 col');

  const options = ['Обычная', 'Важная', 'Срочная'];
  const classes = ['table-light', 'table-warning', 'table-danger'];

  options.forEach((option, index) => {
    const opt = createElementWithClass('option', '');

    opt.value = classes[index];
    opt.textContent = option;

    select.append(opt);
  });

  return select;
};

const createForm = () => {
  const form = createElementWithClass('form', 'd-flex align-items-center mb-3');

  const label = createLabel('', 'task-input');
  label.classList.add('form-group', 'me-3', 'mb-0');

  const input = createInput('text', 'form-control', 'ввести задачу');
  input.id = 'task-input';
  label.append(input);

  const saveButton = createButton(
    'submit',
    'btn btn-primary me-3',
    'task-submit-button',
    'Сохранить',
  );

  const clearButton = createButton(
    'reset',
    'btn btn-warning',
    'clearBtn',
    'Очистить',
  );

  form.append(label);
  form.append(saveButton);
  form.append(clearButton);

  const select = createSelect();
  form.insertBefore(select, saveButton);

  return { form, input, saveButton, clearButton };
};

export const createTaskRow = (task, status, id, taskId, importance) => {
  const row = createElementWithClass('tr', '');
  row.dataset.id = taskId;

  if (status === 'Выполнена') {
    row.className = 'table-success';
  } else {
    row.className = IMPORTANCE_CLASSES[importance] || IMPORTANCE_CLASSES[TASK_IMPORTANCES[0]];
  }

  const taskCell = createElementWithClass('td', '');

  taskCell.textContent = task;
  taskCell.contentEditable = 'false';

  if (status === 'Выполнена') {
    taskCell.style.textDecoration = 'line-through';
  }

  row.dataset.id = taskId;

  const deleteButton = createButton('button', 'btn btn-danger', '', buttonLabels[0]);

  const completeButton = createButton(
    'button',
    'btn btn-success',
    '',
    status === 'Выполнена' ? buttonLabels[2] : buttonLabels[1],
  );

  const editButton = createButton('button', 'btn btn-warning btn-edit', '', buttonLabels[3]);

  row.innerHTML = `
    <td>${id}</td>
    <td>${status}</td>
    <td>
      ${deleteButton.outerHTML}
      ${completeButton.outerHTML}
      ${editButton.outerHTML}
    </td>
  `;

  row.insertBefore(taskCell, row.children[1]);

  return row;
};

const createTableHeaders = (headers) => {
  const tr = createElementWithClass('tr', '');

  headers.forEach(headerText => {
    const th = createElementWithClass('th', '');
    th.textContent = headerText;
    tr.append(th);
  });

  return tr;
};

const createTable = () => {
  const headers = ['№', 'Задача', 'Статус', 'Действия'];

  const tableWrapper = createElementWithClass('div', 'table-wrapper');

  const table = createElementWithClass('table', 'table table-hover table-bordered');

  const thead = createElementWithClass('thead', '');
  const tableHeaders = createTableHeaders(headers);
  thead.append(tableHeaders);
  table.append(thead);

  const tbody = createElementWithClass('tbody', '');
  table.append(tbody);

  tableWrapper.append(table);

  return tableWrapper;
};

export const createTodoApp = () => {
  const todoApp = createElementWithClass('div', 'vh-100 w-100 d-flex align-items-center justify-content-center flex-column');
  const heading = createElementWithClass('h3', '');
  heading.id = 'app-title';
  heading.textContent = 'Todo App';
  todoApp.append(heading);

  const { form, input } = createForm();
  todoApp.append(form);

  const table = createTable();
  todoApp.append(table);

  return { todoApp, form, input };
};
