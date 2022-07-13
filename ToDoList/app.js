// Selectors
var addButton = document.querySelector('.todo-button')
var ulDiv = document.querySelector('.todo-list');
var input = document.querySelector('.todo-input');
var todoContainer = document.querySelector('.todo-container');
const filterOption = document.querySelector('.todo-filter');
// Event listeners
addButton.addEventListener('click', addNewTodo);
todoContainer.addEventListener('click', checkTresh);
filterOption.addEventListener('click', todoFilter);
document.addEventListener('DOMContentLoaded', getTodo);
// Functions
function addNewTodo(e) {
    // Stops refreshing
    e.preventDefault()
    // Add todo div to <ul> element
    const newTodo = document.createElement('div');
    newTodo.classList.add('todo');
    ulDiv.appendChild(newTodo);
    // Check/save local storage
    checkSave(input.value,newTodo.classList[0]);
    // Add <li> and 2 <button> to todo <div>
    const newLi = document.createElement('li');
    const checkBtn = document.createElement('button');
    const treshBtn = document.createElement('button');
    newLi.classList.add('todo-text');
    checkBtn.classList.add('todo-checkbtn');
    treshBtn.classList.add('todo-treshbtn');
    newTodo.appendChild(newLi);
    newTodo.appendChild(checkBtn);
    newTodo.appendChild(treshBtn);
    newLi.innerHTML = input.value;
    checkBtn.innerHTML = '<i class="fas fa-check"></i>'
    treshBtn.innerHTML = '<i class="fas fa-trash"></i>'
    input.value = ''
}
// Delete or marked as completed todo item
function checkTresh(e) {
    var item = e.target;
    // Delete todo with tresh btn
    if (item.classList[0] === 'todo-treshbtn') {
        // Animation
        item.parentElement.classList.add('fall');
        // Delete todo from local storage
        deleteTodo(e.target.parentElement.childNodes[0].innerHTML);
        addEventListener("transitionend", function () {
            item.parentElement.remove();
        })
    } 
    // Mark es completed with check btn
    else if (item.classList[0] === 'todo-checkbtn') {
        item.parentElement.classList.toggle('completed');
        changeStyle(e.target.parentElement.childNodes[0].innerHTML);
    }
}
// Todo filter
function todoFilter(e) {
    const todos = ulDiv.childNodes;
    todos.forEach(function(todo) {
    switch (e.target.value) {
        case "All":
            todo.style.display = 'flex';
            break;
        case "Completed":
            if (todo.classList.contains('completed')) {
                todo.style.display = 'flex';
            }   else {
                todo.style.display = 'none';
            }
            break;
        case "Uncompleted":
            if (!todo.classList.contains('completed')) {
                todo.style.display = 'flex';
            }   else {
                todo.style.display = 'none';
            }
        }
    });
}   
// Check/save in localstorage
function checkSave(e,y) {
    // Add input
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(e)
    localStorage.setItem('todos', JSON.stringify(todos));
    // Add style
    let todos2;
    if (localStorage.getItem('todosstyle') === null) {
        todos2 = [];
    } else {
        todos2 = JSON.parse(localStorage.getItem('todosstyle'))
    }
    todos2.push(y)
    localStorage.setItem('todosstyle', JSON.stringify(todos2));
}
// Get saved todos from localstorage
function getTodo(e) {
    let todos = JSON.parse(localStorage.getItem('todos'))
    let todos2 = JSON.parse(localStorage.getItem('todosstyle'))
        todos.forEach(function(todo){
        let position = todos.indexOf(todo);
        const newTodo = document.createElement('div');
        newTodo.classList.add('todo');
        newTodo.classList.add(todos2[position]);
        ulDiv.appendChild(newTodo);
        // Add <li> and 2 <button> to todo <div>
        const newLi = document.createElement('li');
        const checkBtn = document.createElement('button');
        const treshBtn = document.createElement('button');
        newLi.classList.add('todo-text');
        checkBtn.classList.add('todo-checkbtn');
        treshBtn.classList.add('todo-treshbtn');
        newTodo.appendChild(newLi);
        newTodo.appendChild(checkBtn);
        newTodo.appendChild(treshBtn);
        newLi.innerHTML = todo;
        checkBtn.innerHTML = '<i class="fas fa-check"></i>'
        treshBtn.innerHTML = '<i class="fas fa-trash"></i>'
    });
}
// Delete info from localstorage
function deleteTodo(e) {
    let todos = JSON.parse(localStorage.getItem('todos'));
    let todos2 = JSON.parse(localStorage.getItem('todosstyle'));
    let position = todos.indexOf(e);
    todos.splice(position, 1);
    todos2.splice(position, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('todosstyle', JSON.stringify(todos2));
}
// Change style in local storage
function changeStyle (e) {
    let inputLocal = JSON.parse(localStorage.getItem('todos'));
    let styleLocal = JSON.parse(localStorage.getItem('todosstyle'));
    let position = inputLocal.indexOf(e);
    if (styleLocal[position] === 'todo') {
        styleLocal.splice(position, 1);
        styleLocal.splice(position, 0, "completed");
        localStorage.setItem('todosstyle', JSON.stringify(styleLocal));
    } else {
        styleLocal.splice(position, 1);
        styleLocal.splice(position, 0, "todo");
        localStorage.setItem('todosstyle', JSON.stringify(styleLocal));
    }
}

