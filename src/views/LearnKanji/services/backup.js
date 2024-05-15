import progress from "../utils/progress";
import { lists } from './data.js';
import { showResetButton } from "@/utils/resetButtonDisplay";

function saveSession() {
    localStorage.setItem('kanjiSession', JSON.stringify({
        progress: progress.value,
        lists
    }));
    console.log('backup!');
}

function restoreSession() {
    return new Promise(resolve => {
        const restored = JSON.parse(localStorage.getItem('kanjiSession'));
        if(restored) {
            console.log('restored!');
            showResetButton();
            resolve(restored);
        } else {
            resolve(false);
        }   
    });
}

export { saveSession, restoreSession }