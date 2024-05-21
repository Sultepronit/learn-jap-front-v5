import { ref } from 'vue';
import { get } from '@/services/commonAPI.js';
import { repeatStages } from '../utils/enums';
import { restoreSession } from "./backup.js";
// import { restoreProgress } from '../utils/progress';

let plan = {};
let lists = {};
let words = {};
let wordsAreUpdated = false;
// let sessionLength = 0;
const ready = ref(false);

async function fetchData() {
    const data = await get('/session/kanji');
    console.log(data);
    // const { repeatList, problemList } = data;
    const { learnList, repeatList, sessionLength } = data;
    // sessionLength = data.sessionLength;

    const repeatStageList = Array(sessionLength)
        // .fill(repeatStages.PROBLEM, 0, problemList.length)
        .fill(repeatStages.LEARN, 0, learnList.length)
        .fill(repeatStages.REPEAT, learnList.length);
    console.log(repeatStageList);

    plan = {
        learnNumber: learnList.length,
        repeatNumber: sessionLength - learnList.length
    };
    lists = { repeatStageList, learnList, repeatList, rememberList: [] };

    localStorage.setItem('kanjiPlan', JSON.stringify(plan));
}

async function getTheWords() {
    const data = await get('/session/words-for-kanji');
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
        plan = restored.plan;
        // restoreProgress(restored.progress);
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

export { startSession, ready, plan, lists, words };