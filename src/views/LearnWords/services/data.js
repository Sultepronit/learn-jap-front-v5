import { ref } from "vue";
import { learnStages, repeatVariants } from "../utils/enums.js";
import { get } from "@/services/commonAPI.js";
// import { nextCycle } from "../utils/cycle.js";

let plan = {};
let lists = {};
const ready = ref(false);

async function startSession() {
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
    console.log(lists);
    ready.value = true;
}

export { startSession, ready, plan, lists };