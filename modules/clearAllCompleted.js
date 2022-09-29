const clearAllCompleted = (todosArray) => {
  const checkedTodos = document.querySelectorAll('input[type="checkbox"]:checked');
  // If there are no checked todos
  if (checkedTodos.length === 0) {
    console.log('No checked todos');
  } else {
    // Get the todos from the local storage
    let todos = JSON.parse(localStorage.getItem('todos'));
    // Filter out the todos that are not checked
    todos = todos.filter((todo) => todo.completed === false);
    // Save the new todos to the local storage
    todosArray = todos;
    localStorage.setItem('todos', JSON.stringify(todosArray));
    // Reload the page
    window.location.reload();
  }
};

export default clearAllCompleted;