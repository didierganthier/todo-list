// Create todo class with methods add and remove
export default class Todo {
  constructor() {
    this.todos = [];
  }

  add(todo) {
    this.todos.push(todo);
  }

  remove(todo) {
    this.todos = this.todos.filter((t) => t !== todo);
  }
}