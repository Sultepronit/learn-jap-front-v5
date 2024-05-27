import { ref } from 'vue';
import { get } from '@/services/commonAPI.js';
import { repeatStages } from '../utils/enums';
import { restoreSession } from "./backup.js";
import { getWordsForKanji, restoreOrGetWordsForKanji } from '@/services/wordsForKanji.js';

let plan = {};
let lists = {};
let words = [];
let wordsAreUpdated = false;
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

async function startSession() {
    const restored = await restoreSession();
    if(restored) {
        lists = restored.lists;
        plan = restored.plan;
        wordsAreUpdated = true;
    } else {
        await fetchData();
    }

    wordsAreUpdated = await restoreOrGetWordsForKanji();
    
    ready.value = true;

    if(!wordsAreUpdated) {
        getWordsForKanji();
    }
}

export { startSession, ready, plan, lists, words };