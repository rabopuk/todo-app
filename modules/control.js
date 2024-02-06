/* eslint-disable object-curly-spacing */
import { generateId, getCurrentUser, getTasks, saveTasks } from './storage.js';

const TASK_STATUSES = ['Не выполнена', 'Выполнена'];

export const addTask = task => {
  const username = getCurrentUser();
  const tasks = getTasks(username);

  const newTask = {
    id: generateId(),
    task,
    status: TASK_STATUSES[0],
  };

  tasks.push(newTask);
  saveTasks(username, tasks);

  return tasks;
};

export const completeTask = id => {
  const username = getCurrentUser();
  let tasks = getTasks(username);

  tasks = tasks.map(task =>
    (task.id === id ? { ...task, status: 'Выполнена' } : task));

  saveTasks(username, tasks);
};

export const deleteTask = id => {
  const username = getCurrentUser();
  let tasks = getTasks(username);

  tasks = tasks.filter(task => task.id !== id);
  saveTasks(username, tasks);
};
