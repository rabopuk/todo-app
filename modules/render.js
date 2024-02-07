/* eslint-disable object-curly-spacing */
import { getElements } from './DOM.js';
import { createTaskRow } from './elements.js';

export const addTaskRow = (task, rowIndex) => {
  const { table } = getElements();
  const row = createTaskRow(task.task, task.status, rowIndex + 1, task.id);

  table.append(row);

  return row;
};

export const updateTaskRow = (taskId, status) => {
  const row = document.querySelector(`.table tbody tr[data-id="${taskId}"]`);
  const statusCell = row.children[2];
  const taskCell = row.children[1];

  statusCell.textContent = status;
  row.className = status === 'Выполнена' ? 'table-success' : 'table-light';

  if (status === 'Выполнена') {
    taskCell.style.textDecoration = 'line-through';
  } else {
    taskCell.style.textDecoration = 'none';
  }
};

export const updateRowNumbers = () => {
  const { table } = getElements();

  [...table.children].forEach((row, index) => {
    const idCell = row.children[0];

    idCell.textContent = index + 1;
  });
};

export const deleteTaskRow = (taskId) => {
  const row = document.querySelector(`.table tbody tr[data-id="${taskId}"]`);
  row.remove();

  updateRowNumbers();
};

export const renderTasks = (tasks) => {
  const { table } = getElements();

  table.innerHTML = '';

  const rows = tasks.map((task, index) =>
    createTaskRow(task.task, task.status, index + 1, task.id));

  table.append(...rows);
};
