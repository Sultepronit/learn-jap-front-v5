// import { pullRandomElement } from "@/utils/random";
import { learnStages, directions } from "./enums";
import { session } from "../services/data";
import { parseToStringAndArray } from "@/utils/parseWritingsReadings";
import { getKanjiList } from './kanji.js';

function nextCard() {
    if(session.length < 1) {
        return null;
    }

    const card = session.shift();
    const direction = (card.fProgress > card.bProgress)
        ? directions.BACKWARD : directions.FORWARD;
    console.log(direction);

    card.direction = direction;

    parseToStringAndArray(card);
    getKanjiList(card);

    console.log(card);
    return card;
}

function returnCard(card) {
    console.log("I'll be back!");
    // console.log(card.value);
    if(card.learnStage === learnStages.LEARN) {
        lists.learnStageList.push(learnStages.LEARN);
        lists.learnList.push(card);
        console.log(lists.learnList);
    } else {
        lists.learnStageList.push(learnStages.REMEMBER);
        lists.rememberList.push(card);
        console.log(lists.rememberList);
    }
    // console.log(lists);
}

function repeatOneMore() {
    console.log("repeat more!");
    // const { learnStageList, repeatVariantList } = lists;
    lists.learnStageList.push(learnStages.REPEAT);
    // repeatVariantList.push(repeatVariants.NORMAL);
}

export default nextCard;
export { returnCard, repeatOneMore };