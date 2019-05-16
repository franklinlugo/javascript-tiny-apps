const createListForm = document.getElementById('create-list-form');
createListForm.addEventListener('submit', handleCreateListForm);

function handleCreateListForm(event) {
  event.preventDefault();
  const formData = new FormData(this);
  const listName = formData.get('listName');
  if (listName) {
    const list = new TodoList(listName);
    handleAddTask(list);
    handleListContainer(list);
    this.reset();
  }
}

function handleAddTask(list) {
  const addTaskInput = document.getElementById(`add-task-${list.name}`);
  addTaskInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter' && this.value) {
      let task = new Task(this.value);
      list.addTask(task);
      this.value = '';
    }
  });
}

function handleListContainer(list) {
  let listContainer = document.getElementById(`${list.name}-list`);
  listContainer.addEventListener('click', function(event) {
    if (event.target.tagName === 'BUTTON') {
      event.preventDefault();

      let taskItem = event.target.parentElement;
      let tasksItems = [...listContainer.querySelectorAll('li')];
      let taskIndex = tasksItems.indexOf(taskItem);

      list.deleteTask(taskIndex);
    }
    if (event.target.tagName === 'INPUT') {
      handleCompleteState(event, list, listContainer);
    }
  });
}

function handleCompleteState(event, list, listContainer) {
  let taskItem = event.target.parentElement;
  let tasksItems = [...listContainer.querySelectorAll('li')];
  let taskIndex = tasksItems.indexOf(taskItem);
  list.tasksList[taskIndex].toggleCompleteState();
  list.renderTasks();
}

class TodoList {
  constructor(name) {
    this.name = name;
    this.tasksList = [];
    this.createListContainer();
  }

  createListContainer() {
    let app = document.getElementById('app');

    let container = document.createElement('div'); // main container of list
    container.classList = `${this.name}-container`;
    container.id = `${this.name}-container`;

    let listTitle = document.createElement('h2'); // list title
    listTitle.classList = `${this.name}-title`;
    let textTitle = document.createTextNode(this.name);
    listTitle.appendChild(textTitle);

    let listContainer = document.createElement('ul'); // unorder list container
    listContainer.classList = `${this.name}-list`;
    listContainer.id = `${this.name}-list`;

    let addTaskInput = document.createElement('input'); // input to add task
    addTaskInput.type = 'text';
    addTaskInput.id = `add-task-${this.name}`;
    addTaskInput.placeholder = `Add task for ${this.name} list`;

    container.appendChild(listTitle);
    container.appendChild(listContainer);
    container.appendChild(addTaskInput);

    app.appendChild(container);
  }

  addTask(taskName) {
    this.tasksList.push(taskName);
    this.renderTasks();
  }

  deleteTask(taskIndex) {
    this.tasksList.splice(taskIndex, 1);
    this.renderTasks();
  }

  renderTasks() {
    let listContainer = document.getElementById(`${this.name}-list`);
    let tasks = this.tasksList.map(
      task => `
          <li class="task ${task.isComplete ? 'complete' : ''}">
            <input type="checkbox" ${task.isComplete ? 'checked' : ''}/>
            <span>${task.name}</span>
            <button>
              <svg class="sgv-trash-icon" version="1.1" viewBox="0 0 268.476 268.476" width="12" height="12">
              <path d="M63.119,250.254c0,0,3.999,18.222,24.583,18.222h93.072
                c20.583,0,24.582-18.222,24.582-18.222l18.374-178.66H44.746L63.119,250.254z M170.035,98.442c0-4.943,4.006-8.949,8.949-8.949
                c4.943,0,8.95,4.006,8.95,8.949l-8.95,134.238c0,4.943-4.007,8.949-8.949,8.949c-4.942,0-8.949-4.007-8.949-8.949L170.035,98.442z
                M125.289,98.442c0-4.943,4.007-8.949,8.949-8.949c4.943,0,8.949,4.006,8.949,8.949v134.238c0,4.943-4.006,8.949-8.949,8.949
                c-4.943,0-8.949-4.007-8.949-8.949V98.442z M89.492,89.492c4.943,0,8.949,4.006,8.949,8.949l8.95,134.238
                c0,4.943-4.007,8.949-8.95,8.949c-4.942,0-8.949-4.007-8.949-8.949L80.543,98.442C80.543,93.499,84.55,89.492,89.492,89.492z
                M218.36,35.811h-39.376V17.899C178.984,4.322,174.593,0,161.086,0L107.39,0C95.001,0,89.492,6.001,89.492,17.899v17.913H50.116
                c-7.914,0-14.319,6.007-14.319,13.43c0,7.424,6.405,13.431,14.319,13.431H218.36c7.914,0,14.319-6.007,14.319-13.431
                C232.679,41.819,226.274,35.811,218.36,35.811z M161.086,35.811h-53.695l0.001-17.913h53.695V35.811z"/>
              </svg>
            </button>
          </li>
        `
    );
    listContainer.innerHTML = tasks.reduce((a, b) => a + b, '');
  }
}

class Task {
  constructor(name) {
    this.name = name;
    this.isComplete = false;
  }
  toggleCompleteState() {
    this.isComplete = !this.isComplete;
  }
}
