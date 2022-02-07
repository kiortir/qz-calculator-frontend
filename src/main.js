import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import Vue3TouchEvents from 'vue3-touch-events';

import axios from 'axios';
import VueAxios from 'vue-axios';

function keydown(e) {
  if (e.keyCode === 13) {
    document.activeElement.blur();
  }
}
document.addEventListener('keydown', keydown);

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

const csrftoken = getCookie('csrftoken');
axios.defaults.headers.common = { 'X-CSRFToken': csrftoken };

function queue_for_update() {
  setTimeout(() => {
    store.dispatch('save');
  }, 10000);
}

async function autoSave() {
  let now = Date.now();
  window.localStorage.setItem('lastUserInput', now);
  if (
    !window.localStorage.getItem('queue_for_update_start') ||
    now - Number(window.localStorage.getItem('queue_for_update_start')) > 11000
  ) {
    window.localStorage.setItem('queue_for_update_start', now);
    queue_for_update();
  }
}

const mutation_list = []

async function sendMutationInfo(mutation) {
  checkExistance().then(isCreated => {
    if (isCreated & mutation_list.length == 0) {
      axios.put('mutate', {
        time: Date.now(),
        mutation,
        estimation_id: store.state.id
      })
    }
    else if (isCreated) {
      
    }
  })
}

async function checkExistance() {
  let id = store.state.id
  if (id == null) {
    store.dispatch('save')
  }
}

store.subscribe((mutation) => {
  autoSave()
  sendMutationInfo(mutation)
});

const app = createApp(App);
app.use(store);
app.use(Vue3TouchEvents, {
  disableClick: true,
});
app.use(VueAxios, axios);
app.mount('#app');
