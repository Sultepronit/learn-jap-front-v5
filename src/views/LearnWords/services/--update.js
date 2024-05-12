import { patch } from '@/services/commonAPI.js';

async function update(id, changes) {
    const data = {
        id,
        changes
    };

    // await patch('jap', data);
    const success = await patch('jap', data);
    if(success) {
        console.log('saved!')
    } else {
        // add possibility to try and save again
    }
}

export default update;