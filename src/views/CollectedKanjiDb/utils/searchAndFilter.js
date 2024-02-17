import { db } from "../services/crud";
import {
    rowNumber,
    resetRowNumber,
    viewList,
    resetViewList,
    select,
    goToTheBottom
} from "./displayAndSelect";

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
    
    select(filtered[filtered.length - 1].id, true);
}

function searchKanji(query) {
    console.log(query);
    if(query === '') {
        displayResults(null);
        return;
    }
    
    const filtered = db.value.filter((row) => {
        return row.kanji == query;
    });
    // console.log(filtered);

    displayResults(filtered);
}

function searchInStats(query, column) {
    let filtered = [];

    if(!isNaN(query) && query !== '') {
        filtered = db.value.filter((row) => row[column] == query);
    } else {
        const lt = query.split('<')[1];
        const mt = query.split('>')[1];
        const btw = query.split('-');

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

    console.log(filtered);

    displayResults(filtered);
}
export { searchKanji, searchInStats };