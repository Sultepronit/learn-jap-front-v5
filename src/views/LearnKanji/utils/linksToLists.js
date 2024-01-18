import { words } from "../services/data";
import { parseToString as prepareWord } from "@/utils/parseWritingsReadings";

function makeList(linksJson) {
    const links = JSON.parse(linksJson);

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

    return list;
}

function linksToLists(card) {    
    // const links = JSON.parse(card.links);
    card.wordList = makeList(card.links);
    card.otherList = makeList(card.otherLinks);
}

export default linksToLists;