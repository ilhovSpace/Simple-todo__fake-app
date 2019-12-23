import Component from "./component.js"
import store from "./store/index.js"
import link from "./link.js"

export default class LoginComponent extends Component {
  constructor(app, settings) {
    super(store, app);
    const template = document.getElementById('login').content.cloneNode(true);
    this.settings = settings;
    app.appendChild(template);
  }

  render() {
    console.log('login render')
    this.setupListener()
  }
  
  setupListener(){
    document.querySelector('#signIn').addEventListener('click', () => {
      const login = document.querySelector('#email').value.trim()
      const password = document.querySelector('#password').value.trim()
      let user = fetch('https://todo-app-back.herokuapp.com/login', {
        method: 'POST',
        body:
          JSON.stringify({
            email: login,
            password: password,
          }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(result => result.json())
       .then(result => {store.dispatch("login", result)
            if(result.hasOwnProperty('id')){
              link(this.settings.redirect)
            }  
      })
      //  .then(() => {link(this.settings.redirect)})
    })
  }
}