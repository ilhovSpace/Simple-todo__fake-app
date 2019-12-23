import Observer from "./observer.js";

export default class Store {
  constructor(reducers) {
    this.reducers = reducers;
    this.state = {
      todo: [],
      userInfo: {}
    }
    this.events = new Observer()
  }

  updateState(){
    fetch('https://todo-app-back.herokuapp.com/todos', {
      method: 'GET',
      headers: {
        'Authorization': this.state.userInfo.token,
        'Content-Type': 'application/json'
      }
    }).then(result => result.json())
      .then((todo) => {
          this.state.todo = todo;
          this.events.next('change', this.state);
        }
      )
  }

  dispatch(actionType, payload) {
    if (this.reducers[actionType]) {
      if(actionType == "login"){
        new Promise(()=>{
          this.state = this.reducers[actionType](payload, this.state);
        }).then(fetch('https://todo-app-back.herokuapp.com/todos', {
          method: 'GET',
          headers: {
            'Authorization': this.state.userInfo.token,
            'Content-Type': 'application/json'
          }
        }).then(result => result.json())
          .then((todo) => {
              this.state.todo = todo;
              this.events.next('change', this.state);
            }
          ))
      } else {
      new Promise((res,rej)=>{
          this.reducers[actionType](payload, this.state);
          res();
          }).then(fetch('https://todo-app-back.herokuapp.com/todos', {
          method: 'GET',
          headers: {
            'Authorization': this.state.userInfo.token,
            'Content-Type': 'application/json'
          }
        }).then(result => result.json())
          .then((todo) => {
              this.state.todo = todo;
              this.events.next('change', this.state);
            }
          ))
    }
   }
  }
}