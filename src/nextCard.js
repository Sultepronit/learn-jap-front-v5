import { pullRandomElement } from "./commonFunctions";
import { learnStages, repeatVariants, directions } from "./enums";

function nextCard(lists) {
    console.log(lists);
    const {
        learnStageList,
        learnList,
        confirmList,
        recognizeList,
        repeatVariantList,
        repeatList,
        problemList
    } = lists;
    const learnStage = pullRandomElement(learnStageList);
    console.log(learnStage);
    console.log(learnStageList);

    const card =
        learnStage === learnStages.LEARN ?      pullRandomElement(learnList) :
        learnStage === learnStages.CONFIRM ?    pullRandomElement(confirmList) :
        learnStage === learnStages.RECOGNIZE ?  pullRandomElement(recognizeList) :
        pullRandomElement(repeatVariantList) === repeatVariants.NORMAL ?
            pullRandomElement(repeatList) : pullRandomElement(problemList);

    if(learnStage === learnStages.REPEAT) {
        console.log(repeatVariantList);
    }
    console.log(card);

    const direction = (card.fProgress > card.bProgress)
        ? directions.BACKWARD : directions.FORWARD;
    console.log(direction);

    Object.assign(card, {learnStage, direction});

    return card;
}

export default nextCard;