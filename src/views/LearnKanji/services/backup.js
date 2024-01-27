import progress from "../utils/progress";
import { lists } from './data.js';
import { showResetButton } from "@/utils/resetButtonDisplay";

function saveSession() {
    localStorage.setItem('kanji_session', JSON.stringify({
        progress: progress.value,
        lists
    }));
    console.log('backup!');
}

function restoreSession() {
    return new Promise(resolve => {
        const json = localStorage.getItem('kanji_session');
        if(!json) {
            resolve(false);
        }

        const restored = JSON.parse(json);
        restored.words = JSON.parse(localStorage.getItem('wordsForKanji'));

        showResetButton();

        console.log('restored!');
        // console.log(restored);
        resolve(restored);
    });
}

export { saveSession, restoreSession }