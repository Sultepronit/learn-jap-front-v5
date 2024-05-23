import { randomInt } from "./random";
import { toKatakana } from "wanakana";

function parseToString(card) {
    if(card.parsed) {
        // console.log('I was here already!');
        return;
    }

    // writings //
    let writingsString = card.writings.replaceAll(', ', '　');

    if(card.altWriting) {
        writingsString = `<span class="blue">${writingsString}</span>`;
    }

    if(card.rareWritings) {
        const rw = card.rareWritings.replaceAll(', ', '　');
        writingsString += `　<span class="gray">${rw}</span>`;
    }

    writingsString = writingsString.replaceAll('(', '<span class="yellow">');
    writingsString = writingsString.replaceAll('[', '<span class="blue">');
    writingsString = writingsString.replaceAll('{', '<span class="green">');
    writingsString = writingsString.replaceAll(/[)\]}]/g, '</span>');

    // readings //
    const makeKatakana = randomInt(0, 1);

    let readingsString = card.readings.replaceAll(', ', '　');
    if(makeKatakana) {
        readingsString = toKatakana(readingsString);
    }
    
    if(card.rareReadings) {
        let rr = card.rareReadings.replaceAll(', ', '　');
        if(makeKatakana) {
            rr = toKatakana(rr);
        }
        readingsString += `　<span class="gray">${rr}</span>`;
    }

    card.parsed = {
        writingsString, readingsString
    }
}

const regEx = [/\([^)]*\)|[[\]{}]/g, /\([^)]*\)|\{[^}]*\}|[[\]]/g];
function parseToArray(card) {
    const ri = randomInt(0, 1);
    const preparedWritings = card.writings.replace(regEx[ri], '');
    const writingsArray = preparedWritings.split(', ');

    const mainReadingsArray = card.readings.split(', ');
    const readingsArray = [...mainReadingsArray];
    
    if(card.rareReadings) {
        readingsArray.push( ...card.rareReadings.split(', ') );
    }

    Object.assign(
        card.parsed,
        { writingsArray, mainReadingsArray, readingsArray }
    );
}

function parseToStringAndArray(card) {
    if(card.parsed) {
        console.log('I was here already!');
        return;
    }
    parseToString(card);
    parseToArray(card);
}

export { parseToString, parseToStringAndArray };