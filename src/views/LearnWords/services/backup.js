import { showResetButton } from "@/utils/resetButtonDisplay";
import progress, { restoreProgress } from "../utils/progress";
import { session } from './data.js';

function saveSession(plan) {
    localStorage.setItem('wordsSession', JSON.stringify({
        progress: progress.value,
        session
    }));

    if(plan) {
        localStorage.setItem('wordsPlan', JSON.stringify(plan));
    }
}

function restoreSession() {
    console.log('restoring words session!');
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