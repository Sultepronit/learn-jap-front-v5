import progress from "../utils/progress";
import { lists } from './data.js';

function saveSession() {
    localStorage.setItem('words_session', JSON.stringify({
        progress: progress.value,
        lists
    }));
    console.log('backup!');
}

function restoreSession() {
    return new Promise(resolve => {
        const json = localStorage.getItem('words_session');
        if(!json) {
            resolve(false);
        }

        const restored = JSON.parse(json);
        restored.plan = JSON.parse(localStorage.getItem('words_plan'));

        console.log('restored!');
        // console.log(restored);
        resolve(restored);
    });
}

export { saveSession, restoreSession }