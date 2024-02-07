/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
import { getElements } from './modules/DOM.js';
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
  setCurrentUser();
  saveTasks();

  const { todoApp } = createTodoApp();
  const { appContainer } = getElements();
  appContainer.append(todoApp);

  const modal = createModal('Добро пожаловать в Todo App!');
  appContainer.append(modal);

  const {
    closeButton,
    nameInput,
    taskInput,
    nameSubmitButton,
    taskSubmitButton,
    clearButton,
    taskSelect,
  } = getElements();

  renderTasks(getTasks(getCurrentUser()));

  bindEvents(
    modal,
    closeButton,
    taskInput,
    nameInput,
    nameSubmitButton,
    taskSubmitButton,
    clearButton,
    taskSelect,
  );
};

document.addEventListener('DOMContentLoaded', init);
