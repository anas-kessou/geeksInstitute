export class TodoList {
    constructor() {
      this.tasks = [];
    }
  
    addTask(task) {
      this.tasks.push({ task, completed: false });
    }
  
    completeTask(task) {
      const item = this.tasks.find(t => t.task === task);
      if (item) item.completed = true;
    }
  
    listTasks() {
      console.log('Todo List:');
      this.tasks.forEach((t, i) =>
        console.log(`${i + 1}. ${t.task} - ${t.completed ? 'Done' : 'Pending'}`)
      );
    }
  }