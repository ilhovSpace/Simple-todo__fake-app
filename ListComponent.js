import Component from "./component.js"
import store from "./store/index.js"

export default class ListComponent extends Component {
  constructor(app, settings) {
    const template = document.getElementById('list').content.cloneNode(true);
    app.append(template);
    super(
      store,
      document.querySelector('.js-items')
    );

    const input = document.querySelector('.c-input-field');
    const submit = document.querySelector('.c-button');
    const handleClick = event => {
      event.preventDefault();

      let value = input.value.trim();

      if (value.length) {
        store.dispatch('addItem', value);
        input.focus();
        input.value = '';
      }
    }
    submit.addEventListener('click', handleClick);
  }

  render(id, value) {
    if (store.state.todo.length == 0) {
      this.anchor.innerHTML = `No todo's`;
      return;
    }

    this.anchor.innerHTML = `
      <ul>
      ${
        store.state.todo.map((todoItem, index) => {
            if(id == todoItem._id){
                return `
                <li id="${todoItem._id}"><input type="text" value="${value}">
                <button class="save">Save</button></li>
                `
            } else {
                let checked = "";
                let editButton = '<button class="edit">Edit</button>';
                let classStatus = 'inProgress'
                if(todoItem.completed === true){
                    checked = "checked";
                    editButton = ""
                    classStatus = 'completed'
                }
                return `
        <li id="${todoItem._id}" class="${classStatus}">
        <input type="checkbox" title="Завершить" class="checkbox" ${checked}>
        <span>${todoItem.text}</span>${editButton}<button class="delete">delete</button></li>
                `}
            }
        ).join('')
    }

    </ul>`;

    this.anchor.querySelectorAll('.delete').forEach( (button, id) => {
      button.addEventListener('click', (event) => {
        store.dispatch('removeItem', event.target.parentNode.id) 
      })
    })
    this.setupEditEvent()
    this.setupStatusEvent()
  }
  setupEditEvent(){
        this.anchor.querySelectorAll('.edit').forEach((button, id) => {
          button.addEventListener('click', (event)=>{
              this.render(event.target.parentNode.id, button.previousSibling.textContent)
          })
      })
      this.anchor.querySelectorAll('.save').forEach((button, id) => {
        button.addEventListener('click', (event)=>{
            store.dispatch('editItem', {
              value: event.target.previousElementSibling.value,
              id: event.target.parentNode.id
          })
        })
    })
  }
  setupStatusEvent(){
    this.anchor.querySelectorAll('.checkbox').forEach((button, id) => {
      button.addEventListener('click', (event)=>{
          let status = (event.target.parentNode.className === "completed") ? false : true
          store.dispatch('statusItem', {
              status: status,
              id: event.target.parentNode.id
          })
      })
  })
 }
}