function searchInJapanese(row, query) {
    const text = row.writings + row.rareWritings
        + row.readings + row.rareReadings;
    if(text.includes(query)) {
        return true;
    }
    const inclusiveWritings = text.replace(/[()[\]{}]/g, '');
    if(inclusiveWritings.includes(query)) {
        return true;
    }
    const exclusiveWritings = text.replace(/\([^)]*\)|\[[^\]]*\]|\{[^}]*\}/g, '');
    if(exclusiveWritings.includes(query)) {
        return true;
    }
}

function searchInTranslation(row, query) {
    const text = row.translation + row.example;
    if(text.includes(query)) {
        return true;
    }
}

function findText(data, options) {
    // console.log('find', options)
    if(!options.query) return null;

    const { query, inTranslation } = options;

    return inTranslation ? data.filter(row => searchInTranslation(row, query))
        : data.filter(row => searchInJapanese(row, query));
}

export default findText;