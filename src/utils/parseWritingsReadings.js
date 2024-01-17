import { randomInt } from "./random";

function parseToString(card) {
    let writingsString = card.writings.replaceAll(', ', '　');
    if(card.rareWritings) {
        const rw = card.rareWritings.replaceAll(', ', '　');
        writingsString += `　<span class="gray">${rw}</span>`;
    }
    writingsString = writingsString.replaceAll('(', '<span class="yellow">');
    writingsString = writingsString.replaceAll('[', '<span class="blue">');
    writingsString = writingsString.replaceAll('{', '<span class="green">');
    writingsString = writingsString.replaceAll(/[)\]}]/g, '</span>');

    let readingsString = card.readings.replaceAll(', ', '　');
    if(card.rareReadings) {
        const rr = card.rareReadings.replaceAll(', ', '　');
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
    parseToString(card);
    parseToArray(card);
}

export { parseToString, parseToStringAndArray };