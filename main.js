/* eslint-disable object-curly-spacing */
import { createModal } from './modules/modal.js';
import { createTodoApp, renderTasks } from './modules/render.js';

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
};

window.onload = init;
