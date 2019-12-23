import store from "./index.js"

export default function createReducers() {
  return {
    addItem: (payload, state) => {
          fetch('https://todo-app-back.herokuapp.com/todos', {
              method: 'POST',
              body:
                JSON.stringify({
                  text: payload,
                  createDate: "string",
                  completed: false,
                }),
              headers: {
                'Content-Type': 'application/json',
                'Authorization': state.userInfo.token
              }
            }).then(() => store.updateState())
    },

    removeItem: (payload, state) => {
      fetch('https://todo-app-back.herokuapp.com/todos/'+ payload, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': state.userInfo.token
        }
      }).then(() => store.updateState())
    },

    editItem: (payload, state) => {
      fetch('https://todo-app-back.herokuapp.com/todos/'+payload.id, {
            method: 'PUT',
            body:
              JSON.stringify({
                text: payload.value,
              }),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': state.userInfo.token
            }
          }).then(() => store.updateState())
    },

    statusItem: (payload, state) => {
      fetch('https://todo-app-back.herokuapp.com/todos/'+payload.id, {
            method: 'PUT',
            body:
              JSON.stringify({
                completed: payload.status,
              }),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': state.userInfo.token
            }
          }).then(() => store.updateState())
    },

    login: (payload, state) => {
      return {
      ...state,
      userInfo: {
        autorized: true,
        ...payload,
      }
    }
  },
    logout: (payload, state) => ({
      ...state,
      userInfo: {},
    }),
  }
}