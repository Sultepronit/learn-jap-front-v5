import { ref } from "vue";
import { learnStages } from "../utils/enums.js";
import { get } from "@/services/commonAPI.js";
import { restoreSession } from "./backup.js";
import { restoreOrGetWordsForKanji } from "@/services/wordsForKanji.js";

let plan = {};
let lists = {};
let kanji = {};
let kanjiAreUpdated = false;
const ready = ref(false);

async function fetchData() {
    const data = await get('/session/words');
    console.log(data);
    const {
        constsAndVars,
        learnList,
        confirmList,
        repeatList,
        recognizeList
    } = data;
    const { sessionLength, confirmDivisor } = constsAndVars;

    const learnNumber = learnList.length - 1;
    const confirmNumber = Math.round(confirmList.length / confirmDivisor);
    const recognizeNumber = Math.ceil(recognizeList?.length / 5);

    let nextStop = learnNumber;
    const learnStageList = Array(sessionLength)
        .fill(learnStages.LEARN, 0, nextStop)
        .fill(learnStages.CONFIRM, nextStop)
        .fill(learnStages.RECOGNIZE, nextStop += confirmNumber)
        .fill(learnStages.REPEAT, nextStop += recognizeNumber);
    console.log(learnStageList);
    
    const repeatNumber = sessionLength - nextStop;

    plan = {
        learnNumber,
        confirmNumber,
        repeatNumber,
        recognizeNumber
    };
    lists = {
        learnList,
        confirmList,
        repeatList,
        rememberList: [],
        recognizeList,
        learnStageList,
    }
    
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
        lists = restored.lists;
        kanjiAreUpdated = true;
    } else {
        await fetchData();
    }

    kanji = JSON.parse(localStorage.getItem('kanjiForWords'));
    
    console.log(lists);
    ready.value = true;

    if(!kanjiAreUpdated || !kanji) {
        getTheKanji();
    }

    restoreOrGetWordsForKanji();
}

export { startSession, ready, plan, lists, kanji };