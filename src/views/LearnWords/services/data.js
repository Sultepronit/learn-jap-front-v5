import { ref } from "vue";
// import { learnStages } from "../utils/enums.js";
import { get } from "@/services/commonAPI.js";
import { restoreSession } from "./backup.js";
import { restoreOrGetWordsForKanji } from "@/services/wordsForKanji.js";

let plan = {};
let session = [];
let kanji = {};
let kanjiAreUpdated = false;
const ready = ref(false);

async function fetchData() {
    const data = await get('/session/words-ready');
    console.log(data);

    plan = data.plan;
    session = data.session;
    session.rememberList = [];
    
    localStorage.setItem('wordsPlan', JSON.stringify(plan));
}

async function getTheKanji() {
    const data = await get('/session/kanji-for-words');
    if(!data) return;

    kanji = data;
    localStorage.setItem('kanjiForWords', JSON.stringify(kanji));
    kanjiAreUpdated = true;
}

async function startSession() {
    const restored = await restoreSession();
    if(restored) {
        plan = restored.plan;
        session = restored.session;
        kanjiAreUpdated = true;
    } else {
        await fetchData();
    }

    kanji = JSON.parse(localStorage.getItem('kanjiForWords'));
    
    console.log(session);
    ready.value = true;

    if(!kanjiAreUpdated || !kanji) {
        getTheKanji();
    }

    restoreOrGetWordsForKanji();
}

export { startSession, ready, plan, session, kanji };