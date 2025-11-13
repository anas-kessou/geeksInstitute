import { TodoList } from './todo.js';

const myTodos = new TodoList();
myTodos.addTask('Finish Node.js exercises');
myTodos.addTask('Review modules');
myTodos.addTask('Read documentation');

myTodos.completeTask('Finish Node.js exercises');
myTodos.listTasks();