import './assets/main.css'
const apiUrl = import.meta.env.VITE_JAP_DB_API_URI;
console.time('tt');

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

async function fetchData(request) {
    const response = await fetch(`${apiUrl}?id=${request.id}`, {
        // method: 'PATCH',
        // method: 'GET'
        method: 'POST',
        // method: 'PUT',
        // headers: {
        //     'Content-Type': 'application/json'
        // },
        body: JSON.stringify(request.changes)
    });
    console.log(response);
    const results = await response.text();
    console.log(results);
}

fetchData({id: 1, changes: {key: 'value'}});
