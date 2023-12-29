const apiUrl = import.meta.env.VITE_API_URL;

async function get(table) {
    const url = apiUrl + table;
    try {
        console.time('get');
        const resp = await fetch(url);
        const data = await resp.json();
        console.log(data.length);
        console.timeEnd('get');
        return data;
    } catch (error) {
        console.log(error);
        alert('Data not recieved!');
    }
}

async function post(table, data) {
    const url = apiUrl + table;
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
    // all I have is only GET, POST and no headers allowed...
    const url = `${apiUrl}${table}?id=${card.id}&real-method=patch`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(card.changes)
        });
        // console.log(response);
        const results = await response.text();

        if(results !== '{"success": true}') {
            throw new Error('Wrong response: ' + results);
        }

        return true;
    } catch (error) {
        console.error(error);
        alert('Not updated!');
    }
}

async function deleteApi(table, id) {
    // all I have is only GET, POST and no headers allowed...
    const url = `${apiUrl}${table}?id=${id}&real-method=delete`;
    try {
        const response = await fetch(url, {
            method: 'GET',
        });
        // console.log(response);
        const results = await response.text();
        console.log(results);

        if(results === '{"success": true}') {
            return true;
        } else {
            // alert('Not deleted!');
            throw new Error('Wrong response!');
        }
    } catch (error) {
        console.error(error);
        alert('Not deleted!');
    }
}

export { get, post, patch, deleteApi };