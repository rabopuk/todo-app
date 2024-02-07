/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
export const buttonLabels = ['Удалить', 'Завершить', 'Отменить', 'Редактировать'];

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

const createSelect = () => {
  const select = document.createElement('select');
  select.className = 'form-select me-3 col';

  const options = ['Обычная', 'Важная', 'Срочная'];
  const classes = ['table-light', 'table-warning', 'table-danger'];

  options.forEach((option, index) => {
    const opt = document.createElement('option');

    opt.value = classes[index];
    opt.textContent = option;

    select.append(opt);
  });

  return select;
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

export const createTaskRow = (task, status, id, taskId) => {
  const row = document.createElement('tr');
  const taskCell = document.createElement('td');

  taskCell.textContent = task;
  taskCell.contentEditable = 'false';

  if (status === 'Выполнена') {
    taskCell.style.textDecoration = 'line-through';
  }

  row.className = status === 'Выполнена' ? 'table-success' : 'table-light';
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
  const tr = document.createElement('tr');

  headers.forEach(headerText => {
    const th = document.createElement('th');
    th.textContent = headerText;
    tr.append(th);
  });

  return tr;
};

const createTable = () => {
  const headers = ['№', 'Задача', 'Статус', 'Действия'];

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
