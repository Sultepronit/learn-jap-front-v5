import { ref } from 'vue';
import { get } from '@/services/commonAPI.js';
import progress from '../utils/progress.js';
import { saveSession, restoreSession } from "./backup.js";
import { getWordsForKanji, restoreOrGetWordsForKanji } from '@/services/wordsForKanji.js';

let plan = {};
let session = [];
const ready = ref(false);

async function fetchData() {
    const data = await get('/session/kanji-ready');
    console.log(data);

    return data;
}

async function startSession() {
    ready.value = false;

    const restored = await restoreSession();
    if(restored) {
        session = restored.session;
        plan = restored.plan;
    } else {
        const data = await fetchData();
        if(!data) return;

        session = data.session;
        plan = data.plan;
        progress.value.autorepeat = plan.autorepeated;

        saveSession(plan);
    }

    let wordsAreUpdated = await restoreOrGetWordsForKanji();
    if(!restored && !wordsAreUpdated) {
        getWordsForKanji();
    }

    ready.value = true;
}

export { startSession, ready, plan, session };