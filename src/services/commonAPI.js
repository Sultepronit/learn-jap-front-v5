import { setStatus } from '@/utils/statusBarControl.js';

const apiUrl = import.meta.env.VITE_API_URL;

async function get(request) { // get all
    // const url = `${apiUrl}/table/${table}`;
    const url = apiUrl + request;
    try {
        const resp = await fetch(url);
        const data = await resp.json();
        return data;
    } catch (error) {
        console.log(error);
        alert('Data not recieved!');
    }
}

async function post(table, data) {
    const url = `${apiUrl}/table/${table}`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data)
        });
        const results = await response.text();
        console.log(results);
        return JSON.parse(results);
    } catch (error) {
        console.error(error);
        alert('Not posted!');
    }
}

async function patch(table, card) {
    setStatus.loading();
    const url = `${apiUrl}/table/${table}/${card.id}`;
    console.log(card);
    try {
        const response = await fetch(url, {
            method: 'PATCH',
            body: JSON.stringify(card.changes)
        });
        // console.log(response);
        const results = await response.text();

        if(results !== '{"success":true}') {
            throw new Error('Wrong response: ' + results);
        }
        // console.log('saved!')
        setStatus.clear();

        return true;
    } catch (error) {
        // console.log(table, card);
        setStatus.failed();
        console.error(error);
        alert(`Not updated (${card.id})`);

        const oneMoreTime = await new Promise(resolve => {
            setTimeout(async () => {
                resolve(await patch(table, card));
            }, 2000);
        });

        return oneMoreTime;
    }
}

async function deleteApi(table, id) {
    const url = `${apiUrl}/table/${table}/${id}`;
    try {
        const response = await fetch(url, {
            method: 'DELETE',
        });
        const results = await response.text();
        // console.log(results);

        if(results === '{"success":true}') {
            return true;
        } else {
            throw new Error('Wrong response!');
        }
    } catch (error) {
        console.error(error);
        alert('Not deleted!');
    }
}

export { get, post, patch, deleteApi };