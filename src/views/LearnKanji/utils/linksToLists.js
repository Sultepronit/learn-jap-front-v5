import { words } from "../services/data";
import { parseToString as prepareWord } from "@/utils/parseWritingsReadings";
import { randomInt } from "@/utils/random";

function makeList(linksJson) {
    const links = JSON.parse(linksJson);
    if(links.length < 1) {
        return [];
    }

    const list = [];
    for(const link of links) {
        const word = words[link - 1];
        // console.log(word);
        prepareWord(word);
        // console.log(word);
        const item = {
            articleNumber: link - 1,
            article: `${word.parsed.writingsString} : ${word.parsed.readingsString} – ${word.translation}`
        }
        list.push(item);
    }

    const ri = randomInt(0, list.length - 1);
    const firstPart = list.slice(0, ri);
    const secondPart = list.slice(ri);
    // console.log(firstPart);
    // console.log(secondPart);

    // return list;
    return [...secondPart, ...firstPart];
}

function linksToLists(card) {    
    // const links = JSON.parse(card.links);
    card.wordList = makeList(card.links);
    card.otherList = makeList(card.otherLinks);
}

export default linksToLists;