let logoutStatus = false;
let priority = '';
let subtasks = [];
let allTasks = [];

class Task {
    constructor(
        title,
        description,
        category,
        assigned,
        dueDate,
        priority,
        subtasks
        ){
        this.title = title;
        this.description = description;
        this.category = category;
        this.assigned = assigned;
        this.dueDate = dueDate;
        this.priority = priority;
        this.subtasks = subtasks;
    };
}



async function init() {
    await includeHTML();
    await loadAllTasks();

}

async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for(let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute('w3-include-html');
        let resp = await fetch(file);
        if(resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found'
        }
    }
}

function toggleLogout() {
    if(logoutStatus == false) {
        document.getElementById('logout').classList.remove('d-none');
        logoutStatus = true;
    } else {
        document.getElementById('logout').classList.add('d-none');
        logoutStatus = false;
        
    }
}


function activeCategory(){
    let category = document.getElementById('category');
    let newCategory = document.getElementById('newCategory');
    let inputIcons = document.getElementById('input-icons');
    if(category.value == 'new-category'){
       category.classList.add('d-none');
       newCategory.classList.remove('d-none');
       inputIcons.classList.remove('d-none');
    }
}

function activeContact() {
    let assigned = document.getElementById('assigned');
    let newContact = document.getElementById('newContact');
    let inputIcons = document.getElementById('img-icons');
    if(assigned.value == 'new-contact'){
       assigned.classList.add('d-none');
       newContact.classList.remove('d-none');
       inputIcons.classList.remove('d-none');
    }
}

function activePriority(prio, imgId){
    priority = prio;
    let button = document.getElementById(prio);
    let img = document.getElementById(imgId);
    if(prio == 'urgent'){
        resetMediumLow();
        toggleButtonUrgent(button, img);
    }else if(prio == 'medium'){
        resetUrgentLow();
        toggleButtonMedium(button, img);
    }else {
        resetUrgentMedium();
        toggleButtonLow(button, img);
    }
}

function toggleButtonUrgent(button, img){
    button.style = 'background-color: orangered; color: white';
    img.style = 'filter: invert(99%) sepia(0%) saturate(2%) hue-rotate(200deg) brightness(110%) contrast(100%);';
}

function toggleButtonMedium(button, img){
    button.style = 'background-color: orange; color: white';
    img.style = 'filter: invert(99%) sepia(0%) saturate(2%) hue-rotate(200deg) brightness(110%) contrast(100%);';
}

function toggleButtonLow(button, img){
    button.style = 'background-color: greenyellow; color: white';
    img.style = 'filter: invert(99%) sepia(0%) saturate(2%) hue-rotate(200deg) brightness(110%) contrast(100%);';
}

function resetMediumLow(){
    document.getElementById('medium').style = 'background-color: white';
    document.getElementById('low').style = 'background-color: white';
    document.getElementById('mediumImg').style = 'filter: unset';
    document.getElementById('lowImg').style = 'filter: unset';
}

function resetUrgentLow() {
    document.getElementById('urgent').style = 'background-color: white';
    document.getElementById('low').style = 'background-color: white';
    document.getElementById('urgentImg').style = 'filter: unset';
    document.getElementById('lowImg').style = 'filter: unset';
}

function resetUrgentMedium(){
    document.getElementById('medium').style = 'background-color: white';
    document.getElementById('urgent').style = 'background-color: white';
    document.getElementById('urgentImg').style = 'filter: unset';
    document.getElementById('mediumImg').style = 'filter: unset';
}

function activeSubtask() {
    let addSubtskIcon = document.getElementById('addSubtskIcon');
    let subtask = document.getElementById('subtask');
    let inputIcons = document.getElementById('subtasks-icons');
    addSubtskIcon.classList.add('d-none');
    subtask.classList.remove('d-none');
    inputIcons.classList.remove('d-none');
}


function cancelNewCategory() {
    let category = document.getElementById('category');
    let newCategory = document.getElementById('newCategory');
    let inputIcons = document.getElementById('input-icons');
    newCategory.value = '';
    document.getElementById('category').getElementsByTagName('option')[0].selected = 'selected'
    category.classList.remove('d-none');
    newCategory.classList.add('d-none');
    inputIcons.classList.add('d-none');

}

function cancelNewContact() {
    let assigned = document.getElementById('assigned');
    let newContact = document.getElementById('newContact');
    let inputIcons = document.getElementById('img-icons');
    newContact.value = '';
    document.getElementById('assigned').getElementsByTagName('option')[0].selected = 'selected'
    assigned.classList.remove('d-none');
    newContact.classList.add('d-none');
    inputIcons.classList.add('d-none');

}

function cancelNewSubtask() {
    let addSubtskIcon = document.getElementById('addSubtskIcon');
    let subtask = document.getElementById('subtask');
    let inputIcons = document.getElementById('subtasks-icons');
    subtask.value = '';
    addSubtskIcon.classList.remove('d-none');
    inputIcons.classList.add('d-none');
}

function addNewCategory() {
    let category = document.getElementById('category');
    let newCategory = document.getElementById('newCategory');
    let inputIcons = document.getElementById('input-icons');
    category.innerHTML += `<option value="${newCategory.value.toLowerCase()}" >${newCategory.value}</option>
    `;
    newCategory.value = '';
    category.classList.remove('d-none');
    newCategory.classList.add('d-none');
    inputIcons.classList.add('d-none');
}

function addNewContact() {
    let assigned = document.getElementById('assigned');
    let newContact = document.getElementById('newContact');
    let inputIcons = document.getElementById('img-icons');
    assigned.innerHTML += `<option value="${newContact.value.toLowerCase()}" >${newContact.value}</option>
    `;
    newContact.value = '';
    assigned.classList.remove('d-none');
    newContact.classList.add('d-none');
    inputIcons.classList.add('d-none');

}

function addNewSubtask() {
    let randomId = generateRandomId();
    let addSubtskIcon = document.getElementById('addSubtskIcon');
    let subtask = document.getElementById('subtask');
    let value = generateValueFronValue(subtask);
    let inputIcons = document.getElementById('subtasks-icons');
    let subtasksBox = document.getElementById('subtasksBox');
    subtasksBox.innerHTML += `<input onchange="chooseSubtask(subtask${randomId})" type="checkbox" id="subtask${randomId}" name="subtask${randomId}" value="${value}" >
    <label for="subtask${randomId}">${subtask.value}</label><br>
    `;
}

function generateRandomId() {
    
    return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
    
}

function generateValueFronValue(subtask) {
    let value = '';
    let array =  subtask.value.split(' ');
    for (let index = 0; index < array.length; index++) {
        if(index < array.length-1){
            const element = array[index] + '-';
            value += element;
        } else {
            const endElement = array[index]
            value += endElement;
        }
    }
    return value.toLocaleLowerCase();
}

function createNewTask(){
    event.preventDefault();
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let category = document.getElementById('category').value;
    let assigned = document.getElementById('assigned').value;
    let dueDate = document.getElementById('dueDate').value;

    let newTask = new Task(title, description, category, assigned, dueDate, priority, subtasks);
    console.log('NewTask is: ', newTask);
    allTasks.push(newTask);
    saveAllTasks();
    clearInputValues();

}

function chooseSubtask(subtask){
    if(subtask.checked){
        let newSubtask = subtask.value;
        subtasks.push(newSubtask);
    } else if(!subtask.checked) {
        let index =  subtasks.indexOf(subtask.value);
        subtasks.splice(index, 1);
    }
}

setURL('https://nw-join.daniel-pozzan.com/smallest_backend_ever-master');

function saveAllTasks() {
    backend.setItem('allTasks', JSON.stringify(allTasks));
}

function clearInputValues() {
    let title = document.getElementById('title').value = '';
    let description = document.getElementById('description').value = '';
    let category = document.getElementById('category').value = '';
    let assigned = document.getElementById('assigned').value = '';
    let dueDate = document.getElementById('dueDate').value = '';
}

async function loadAllTasks() {
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
}






