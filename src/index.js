import './style.css';

const todoList = document.querySelector('.wrapper');
const inputTodo = document.querySelector('#todo-name');
const todosArray = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];

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
<svg class="w-2 h-2 ${todoValue.description}" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z">
  </path>
</svg>
<svg class="w-6 h-6 hidden ${todoValue.description}" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
    `;
  todoList.appendChild(todo);
};

const createTodoFromTheLocalStorage = () => {
  const todos = JSON.parse(localStorage.getItem('todos'));
  if (todos) {
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
  console.log('window loaded');
  document.querySelectorAll('.todo-desc').forEach((item) => {
    // TODO: Add event listener when input is entered
    // Edit local storage when input is changed
    item.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const todos = JSON.parse(localStorage.getItem('todos'));
        // Find the element with the same index
        const todo = todos.find((todo) => todo.index === parseInt(item.id.replace('todo-', ''), 10));
        console.log(item.id.replace('todo-', ''), todo);
        // Add the new value to the todo
        todo.description = item.value;
        // Save the new value to the local storage
        localStorage.setItem('todos', JSON.stringify(todos));
      }
    });
  });
};

// Get todos from local storage on page load
document.addEventListener('DOMContentLoaded', createTodoFromTheLocalStorage);