/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
import { addTask, completeTask, deleteTask } from './control.js';
import { closeModal } from './modal.js';
import { renderTasks } from './render.js';
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

const handleTaskSubmit = (e, taskInput) => {
  e.preventDefault();

  const username = getCurrentUser();

  if (taskInput.value.trim() !== '') {
    const taskText = taskInput.value.trim();

    saveTasks(username, addTask(taskText));
    taskInput.value = '';
    renderTasks(getTasks(username));
  }
};

const handleTaskComplete = (e) => {
  e.stopPropagation();

  const taskId = e.target.closest('.table-light, .table-success').dataset.id;

  completeTask(taskId);
  renderTasks(getTasks(getCurrentUser()));
};

const handleTaskDelete = (e) => {
  e.stopPropagation();

  const taskId = e.target.closest('.table-light, .table-success').dataset.id;

  deleteTask(taskId);
  renderTasks(getTasks(getCurrentUser()));
};

const addEventListener = (element, eventType, handler) =>
  element.addEventListener(eventType, handler);

export const bindEvents = (
  modal,
  closeButton,
  nameInput,
  taskInput,
  taskElements,
  nameSubmitButton,
  taskSubmitButton,
) => {
  addEventListener(modal, 'click', e => handleModalClick(e, modal));

  addEventListener(closeButton, 'click', e => handleCloseButtonClick(e, modal));

  addEventListener(nameSubmitButton, 'click', e =>
    handleNameSubmit(e, nameInput, modal));

  addEventListener(taskSubmitButton, 'click', e =>
    handleTaskSubmit(e, taskInput));

  addEventListener(document, 'keydown', e => handleEscapeKey(e, modal));

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
};
