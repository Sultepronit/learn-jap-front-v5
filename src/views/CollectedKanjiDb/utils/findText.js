function findText(data, options) {
    console.log('find', options)
    if(!options.query) return null;

    return data.filter((row) => {
        return row.kanji === options.query;
    });
}

export default findText;