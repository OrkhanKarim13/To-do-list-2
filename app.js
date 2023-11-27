document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todoForm');
    const taskList = document.getElementById('taskList');
  
    form.addEventListener('submit', addTask);
  
    taskList.addEventListener('click', (event) => {
      if (event.target.classList.contains('delete')) {
        deleteTask(event);
      } else if (event.target.classList.contains('edit')) {
        editTask(event);
      }
    });
  
    loadTasksFromLocalStorage();
  });
  
  function addTask(event) {
    event.preventDefault();
  
    const priority = document.getElementById('priority').value;
    const taskText = document.getElementById('task').value.trim();
  
    if (!taskText) return;
  
    const task = {
      priority,
      text: taskText
    };
  
    createTaskElement(task);
    saveTaskToLocalStorage(task);
  
    document.getElementById('task').value = '';
  }
  
  function createTaskElement(task) {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${task.priority}: ${task.text}</span>
      <button class="edit">Edit</button>
      <button class="delete">Delete</button>
    `;
  
    taskList.appendChild(li);
  }
  
  function deleteTask(event) {
    const taskItem = event.target.parentElement;
    const taskText = taskItem.querySelector('span').textContent;
  
    taskItem.remove();
    removeTaskFromLocalStorage(taskText);
  }
  
  function editTask(event) {
    const taskItem = event.target.parentElement;
    const taskText = taskItem.querySelector('span').textContent;
  
    const newText = prompt('Edit Task:', taskText);
  
    if (newText !== null) {
      taskItem.querySelector('span').textContent = newText;
  
      updateTaskInLocalStorage(taskText, newText);
    }
  }
  
  function saveTaskToLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  function loadTasksFromLocalStorage() {
    if (localStorage.getItem('tasks') !== null) {
      const tasks = JSON.parse(localStorage.getItem('tasks'));
  
      tasks.forEach(task => {
        createTaskElement(task);
      });
    }
  }
  
  function removeTaskFromLocalStorage(text) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
  
    const filteredTasks = tasks.filter(task => {
      return task.text !== text;
    });
  
    localStorage.setItem('tasks', JSON.stringify(filteredTasks));
  }
  
  function updateTaskInLocalStorage(oldText, newText) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
  
    tasks.forEach(task => {
      if (task.text === oldText) {
        task.text = newText;
      }
    });
  
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }