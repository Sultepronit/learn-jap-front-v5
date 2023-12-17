import { learnStages, repeatVariants } from "./enums.js";
async function startSession() {
    console.timeLog('tt', 'fetch');
    // console.time('tt');
    const resp = await fetch('http://localhost:7878/start-jap-session.php');
    const data = await resp.json();
    console.timeLog('tt', 'data!');
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
    
    const repeatNumber = sessionLength - stop;
    const problemNumber = Math.round(problemList.length / problemDivisor);

    const repeatVariantList = Array(repeatNumber)
        .fill(repeatVariants.PROBLEM)
        .fill(repeatVariants.NORMAL, problemNumber);

    console.timeLog('tt');

    return {
        consts: {
            sessionLength,
            learnNumber,
            confirmNumber,
            repeatNumber,
            problemNumber,
            recognizeNumber
        },
        lists: {
            learnList,
            confirmList,
            repeatList,
            problemList,
            recognizeList,
            learnStageList,
            repeatVariantList
        }
    };
}

export default startSession;