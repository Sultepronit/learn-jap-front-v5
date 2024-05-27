import { ref } from 'vue';
import { get } from '@/services/commonAPI.js';
// import { repeatStages } from '../utils/enums';
import { restoreSession } from "./backup.js";
import { getWordsForKanji, restoreOrGetWordsForKanji } from '@/services/wordsForKanji.js';

let plan = {};
let session = [];
let words = [];
let wordsAreUpdated = false;
const ready = ref(false);

async function fetchData() {
    const data = await get('/session/kanji-ready');
    console.log(data);

    plan = data.plan;
    session = data.session;

    localStorage.setItem('kanjiPlan', JSON.stringify(plan));
}

async function startSession() {
    const restored = await restoreSession();
    if(restored) {
        session = restored.session;
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

export { startSession, ready, plan, session, words };