// import { words } from "../services/data";
import { wordsForKanji } from '@/services/wordsForKanji.js';
import { parseToString as prepareWord } from "@/utils/parseWritingsReadings";
import { randomInt } from "@/utils/random";

function makeList(linksJson) {
    const links = JSON.parse(linksJson);
    if(links.length < 1) {
        return [];
    }

    const list = [];
    for(const link of links) {
        const word = wordsForKanji[link - 1];
        // console.log(word);
        prepareWord(word);
        // console.log(word);
        const item = {
            articleNumber: link,
            article: `${word.parsed.writingsString} : ${word.parsed.readingsString} – ${word.translation}`
        }
        list.push(item);
    }

    const ri = randomInt(0, list.length - 1);
    const firstPart = list.slice(0, ri);
    const secondPart = list.slice(ri);

    return [...secondPart, ...firstPart];
}

function linksToLists(card) {
    card.wordList = makeList(card.links);
    card.otherList = makeList(card.otherLinks);
}

export default linksToLists;