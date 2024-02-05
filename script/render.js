/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
const createForm = () => {
  const form = document.createElement('form');
  form.classList.add('d-flex', 'align-items-center', 'mb-3');

  const label = document.createElement('label');
  label.classList.add('form-group', 'me-3', 'mb-0');

  const input = document.createElement('input');
  input.type = 'text';
  input.classList.add('form-control');
  input.placeholder = 'ввести задачу';
  label.append(input);

  const saveButton = document.createElement('button');
  saveButton.type = 'submit';
  saveButton.classList.add('btn', 'btn-primary', 'me-3');
  saveButton.textContent = 'Сохранить';

  const clearButton = document.createElement('button');
  clearButton.type = 'reset';
  clearButton.classList.add('btn', 'btn-warning');
  clearButton.textContent = 'Очистить';

  form.append(label);
  form.append(saveButton);
  form.append(clearButton);

  return form;
};

const createTaskRow = (task, status, id) => {
  const row = document.createElement('tr');

  row.className = status === 'Выполнена' ? 'table-success' : 'table-light';
  row.innerHTML = `
    <td>${id}</td>
    <td class="task">${task}</td>
    <td>${status}</td>
    <td>
      <button class="btn btn-danger">
        Удалить
      </button>
      <button class="btn btn-success">
        Завершить
      </button>
    </td>
  `;

  return row;
};

const createTableHeaders = () => {
  const tr = document.createElement('tr');

  const headers = ['№', 'Задача', 'Статус', 'Действия'];

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
  const tr = createTableHeaders();
  thead.append(tr);
  table.append(thead);

  const tbody = document.createElement('tbody');
  table.append(tbody);

  tableWrapper.append(table);

  return tableWrapper;
};

export const createTodoApp = () => {
  const todoApp = document.createElement('div');
  todoApp.classList.add(
    'app-container',
    'vh-100',
    'w-100',
    'd-flex',
    'align-items-center',
    'justify-content-center',
    'flex-column',
  );

  const heading = document.createElement('h3');
  heading.textContent = 'Todo App';
  todoApp.append(heading);

  const form = createForm();
  todoApp.append(form);

  const table = createTable();
  todoApp.append(table);

  return todoApp;
};

export const renderTasks = (tasks) => {
  const table = document.querySelector('.table tbody');

  table.innerHTML = '';
  tasks.forEach((task, index) => {
    const row = createTaskRow(task.task, task.status, index + 1);
    table.append(row);
  });
};
