import { get } from './commonAPI.js';

let wordsForKanji = [];

async function getWordsForKanji() {
    wordsForKanji = await get('/session/words-for-kanji');
    if(!wordsForKanji) return;

    localStorage.setItem('wordsForKanji', JSON.stringify(wordsForKanji));
}

async function restoreOrGetWordsForKanji() {
    wordsForKanji = JSON.parse(localStorage.getItem('wordsForKanji'));
    if(!wordsForKanji) {
        await getWordsForKanji();
        return true; // up to date
    } else {
        return false; // not up to date
    }
}

export { getWordsForKanji, restoreOrGetWordsForKanji, wordsForKanji };