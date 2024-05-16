import { ref } from 'vue';
import { get } from '@/services/commonAPI.js';
import { repeatStages } from '../utils/enums';
import { restoreSession } from "./backup.js";
import { restoreProgress } from '../utils/progress';

let lists = {};
let words = {};
let wordsAreUpdated = false;
// let sessionLength = 0;
const ready = ref(false);

async function fetchData() {
    const data = await get('kanji_session');
    console.log(data);
    // const { repeatList, problemList } = data;
    const { learnList, repeatList, sessionLength } = data;
    // sessionLength = data.sessionLength;

    const repeatStageList = Array(sessionLength)
        // .fill(repeatStages.PROBLEM, 0, problemList.length)
        .fill(repeatStages.LEARN, 0, learnList.length)
        .fill(repeatStages.REPEAT, learnList.length);
    console.log(repeatStageList);

    // lists = { repeatList, problemList, repeatStageList };
    lists = { repeatStageList, learnList, repeatList, rememberList: [] };
}

async function getTheWords() {
    const data = await get('words_for_kanji');
    if(!data) return;

    words = data;
    localStorage.setItem('wordsForKanji', JSON.stringify(words));
    wordsAreUpdated = true;
}

async function startSession() {
    const restored = await restoreSession();
    if(restored) {
        // words = restored.words;
        lists = restored.lists;
        restoreProgress(restored.progress);
        console.log(restored);
        wordsAreUpdated = true;
    } else {
        await fetchData();
    }

    words = JSON.parse(localStorage.getItem('wordsForKanji'));
    // console.log(words);
    if(!words) {
        await getTheWords();
    }
    
    ready.value = true;

    if(!wordsAreUpdated) {
        getTheWords();
    }
}

export { startSession, ready, lists, words };