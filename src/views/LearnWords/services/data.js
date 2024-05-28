import { ref } from "vue";
import { fetchData, getKanjiForWords } from './fetchFromDb.js';
import { restoreSession, saveSession } from "./backup.js";
import { restoreOrGetWordsForKanji } from "@/services/wordsForKanji.js";
import { setStatus } from '@/utils/statusBarControl.js';

let plan = {};
let session = [];
let kanji = {};
const ready = ref(false);

async function startSession() {
    const restored = await restoreSession();
    if(restored) {
        plan = restored.plan;
        session = restored.session;
    } else {
        const data = await fetchData();
        if(!data) return;

        plan = data.plan;
        session = data.session;

        saveSession(plan);
    }

    kanji = JSON.parse(localStorage.getItem('kanjiForWords'));
    
    ready.value = true;

    // setStatus.clear();

    if(!restored) {
        kanji = await getKanjiForWords();
    }

    restoreOrGetWordsForKanji();
}

export { startSession, ready, plan, session, kanji };