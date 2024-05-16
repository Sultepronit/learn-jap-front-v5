import { showResetButton } from "@/utils/resetButtonDisplay";
import progress, { restoreProgress } from "../utils/progress";
import { lists } from './data.js';

function saveSession() {
    localStorage.setItem('wordsSession', JSON.stringify({
        progress: progress.value,
        lists
    }));
    // console.log('backup!');
}

function restoreSession() {
    return new Promise(resolve => {
        const restored = JSON.parse(localStorage.getItem('wordsSession'));
        if(!restored) {
            resolve(false);
        }

        restored.plan = JSON.parse(localStorage.getItem('wordsPlan'));

        console.log('restored!');
        console.log(restored);

        restoreProgress(restored.progress);
        showResetButton();

        resolve(restored);
    });
}

function removeSession() {
    localStorage.removeItem('wordsSession');
    localStorage.removeItem('wordsPlan');
}

export { saveSession, restoreSession, removeSession }