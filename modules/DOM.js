export const getElements = () => {
  const appContainer = document.querySelector('.app-container');
  const closeButton = document.querySelector('.btn-close');
  const nameInput = document.querySelector('#name');
  const taskInput = document.querySelector('#task-input');
  const nameSubmitButton = document.querySelector('#name-submit-button');
  const taskSubmitButton = document.querySelector('#task-submit-button');
  const clearButton = document.getElementById('clearBtn');
  const taskSelect = document.querySelector('.form-select');
  const table = document.querySelector('.table tbody');
  const appTitle = document.getElementById('app-title');

  return {
    appContainer,
    closeButton,
    nameInput,
    taskInput,
    nameSubmitButton,
    taskSubmitButton,
    clearButton,
    taskSelect,
    table,
    appTitle,
  };
};
