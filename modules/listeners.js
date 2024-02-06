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
  setCurrentUser('default');
  saveTasks('default', []);
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
  } else {
    setCurrentUser('default');
    saveTasks('default', []);
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

const handleTaskComplete = (e, taskId) => {
  if (e.target.classList.contains('btn-success')) {
    completeTask(taskId);
  }
};

const handleTaskDelete = (e, taskId) => {
  if (e.target.classList.contains('btn-danger')) {
    deleteTask(taskId);
  }
};

const handleEscapeKey = (e, modal) => {
  if (e.key === 'Escape') {
    closeModal(modal);
  }
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
  username,
) => {
  addEventListener(modal, 'click', e => handleModalClick(e, modal));

  addEventListener(closeButton, 'click', e => handleCloseButtonClick(e, modal));

  addEventListener(nameSubmitButton, 'click', e =>
    handleNameSubmit(e, nameInput, modal));

  addEventListener(taskSubmitButton, 'click', e =>
    handleTaskSubmit(e, taskInput));

  addEventListener(document, 'keydown', e => handleEscapeKey(e, modal));

  taskElements.forEach(taskElement => {
    const taskId = taskElement.dataset.id;
    addEventListener(taskElement, 'click', e => handleTaskComplete(e, taskId));
    addEventListener(taskElement, 'click', e => handleTaskDelete(e, taskId));
  });
};
