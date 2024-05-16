import progress, { restoreProgress } from "../utils/progress";
import { lists } from './data.js';
import { showResetButton } from "@/utils/resetButtonDisplay";

function saveSession() {
    localStorage.setItem('kanjiSession', JSON.stringify({
        progress: progress.value,
        lists
    }));
    // console.log('backup!');
}

function restoreSession() {
    return new Promise(resolve => {
        const restored = JSON.parse(localStorage.getItem('kanjiSession'));
        if(restored) {
            restored.plan = JSON.parse(localStorage.getItem('kanjiPlan'));

            console.log('restored!');
            console.log(restored);

            restoreProgress(restored.progress);
            showResetButton();
            
            resolve(restored);
        } else {
            resolve(false);
        }   
    });
}

function removeSession() {
    localStorage.removeItem('kanjiSession');
    localStorage.removeItem('kanjiPlan');
}

export { saveSession, restoreSession, removeSession }