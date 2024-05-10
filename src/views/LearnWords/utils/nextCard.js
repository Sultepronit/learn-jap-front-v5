import { pullRandomElement } from "@/utils/random";
import { learnStages, /*repeatVariants,*/ directions } from "./enums";
import { lists } from "../services/data";
import { parseToStringAndArray } from "@/utils/parseWritingsReadings";

function nextCard() {
    const {
        learnStageList,
        learnList,
        confirmList,
        recognizeList,
        // repeatVariantList,
        repeatList,
        // problemList
    } = lists;

    if(learnStageList.length < 1) {
        return null;
    }

    const learnStage = pullRandomElement(learnStageList);
    // const learnStage = learnStages.LEARN;
    console.log(learnStage);
    console.log(learnStageList);

    const card =
        learnStage === learnStages.LEARN ?      pullRandomElement(learnList) :
        learnStage === learnStages.CONFIRM ?    pullRandomElement(confirmList) :
        learnStage === learnStages.RECOGNIZE ?  pullRandomElement(recognizeList) :
        pullRandomElement(repeatList);
        // pullRandomElement(repeatVariantList) === repeatVariants.NORMAL ?
            // pullRandomElement(repeatList) : pullRandomElement(problemList);

    // if(learnStage === learnStages.REPEAT) {
    //     console.log(repeatVariantList);
    // }

    const direction = (card.fProgress > card.bProgress)
        ? directions.BACKWARD : directions.FORWARD;
    console.log(direction);

    Object.assign(card, {learnStage, direction});

    parseToStringAndArray(card);

    console.log(card);
    return card;
}

function returnCard(card) {
    console.log("I'll be back!");
    // const { learnStageList, learnList } = lists;
    lists.learnStageList.push(learnStages.LEARN);
    lists.learnList.push(card);
    // console.log(learnStageList);
    console.log(lists.learnList);
}

function repeatOneMore() {
    console.log("repeat more!");
    // const { learnStageList, repeatVariantList } = lists;
    lists.learnStageList.push(learnStages.REPEAT);
    // repeatVariantList.push(repeatVariants.NORMAL);
}

export default nextCard;
export { returnCard, repeatOneMore };