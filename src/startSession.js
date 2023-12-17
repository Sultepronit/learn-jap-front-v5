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
        problemList,
        recognizeList
    } = data;
    const { sessionLength, confirmDivisor, problemDivisor } = constsAndVars;

    const learnNumber = learnList.length - 1;
    const confirmNumber = Math.round(confirmList.length / confirmDivisor);
    // const recongnizeNumber = Math.ceil(recognizeList?.length / 5);
    const recongnizeNumber = 0;
    const problemNumber = Math.round(problemList.length / problemDivisor);

    return {
        consts: { sessionLength, learnNumber, confirmNumber,  }
    };
}

export default startSession;