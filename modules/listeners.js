/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
import { addTask, completeTask, deleteTask } from './control.js';
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

const handleNameSubmit = (e, nameInput, modal) => {
  e.preventDefault();

  if (nameInput.value.trim() !== '') {
    const username = nameInput.value.trim();

    setCurrentUser(username);

    const appTitle = document.getElementById('app-title');
    appTitle.textContent = `Todo List for ${username}`;

    renderTasks(getTasks(username));
    closeModal(modal);
  }
};

const handleTaskSubmit = (e, taskInput, taskSubmitButton) => {
  e.preventDefault();

  const username = getCurrentUser();

  if (taskInput.value.trim() !== '') {
    const taskText = taskInput.value.trim();

    const tasks = addTask(taskText);

    saveTasks(username, tasks);

    taskInput.value = '';

    const newTask = tasks[tasks.length - 1];

    addTaskRow(newTask, tasks.length);
    updateRowNumbers();
    handleTaskInput({ target: taskInput }, taskSubmitButton);
  }
};

const handleTaskComplete = e => {
  e.stopPropagation();

  const row = e.target.closest('.table-light, .table-success');
  const taskId = row.dataset.id;

  const updatedTask = completeTask(taskId);
  updateTaskRow(taskId, updatedTask.status);

  const button = row.querySelector('.btn-success');
  button.textContent = updatedTask.status === 'Выполнена' ?
    'Отменить' :
    'Завершить';
};

const handleTaskDelete = e => {
  e.stopPropagation();

  const taskId = e.target.closest('.table-light, .table-success').dataset.id;

  deleteTask(taskId);
  deleteTaskRow(taskId);
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
) => {
  addEventListener(modal, 'click', e =>
    handleModalClick(e, modal));

  addEventListener(closeButton, 'click', e =>
    handleCloseButtonClick(e, modal));

  addEventListener(document, 'keydown', e =>
    handleEscapeKey(e, modal));

  addEventListener(taskInput, 'input', e =>
    handleTaskInput(e, taskSubmitButton));

  addEventListener(nameSubmitButton, 'click', e =>
    handleNameSubmit(e, nameInput, modal));

  addEventListener(taskSubmitButton, 'click', e =>
    handleTaskSubmit(e, taskInput, taskSubmitButton));

  addEventListener(document, 'click', e => {
    if (e.target.classList.contains('btn-success')) {
      const taskId = e.target.closest('.table-light, .table-success').dataset.id;
      handleTaskComplete(e, taskId);
    }

    if (e.target.classList.contains('btn-danger')) {
      const taskId = e.target.closest('.table-light, .table-success').dataset.id;
      handleTaskDelete(e, taskId);
    }
  });

  handleTaskInput({ target: taskInput }, taskSubmitButton);
};
