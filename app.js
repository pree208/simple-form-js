//define UI variables

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// //load all event listener
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear task event
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks event
  filter.addEventListener('keyup', filterTasks);
}

//GET TASKS FROM LOCAL STORAGE
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task) {
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
  });
}
//ADD TASK

function addTask(e) {
  if (taskInput.value === '') {
    alert('add task');
  }

  //create li element
  const li = document.createElement('li');

  //add class
  li.className = 'collection-item';
  //append text node
  li.appendChild(document.createTextNode(taskInput.value));
  //create link
  const link = document.createElement('a');
  //add class
  link.className = 'delete-item secondary-content';
  //add icon
  link.innerHTML = '<i class="fa fa-remove"></i>';
  //append link to li
  li.appendChild(link);
  //append li to ul
  taskList.appendChild(li);

  //STORE IN LOCAL STORAGE

  storeTaskInLocalStorage(taskInput.value);

  //clear input
  taskInput.value = '';
  e.preventDefault();
}

//store task

function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));//since localstorage doesnt store array it is converted to string
}



//remove task

function removeTask(e) {

  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure??')) {
      e.target.parentElement.parentElement.remove();

      //remove element from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
  //console.log('remove');
}

//remove from LS
// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}


//CLEAR TASKS

function clearTasks() {
  //taskList.innerHTML = '';
  //document.querySelector('ul').remove();

  //faster
  while (taskList.firstChild) {//if firstchild is present in tasklist,it will beremoved.then everything is considered as removed
    taskList.removeChild(taskList.firstChild);
  }

  //CLEAR TASK FROM LOCAL STORAGE
  clearTaskFromLocalStorage();
}

//clear task from ls
function clearTaskFromLocalStorage() {
  localStorage.clear();
}


//FILTER TASKS
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  //console.log(text);

  document.querySelectorAll('.collection-item').forEach(function (task) {
    const item = task.firstChild.textContent;
    //console.log(task);
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    }
    else {
      task.style.display = 'none';
    }


  }
  );
}

