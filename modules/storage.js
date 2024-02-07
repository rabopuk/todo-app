/* eslint-disable object-curly-spacing */
export const setUsername = (username) => {
  if (!localStorage.getItem(username)) {
    localStorage.setItem(username, JSON.stringify([]));
  }
};

export const getUserData = (inputValue) => {
  const username = localStorage.getItem(inputValue);
  return username ? JSON.parse(username) : [];
};

export const setCurrentUser = (username = 'default') => {
  localStorage.setItem('currentUser', username);
};

export const getCurrentUser = () => localStorage.getItem('currentUser');

export const saveTasks = (username = getCurrentUser(), tasks = []) => {
  localStorage.setItem(username, JSON.stringify(tasks));
};

export const getTasks = username => {
  const tasks = localStorage.getItem(username);
  return tasks ? JSON.parse(tasks) : [];
};

export const addTaskToStorage = (username, task) => {
  const tasks = getTasks(username);

  tasks.push(task);
  saveTasks(username, tasks);
};
