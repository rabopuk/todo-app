/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
const headers = ['№', 'Задача', 'Статус', 'Действия'];

export const createButton = (type, className, id, text) => {
  const button = document.createElement('button');

  button.type = type;
  button.className = className;
  button.id = id;
  button.textContent = text;

  return button;
};

export const createInput = (type, className, placeholder) => {
  const input = document.createElement('input');

  input.type = type;
  input.className = className;
  input.placeholder = placeholder;

  return input;
};

export const createLabel = (text, htmlFor) => {
  const label = document.createElement('label');

  label.textContent = text;
  label.htmlFor = htmlFor;

  return label;
};

const createForm = () => {
  const form = document.createElement('form');
  form.classList.add('d-flex', 'align-items-center', 'mb-3');

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

  const clearButton = createButton('reset', 'btn btn-warning', 'clearBtn', 'Очистить');

  form.append(label);
  form.append(saveButton);
  form.append(clearButton);

  return { form, input, saveButton, clearButton };
};

export const createTaskRow = (task, status, id, taskId) => {
  const row = document.createElement('tr');
  const taskCell = document.createElement('td');

  taskCell.textContent = task;
  if (status === 'Выполнена') {
    taskCell.style.textDecoration = 'line-through';
  }

  row.className = status === 'Выполнена' ? 'table-success' : 'table-light';
  row.dataset.id = taskId;
  row.innerHTML = `
    <td>${id}</td>
    <td>${status}</td>
    <td>
      ${createButton('button', 'btn btn-danger', '', 'Удалить').outerHTML}
      ${createButton('button', 'btn btn-success', '', 'Завершить').outerHTML}
    </td>
  `;

  row.insertBefore(taskCell, row.children[1]);

  return row;
};

const createTableHeaders = (headers) => {
  const tr = document.createElement('tr');

  headers.forEach(headerText => {
    const th = document.createElement('th');
    th.textContent = headerText;
    tr.append(th);
  });

  return tr;
};

const createTable = () => {
  const tableWrapper = document.createElement('div');
  tableWrapper.classList.add('table-wrapper');

  const table = document.createElement('table');
  table.classList.add('table', 'table-hover', 'table-bordered');

  const thead = document.createElement('thead');
  const tableHeaders = createTableHeaders(headers);
  thead.append(tableHeaders);
  table.append(thead);

  const tbody = document.createElement('tbody');
  table.append(tbody);

  tableWrapper.append(table);

  return tableWrapper;
};

export const createTodoApp = () => {
  const todoApp = document.createElement('div');
  todoApp.classList.add(
    'vh-100',
    'w-100',
    'd-flex',
    'align-items-center',
    'justify-content-center',
    'flex-column',
  );

  const heading = document.createElement('h3');
  heading.id = 'app-title';
  heading.textContent = 'Todo App';
  todoApp.append(heading);

  const formElements = createForm();
  todoApp.append(formElements.form);

  const table = createTable();
  todoApp.append(table);

  return { todoApp, form: formElements.form, input: formElements.input };
};
