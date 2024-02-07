/* eslint-disable object-curly-spacing */
import { createTaskRow } from './elements.js';

export const addTaskRow = (task, rowIndex) => {
  const table = document.querySelector('.table tbody');
  const row = createTaskRow(task.task, task.status, rowIndex + 1, task.id);

  table.append(row);
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
  const table = document.querySelector('.table tbody');

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
  const table = document.querySelector('.table tbody');

  table.innerHTML = '';

  tasks.forEach((task, index) => {
    const row = createTaskRow(task.task, task.status, index + 1, task.id);

    table.append(row);
  });
};
