import { db } from "../services/crud";
import {
    rowNumber,
    resetRowNumber,
    viewList,
    resetViewList,
    select,
    goToTheBottom
} from "./displayAndSelect";

function checkJapanese(row, input) {
    const text = row.writings + row.rareWritings
        + row.readings + row.rareReadings;
    if(text.includes(input)) {
        return true;
    }
    const inclusiveWritings = text.replace(/[()[\]{}]/g, '');
    if(inclusiveWritings.includes(input)) {
        return true;
    }
    const exclusiveWritings = text.replace(/\([^)]*\)|\[[^\]]*\]|\{[^}]*\}/g, '');
    if(exclusiveWritings.includes(input)) {
        return true;
    }
}

function checkTranslation(row, input) {
    const text = row.translation + row.example;
    // console.log(text);
    if(text.includes(input)) {
        return true;
    }
}

function displayResults(filtered) {
    resetRowNumber();
    resetViewList();

    if(!filtered || filtered.length < 1) {
        goToTheBottom();
        return;
    }

    if(filtered.length > 1) {
        viewList.value = filtered;
        if(rowNumber.value > filtered.length) {
            rowNumber.value = filtered.length;
        }
    }
    
    select(filtered[filtered.length - 1].cardNumber, true);
}

function searchText(query, searchInTranslation) {
    if(query === '') {
        displayResults(null);
        return;
    }
    
    const filtered = db.value.filter((row) => {
        return searchInTranslation ? checkTranslation(row, query)
            : checkJapanese(row, query);
    });
    // console.log(filtered);

    displayResults(filtered);
}

function searchInStats(query, column) {
    // if(query === '') {
    //     displayResults(null);
    //     return;
    // }

    let filtered = [];
    if(!isNaN(query) && query !== '') {
        filtered = db.value.filter((row) => row[column] == query);
    } else {
        const lt = query.split('<')[1];
        const mt = query.split('>')[1];
        const btw = query.split('-');
        // console.log(btw);
        // console.log(btw[0], 2, btw[1]);
        // console.log(btw[0] < 2 < btw[1]);
        if(lt) {
            filtered = db.value.filter((row) => row[column] < lt);
        } else if(mt) {
            filtered = db.value.filter((row) => row[column] > mt);
        } else if(btw.length === 2) {
            filtered = db.value.filter((row) => {
                return btw[0] <= row[column] && row[column] <= btw[1];
            });
        }
    }

    displayResults(filtered);
}
export { searchText, searchInStats };