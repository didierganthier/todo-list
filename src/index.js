import './style.css';

const todoList = document.querySelector('.wrapper');
const inputTodo = document.querySelector('#todo-name');
let todosArray = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];

const getValueFromInput = () => {
  const todoValue = inputTodo.value;
  inputTodo.value = '';
  return todoValue;
};

const createTodo = (todoValue) => {
  const todo = document.createElement('li');
  todo.classList.add('item');
  todo.innerHTML = `
  <div>
  <input type="checkbox" ${todoValue.completed ? 'checked' : ''}>
  <input type="text" id="todo-${todoValue.index}" class="todo-desc" value="${todoValue.description}">
</div>
<svg class="w-6 h-6 ${todoValue.description}" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
    `;
  todoList.appendChild(todo);
};

const createTodoFromTheLocalStorage = () => {
  const todos = JSON.parse(localStorage.getItem('todos'));
  if (todos) {
    todosArray = [];
    todos.forEach((todo) => {
      todosArray.push({
        index: todo.index,
        description: todo.description,
        completed: todo.completed,
      });
      createTodo(todo);
    });
  }
};

const saveTodoToLocalStorage = () => {
  localStorage.setItem('todos', JSON.stringify(todosArray));
};

// Add todo when enter key is pressed
inputTodo.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const todoValue = getValueFromInput();
    todosArray.push({
      index: todosArray.length + 1,
      description: todoValue,
      completed: false,
    });
    saveTodoToLocalStorage();
    createTodo(todosArray[todosArray.length - 1]);
  }
});

// Add an event listener to each todo item
window.onload = () => {
  document.querySelectorAll('.todo-desc').forEach((item) => {
    // TODO: Add event listener when input is entered
    // Edit local storage when input is changed
    // item.addEventListener('focus', (e) => {
    //   document.querySelectorAll(`svg[class*="${e.target.value}"]`)[0].classList.toggle('hidden');
    // });
    // item.addEventListener('focusout', (e) => {
    //   document.querySelectorAll(`svg[class*="${e.target.value}"]`)[0].classList.toggle('hidden');
    // });
    item.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const todos = JSON.parse(localStorage.getItem('todos'));
        // Find the element with the same index
        const todo = todos.find((todo) => todo.index === parseInt(item.id.replace('todo-', ''), 10));
        // Add the new value to the todo
        todo.description = item.value;
        // Save the new value to the local storage
        localStorage.setItem('todos', JSON.stringify(todos));
      }
    });
  });

  // Delete todo when trash svg is clicked
  document.querySelectorAll('svg').forEach((item) => {
    item.addEventListener('click', (e) => {
      // Get parent element
      const parent = e.target.parentElement.parentElement;
      // Delete the element from the DOM
      parent.remove();
      // If array length is 1 just delete everything
      if (todosArray.length === 1) {
        todosArray = [];
        localStorage.setItem('todos', JSON.stringify(todosArray));
        return;
      }
      // Remove the element from the local storage
      const todos = JSON.parse(localStorage.getItem('todos'));
      // Get the index of the element to be deleted
      const index = parseInt(parent.querySelector('.todo-desc').id.replace('todo-', ''), 10);
      // // Find the element with the same index
      const todoIndex = todos.find((todo) => todo.index === index);
      // // Remove the element from the array
      todosArray = todos.filter((todo) => todoIndex !== todo);
      // // Change the index of the todos
      todosArray.forEach((todo, i) => {
        todo.index = i + 1;
      });
      // // Save the new array to the local storage
      localStorage.setItem('todos', JSON.stringify(todosArray));
    });
  });
};

document.querySelector('.demo').addEventListener('click', () => console.log(todosArray));

// Get todos from local storage on page load
document.addEventListener('DOMContentLoaded', createTodoFromTheLocalStorage);