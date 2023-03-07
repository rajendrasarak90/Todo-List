// JavaScript

// All the required variables
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const totalCount = document.getElementById('total-count');
const completeAllTasks = document.getElementById('complete-all-tasks');
const completeTaskIcon = document.getElementById('complete-task-icon');
const clearCompleted = document.getElementById('clear-completed');
const all = document.getElementById('all');
const uncomplete = document.getElementById('uncomplete');
const completed = document.getElementById('completed');


let todos = []; // Array for storing all Todos Tasks

function renderTodos() {  // function for rendering tasks
  // code to set color of all buttons to lightgrey
  uncomplete.style.color = 'rgb(204, 204, 204)';
  completed.style.color = 'rgb(204, 204, 204)';
  all.style.color = 'black';
  completeAllTasks.style.color = 'rgb(204, 204, 204)';
  completeTaskIcon.style.color = 'rgb(204, 204, 204)';
  completeAllTasks.style.color = 'rgb(204, 204, 204)';
  clearCompleted.style.color = 'rgb(204, 204, 204)';

  todoList.innerHTML = ''; // setting empty todolist 

  todoInput.addEventListener('input', function(){ // Event listner to show add button when task is typed in input
    addBtn.style.visibility = 'visible';
  })

  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i]; 
    const li = document.createElement('li');  // creating new list item for task to be added in list

    const checkbox = document.createElement('input'); // checkbox for new task
    checkbox.type = 'checkbox';
    checkbox.className = 'circle-check';
    checkbox.checked = todo.done;
    checkbox.addEventListener('change', () => {
      todo.done = checkbox.checked;
      renderTodos();
    });

    const textSpan = document.createElement('span'); // text in new task
    textSpan.className = `todo-text ${todo.done ? 'checked' : ''}`;
    textSpan.textContent = todo.text;

    const deleteBtn = document.createElement('i'); // delete button for new task
    deleteBtn.classList.add('delete-btn','fa-solid', 'fa-circle-xmark');
    deleteBtn.addEventListener('click', () => {
      todos.splice(i, 1);
      renderTodos();
    });

    // adding checkbox, text and button in new task
    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(deleteBtn);

    // Event listner for showing delete button when hover over the task
    li.addEventListener('mouseenter', () => {
      deleteBtn.style.visibility = 'visible';
    });
    li.addEventListener('mouseleave', () => {
      deleteBtn.style.visibility = 'hidden';
    });

    todoList.appendChild(li); // adding new task in todo list

    all.addEventListener('click', function(){ // event listner for "All" button
      uncomplete.style.color = 'rgb(204, 204, 204)';
      completed.style.color = 'rgb(204, 204, 204)';
      all.style.color = 'black';
      li.style.display = 'flex';
    });

    uncomplete.addEventListener('click', function(){ // event listner for "Uncompleted" button
      all.style.color = 'rgb(204, 204, 204)';
      completed.style.color = 'rgb(204, 204, 204)';
      uncomplete.style.color = 'black';
      if(todo.done == true){
        li.style.display = 'none';
      }else{
        li.style.display = 'flex';
      }
    });

    completed.addEventListener('click', function(){ // event listner for "Completed" button
      all.style.color = 'rgb(204, 204, 204)';
      uncomplete.style.color = 'rgb(204, 204, 204)';
      completed.style.color = 'black';
      if(todo.done == false){
        li.style.display = 'none';
      }else{
        li.style.display = 'flex';
      }
    });

    completeAllTasks.addEventListener('click', function(){ // event listner for "Complete all task" button
      completeAllTasks.style.color = 'black';
      completeTaskIcon.style.color = 'black';
      textSpan.style.color = 'grey';
      textSpan.style.opacity = '0.7';
      checkbox.checked = true;
      todo.done = true;
    });
    totalCount.textContent = `${todos.length} Task${todos.length === 1 ? '' : 's'}`; // updating the count of tasks in todo lsit
  }
  
}

addBtn.addEventListener('click', () => { // event listner for adding new task in task list button
  const text = todoInput.value.trim();
  if (text) {
    todos.push({ text, done: false });
    todoInput.value = '';
    addBtn.style.visibility = 'hidden';
    renderTodos();
  }
});

todoInput.addEventListener('keydown', (event) => { // another way for adding new task by pressing "Enter" key
  if (event.keyCode === 13) {
    const text = todoInput.value.trim();
    if (text) {
      todos.push({ text, done: false });
      todoInput.value = '';
      addBtn.style.visibility = 'hidden';
      renderTodos();
    }
  }
})

clearCompleted.addEventListener('click', () => { // event listner for "Clear completed" button
  clearCompleted.style.color = 'black';
  const completedTasks = document.querySelectorAll('input[type="checkbox"]:checked');
  completedTasks.forEach(task => {
  task.parentNode.remove();
  });
  todos = todos.filter(item => item.done == false);
  totalCount.textContent = `${todos.length} Task${todos.length === 1 ? '' : 's'}`; // updating the count of tasks in todo lsit
});

renderTodos();
