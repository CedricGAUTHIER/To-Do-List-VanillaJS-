
var app = {
  nbActivTask:0,
  init: function() {
    app.interface();
    app.addListenerToActions();
    
  },
  interface: () => {
    const todo = document.getElementById('todo');
    const form = document.createElement('form');
    const input = document.createElement('input');
    form.method = "POST";
    form.id = "form";
    input.type = "Text";
    input.name = "newTask";
    input.placeholder="Ajouter une tâche";
    input.id="newTask";
    form.appendChild(input);
    todo.appendChild(form);
    const div = document.createElement('div');
    div.id = "title";
    div.textContent = `Pas de tâche en cours`;
    todo.appendChild(div);
    
    
    
  },
  addListenerToActions:() => {
    const form = document.getElementById('form');
    form.addEventListener('submit',app.addTask);
  },
  addTask: async (event) => {
    event.preventDefault();
        
    app.nbActivTask++;
    const newTask = document.getElementById('newTask');
    const title = document.getElementById('title');
    if (app.nbActivTask > 1){
      title.textContent = `${app.nbActivTask} tâches en cours`;
    } else {
      title.textContent = `${app.nbActivTask} tâche en cours`;
    }
    const todo = document.getElementById('todo');
    const div = document.createElement('div');
    const checkBox = document.createElement('input');
    const label = document.createElement('label');
    checkBox.type = "checkbox";
    checkBox.id = `checkBox-${app.nbActivTask}`;
    checkBox.name = `checkBox-${app.nbActivTask}`;
    checkBox.classList.add('checkbox');
    checkBox.setAttribute('value','done');
    div.classList.add('task');
    div.id = `divTask-${app.nbActivTask}`
    div.appendChild(checkBox);
    label.setAttribute('for',`checkBox-${app.nbActivTask}`);
    label.textContent = newTask.value;
    label.id = `label-${app.nbActivTask}`
    div.appendChild(label);
    
    todo.appendChild(div);
    newTask.value = ""
    checkBox.addEventListener('click',app.taskDone);

  },
  taskDone: (event) => {
    
    const checkBox = event.target;
    let idString = checkBox.id;
    idString = idString.split('-');
    const id = idString[1];
    const divTask = document.getElementById(`divTask-${id}`);
    const label = document.getElementById(`label-${id}`);
    const title = document.getElementById('title');
    
    if (checkBox.checked){
      label.classList.add('done');
      divTask.style.background = "#339999";
      app.nbActivTask--;
      if (app.nbActivTask > 1){
        title.textContent = `${app.nbActivTask} tâches en cours`;
      } else {
        title.textContent = `${app.nbActivTask} tâche en cours`;
      }
    } else {
      label.classList.remove('done');
      divTask.style.background = "#eee";
      app.nbActivTask++;
      if (app.nbActivTask > 1){
          title.textContent = `${app.nbActivTask} tâches en cours`;
      } else {
          title.textContent = `${app.nbActivTask} tâche en cours`;
      }
    }
    
  }
};



document.addEventListener('DOMContentLoaded', app.init);
