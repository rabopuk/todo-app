/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
import { addTask, completeTask, deleteTask } from './control.js';
import { buttonLabels } from './elements.js';
import { closeModal } from './modal.js';
import { addTaskRow, deleteTaskRow, renderTasks, updateRowNumbers, updateTaskRow } from './render.js';
import {
  getCurrentUser,
  getTasks,
  saveTasks,
  setCurrentUser,
} from './storage.js';

const handleModalClick = (e, modal) => {
  if (e.target === modal) {
    closeModal(modal);
  }
};

const handleCloseButtonClick = (e, modal) => {
  e.stopPropagation();

  closeModal(modal);
};

const handleEscapeKey = (e, modal) => {
  if (e.key === 'Escape') {
    closeModal(modal);
  }
};

const handleTaskInput = (e, taskSubmitButton) => {
  taskSubmitButton.disabled = !e.target.value.trim();
};

const handleClearButton = (e, taskInput, taskSubmitButton) => {
  e.preventDefault();

  taskInput.value = '';

  taskSubmitButton.disabled = true;
};

const handleNameSubmit = (e, nameInput, modal) => {
  e.preventDefault();

  if (nameInput.value.trim() !== '') {
    const username = nameInput.value.trim();

    setCurrentUser(username);

    const appTitle = document.getElementById('app-title');
    appTitle.textContent = `Привет, ${username}! Твой список дел:`;

    renderTasks(getTasks(username));
    closeModal(modal);
  }
};

const handleTaskSelect = (e, taskSelect) =>
  taskSelect.options[taskSelect.selectedIndex].value;

const handleTaskSubmit = (e, taskInput, taskSubmitButton, taskSelect) => {
  e.preventDefault();

  const username = getCurrentUser();

  if (taskInput.value.trim()) {
    const taskText = taskInput.value.trim();
    const tasks = addTask(taskText);

    saveTasks(username, tasks);

    taskInput.value = '';

    const newTask = tasks[tasks.length - 1];

    const newTaskRow = addTaskRow(newTask, tasks.length);
    const select = handleTaskSelect(e, taskSelect);
    console.log('select: ', select);
    newTaskRow.className = select;
    updateRowNumbers();
    handleTaskInput({ target: taskInput }, taskSubmitButton);
  }
};

const handleTaskComplete = e => {
  e.stopPropagation();

  const row = e.target.closest('.table-light, .table-success, .table-warning, .table-danger');
  const taskId = row.dataset.id;
  const updatedTask = completeTask(taskId);

  updateTaskRow(taskId, updatedTask.status);

  const button = row.querySelector('.btn-success');
  button.textContent = updatedTask.status === 'Выполнена' ?
    buttonLabels[2] :
    buttonLabels[1];
};

const handleTaskEdit = e => {
  if (!e.target.classList.contains('btn-edit')) {
    return;
  }

  e.stopPropagation();

  const row = e.target.closest('.table-light, .table-success, .table-warning, .table-danger');
  const taskId = row.dataset.id;
  const taskCell = row.querySelector('td:nth-child(2)');

  if (e.target.textContent === 'Редактировать') {
    taskCell.contentEditable = 'true';
    e.target.textContent = 'Сохранить';
    taskCell.focus();
  } else {
    taskCell.contentEditable = 'false';
    e.target.textContent = 'Редактировать';

    const username = getCurrentUser();
    const tasks = getTasks(username);

    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex !== -1) {
      tasks[taskIndex].task = taskCell.textContent;
    }

    saveTasks(username, tasks);
  }
};

const handleTaskDelete = e => {
  e.stopPropagation();

  const row = e.target.closest('.table-light, .table-success, .table-warning, .table-danger');
  const taskId = row.dataset.id;
  const userConfirmed = confirm('Вы уверены, что хотите удалить эту задачу?');

  if (userConfirmed) {
    deleteTask(taskId);
    deleteTaskRow(taskId);
  }
};

const addEventListener = (element, eventType, handler) =>
  element.addEventListener(eventType, handler);

export const bindEvents = (
  modal,
  closeButton,
  taskInput,
  nameInput,
  nameSubmitButton,
  taskSubmitButton,
  clearButton,
  taskSelect,
) => {
  addEventListener(modal, 'click', e =>
    handleModalClick(e, modal));

  addEventListener(closeButton, 'click', e =>
    handleCloseButtonClick(e, modal));

  addEventListener(document, 'keydown', e =>
    handleEscapeKey(e, modal));

  addEventListener(nameSubmitButton, 'click', e =>
    handleNameSubmit(e, nameInput, modal));

  addEventListener(taskInput, 'input', e =>
    handleTaskInput(e, taskSubmitButton));

  addEventListener(clearButton, 'click', e =>
    handleClearButton(e, taskInput, taskSubmitButton));

  addEventListener(taskSubmitButton, 'click', e =>
    handleTaskSubmit(e, taskInput, taskSubmitButton, taskSelect));

  addEventListener(document, 'click', e => {
    if (e.target.classList.contains('btn-success')) {
      const taskId = e.target.closest('.table-light, .table-success, .table-warning, .table-danger').dataset.id;
      handleTaskComplete(e, taskId);
    }

    if (e.target.classList.contains('btn-danger')) {
      const taskId = e.target.closest('.table-light, .table-success, .table-warning, .table-danger').dataset.id;
      handleTaskDelete(e, taskId);
    }

    if (e.target.classList.contains('btn-warning')) {
      handleTaskEdit(e);
    }
  });

  handleTaskInput({ target: taskInput }, taskSubmitButton);
};
