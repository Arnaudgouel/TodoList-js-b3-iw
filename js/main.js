const FORM = document.querySelector('#task-form');
const ADD_TASK = document.querySelector('#add-task');
const LOCALE_STORAGE_ITEM = 'list';
const LIST = document.querySelector('#list');
let localStorageList = JSON.parse(localStorage.getItem(LOCALE_STORAGE_ITEM)) ?? [];
const LVL = document.querySelector('select#lvl');
const TASK_NAME = document.querySelector('input#name');
const TASK_DESCRIPTION = document.querySelector('textarea#description');
const DELETE_BUTTON = document.querySelector('#clear-todo');
let count = localStorageList.length ?? 0;
const TASK_DETAILS = document.querySelector('#task-details');



function displayForm(){
  FORM.classList.remove('hide');
}

function hideForm(){
  FORM.classList.add('hide');
}

function addTask(){
  localStorageList[count] = {
    'name': TASK_NAME.value,
    'description': TASK_DESCRIPTION.value,
    'lvl': LVL.value
  }
    localStorage.setItem(LOCALE_STORAGE_ITEM, JSON.stringify(localStorageList));
    addToList(TASK_NAME.value, TASK_DESCRIPTION.value, count, LVL.value)
    count++

    TASK_NAME.value = ''
    TASK_DESCRIPTION.value = ''
    LVL.value = '0'
}

ADD_TASK.addEventListener('click', (e) => {
  FORM.classList.contains('hide') ? displayForm() : hideForm();
})

FORM.addEventListener('submit', e => {
  e.preventDefault();
  addTask();
  hideForm();
})

DELETE_BUTTON.addEventListener('click', e => {
  removeAllTasks();
})

function checkLocalStorage(){
  for (const key in localStorageList) {
      const element = localStorageList[key];
      addToList(element.name, element.description, key, element.lvl);
  }
}

function addToList(name, description, id, lvl){
  let li = document.createElement('li');
  li.innerText = `${name} - ${lvl}%`;
  li.setAttribute('data-id', id);
  li.setAttribute('data-description', description);
  li.setAttribute('data-name', name);
  li.setAttribute('data-lvl', lvl);
  LIST.appendChild(li);
  li.addEventListener('click', (e) => {
    openTask(e.currentTarget);
  })
}

function removeAllTasks(){
  LIST.innerHTML = ''
  localStorageList = []
  localStorage.removeItem(LOCALE_STORAGE_ITEM);
  count = 0
}

function openTask(element){
  console.log(element);
  TASK_DETAILS.classList.remove("hide");
  let firstChild = TASK_DETAILS.firstElementChild
  firstChild.textContent = `${element.dataset.name} - ${element.dataset.lvl}%`;
  firstChild.nextElementSibling.textContent = element.dataset.description
}



checkLocalStorage()



