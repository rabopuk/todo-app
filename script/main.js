/* eslint-disable object-curly-spacing */
import { bindEvents } from './listeners.js';
import { createModal } from './modal.js';
import { createTodoApp, renderTasks } from './render.js';

let tasks = [];

const init = () => {
  const appContainer = document.querySelector('.app-container');
  const todoApp = createTodoApp();
  appContainer.append(todoApp);

  tasks = [
    { task: 'Купить слона', status: 'В процессе' },
    { task: 'Помыть кота', status: 'Выполнена' },
  ];

  renderTasks(tasks);

  const modal = createModal('Добро пожаловать в Todo App!');
  appContainer.append(modal);

  const closeButton = modal.querySelector('.btn-close');
  const form = modal.querySelector('form');
  const input = form.querySelector('input');

  bindEvents(modal, closeButton, form, input);
};

window.onload = init;
