import { setStatus } from '@/utils/statusBarControl.js';

const apiUrl = import.meta.env.VITE_API_URL;

async function retry(callback, ...args) {   
    return new Promise(resolve => {
        setTimeout(async () => {
            resolve(await callback(...args));
        }, 5 * 1000);
    });
}

async function get(request) { // get all
    const url = apiUrl + request;
    try {
        setStatus.loading();

        const resp = await fetch(url);
        const data = await resp.json();

        setStatus.clear();

        return data;
    } catch (error) {
        console.log(error);
        setStatus.failed();

        return retry(get, request);
    }
}

async function post(table, data) {
    const url = `${apiUrl}/table/${table}`;
    try {
        setStatus.loading();

        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data)
        });
        const results = await response.text();
        // console.log(results);

        setStatus.clear();

        return JSON.parse(results);
    } catch (error) {
        console.error(error);
        setStatus.failed();
        // alert('Not posted!');
        return retry(post, table, data);
    }
}

async function patch(table, card) {
    console.log('saving:', table, card);
    console.log(card.changes);

    const url = `${apiUrl}/table/${table}/${card.id}`;
    
    try {
        const response = await fetch(url, {
            method: 'PATCH',
            body: JSON.stringify(card.changes)
        });
        
        const results = await response.text();

        if(results !== '{"success":true}') {
            throw new Error('Wrong response: ' + results);
        }
        
        updateOrder.remove();

        return true;
    } catch (error) {
        setStatus.failed();
        console.error(error);

        return retry(patch, table, card);
    }
}

const updateOrder = {
    theOrder: [],
    backup() {
        if(this.theOrder.length > 0) {
            localStorage.setItem('updateOrder', JSON.stringify(this.theOrder));
        } else {
            localStorage.removeItem('updateOrder');
        }
    },
    restoreBackup() {
        const restored = JSON.parse(localStorage.getItem('updateOrder'));
        if(!restored) return;
        console.log('saving:', restored);

        this.theOrder = restored;
        this.patchNext();
    },
    patchNext() {
        setStatus.loading();
        const query = this.theOrder[0];
        patch(query.table, query.card);
    },
    add(query) {
        this.theOrder.push(query);
        this.backup();
        console.log('save order:', this.theOrder);

        if(this.theOrder.length === 1) {
            setStatus.loading();
            patch(query.table, query.card);
        }
    },
    remove() {
        this.theOrder.shift();
        this.backup();
        console.log('save order:', this.theOrder);

        if(this.theOrder.length < 1) {
            setStatus.clear();
        } else {
            this.patchNext();
        }
    }
};

async function update(table, card) {
    updateOrder.add({table, card});
}

async function deleteApi(table, id) {
    const url = `${apiUrl}/table/${table}/${id}`;
    try {
        setStatus.loading();

        const response = await fetch(url, {
            method: 'DELETE',
        });
        const results = await response.text();

        if(results === '{"success":true}') {
            setStatus.clear();

            return true;
        } else {
            setStatus.failed();
            console.error(results);
            alert('Wrong response!');
            // throw new Error('Wrong response!');
        }
    } catch (error) {
        console.error(error);
        setStatus.failed();
        // alert('Not deleted!');

        return retry(deleteApi, table, id);
    }
}

updateOrder.restoreBackup();

export { get, post, update, patch, deleteApi };