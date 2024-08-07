import { repeatStages, directions } from "./enums";
import { session } from "../services/data";
import { parseToStringAndArray } from "@/utils/parseWritingsReadings";
import { getKanjiList } from './kanji.js';

function nextCard() {
    if(session.length < 1) {
        return null;
    }

    const card = session.shift();
    card.direction = (card.fProgress > card.bProgress)
        ? directions.BACKWARD : directions.FORWARD;

    parseToStringAndArray(card);
    getKanjiList(card);

    console.log(session);
    console.log(card);
    return card;
}

function returnCard(card) {
    console.log("I'll be back!");
    if(card.repeatStage === repeatStages.REPEAT) {
        session.push({...card, repeatStage: repeatStages.REMEMBER});
    } else {
        session.push(card);
    }
}

export default nextCard;
export { returnCard };