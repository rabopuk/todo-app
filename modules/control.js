/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
import { getCurrentUser, getTasks, saveTasks } from './storage.js';
import { generateId } from './utils.js';

const TASK_STATUSES = ['Не выполнена', 'Выполнена'];
export const TASK_IMPORTANCES = ['Обычная', 'Важная', 'Срочная'];
export const IMPORTANCE_CLASSES = ['table-light', 'table-warning', 'table-danger'];

export const addTask = (task, importance) => {
  const username = getCurrentUser();
  const tasks = getTasks(username);

  const newTask = {
    id: generateId(),
    task,
    status: TASK_STATUSES[0],
    importance,
  };

  const updatedTasks = [...tasks, newTask];
  saveTasks(username, updatedTasks);

  return updatedTasks;
};

export const completeTask = (taskId) => {
  const tasks = getTasks(getCurrentUser());
  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex !== -1) {
    tasks[taskIndex].status = tasks[taskIndex].status === 'Выполнена' ? 'Не выполнена' : 'Выполнена';

    saveTasks(getCurrentUser(), tasks);

    return tasks[taskIndex];
  }
};

export const deleteTask = id => {
  const username = getCurrentUser();
  const tasks = getTasks(username);

  const updatedTasks = tasks.filter(task => task.id !== id);
  saveTasks(username, updatedTasks);
};
