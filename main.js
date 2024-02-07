/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
import { createTodoApp } from './modules/elements.js';
import { bindEvents } from './modules/listeners.js';
import { createModal } from './modules/modal.js';
import { renderTasks } from './modules/render.js';
import {
  getCurrentUser,
  getTasks,
  saveTasks,
  setCurrentUser,
} from './modules/storage.js';

const init = () => {
  const appContainer = document.querySelector('.app-container');
  const { todoApp } = createTodoApp();
  appContainer.append(todoApp);

  setCurrentUser('default');
  saveTasks('default', []);

  renderTasks(getTasks(getCurrentUser()));

  const modal = createModal('Добро пожаловать в Todo App!');
  appContainer.append(modal);

  const closeButton = document.querySelector('.btn-close');
  const nameInput = document.querySelector('#name');
  const taskInput = document.querySelector('#task-input');
  const nameSubmitButton = document.querySelector('#name-submit-button');
  const taskSubmitButton = document.querySelector('#task-submit-button');
  const clearButton = document.getElementById('clearBtn');

  bindEvents(
    modal,
    closeButton,
    taskInput,
    nameInput,
    nameSubmitButton,
    taskSubmitButton,
    clearButton,
  );
};

document.addEventListener('DOMContentLoaded', init);
