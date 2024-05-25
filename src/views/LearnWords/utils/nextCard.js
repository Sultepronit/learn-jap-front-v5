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
    // console.log(direction);

    card.direction = direction;

    parseToStringAndArray(card);
    getKanjiList(card);

    console.log(session);
    console.log(card);
    return card;
}

function returnCard(card) {
    console.log("I'll be back!");
    if(card.learnStage === learnStages.REPEAT) {
        // card.learnStage = learnStages.REMEMBER;
        session.push({...card, learnStage: learnStages.REMEMBER});
    } else {
        session.push(card);
    }
}

export default nextCard;
export { returnCard };