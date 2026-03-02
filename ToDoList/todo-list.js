const todoList = [{
  name: 'review course',
  dueDate: '2025-09-29'
}];

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';

  // Loop over every toDo object and append it to "todoListHTML"
  // Show the objects inside the class "js-todo-list"
  // Loop over evey delete button and add an eventListener that deletes the toDo and rerender the Tasks

  todoList.forEach((object, index) => {
    todoListHTML+=`<p>${object.name}                ${object.dueDate}</p> <button class='delete-todo-button js-delete-todo-button' >Delete</button><br>`;
  });

  document.querySelector(".js-todo-list").innerHTML=todoListHTML;

  deleteBtns=document.querySelectorAll(".delete-todo-button.js-delete-todo-button")

  deleteBtns.forEach((object, index)=>{
      object.addEventListener('click', ()=>{
      todoList.splice(index, 1);
      renderTodoList();
    })
  })
  


}

document.querySelector('.js-add-todo-button')
  .addEventListener('click', () => {
    addTodo();
  });

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;

  // Add these values to the variable "todoList"

  todoList.push({'name': name,'dueDate': dueDate})


  inputElement.value = '';

  renderTodoList();
}