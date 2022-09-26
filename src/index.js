import './style.css';

const todoList = document.querySelector('.wrapper');
const todosArray = [
  {
    id: 1,
    name: 'Learn HTML',
    completed: true,
  },
  {
    id: 2,
    name: 'Learn CSS',
    completed: true,
  },
  {
    id: 3,
    name: 'Learn JS',
    completed: false,
  },
];

const createTodo = (todoValue) => {
  const todo = document.createElement('li');
  todo.classList.add('item');
  todo.innerHTML = `
  <div>
  <input type="checkbox" id="todo-1" ${todoValue.completed ? 'checked' : ''}>
  <input type="text" value="${todoValue.name}">
</div>
<svg class="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z">
  </path>
</svg>
    `;
  todoList.appendChild(todo);
};

const createTodosFromTodosArray = () => {
  todosArray.forEach((todo) => {
    createTodo(todo);
  });
};

createTodosFromTodosArray();