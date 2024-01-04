import { ref } from "vue";
import { learnStages, repeatVariants } from "../utils/enums.js";
import { get } from "@/services/commonAPI.js";
import { restoreSession } from "./backup.js";
import { restoreProgress } from "../utils/progress.js";
import { showResetButton } from "../utils/resetButtonDisplay.js";

let plan = {};
let lists = {};
const ready = ref(false);

async function fetchData() {
    const data = await get('jap_session');
    console.log(data);
    const {
        constsAndVars,
        learnList,
        confirmList,
        repeatList,
        problemList,
        recognizeList
    } = data;
    const { sessionLength, confirmDivisor, problemDivisor } = constsAndVars;

    const learnNumber = learnList.length - 1;
    const confirmNumber = Math.round(confirmList.length / confirmDivisor);
    const recognizeNumber = Math.ceil(recognizeList?.length / 5);

    let stop = learnNumber;
    const learnStageList = Array(sessionLength)
        .fill(learnStages.LEARN)
        .fill(learnStages.CONFIRM, stop)
        .fill(learnStages.RECOGNIZE, stop += confirmNumber)
        .fill(learnStages.REPEAT, stop += recognizeNumber);
    console.log(learnStageList);
    
    const repeatNumber = sessionLength - stop;
    const problemNumber = Math.round(problemList.length / problemDivisor);

    const repeatVariantList = Array(repeatNumber)
        .fill(repeatVariants.PROBLEM)
        .fill(repeatVariants.NORMAL, problemNumber);

    plan = {
        sessionLength,
        learnNumber,
        confirmNumber,
        repeatNumber,
        problemNumber,
        recognizeNumber
    };
    lists = {
        learnList,
        confirmList,
        repeatList,
        problemList,
        recognizeList,
        learnStageList,
        repeatVariantList
    }
    
    localStorage.setItem('words_plan', JSON.stringify(plan));
}

async function startSession() {
    const restored = await restoreSession();
    if(restored) {
        plan = restored.plan;
        lists = restored.lists;
        restoreProgress(restored.progress);

        showResetButton();
    } else {
        await fetchData();
    }
    
    console.log(lists);
    ready.value = true;
}

export { startSession, ready, plan, lists };