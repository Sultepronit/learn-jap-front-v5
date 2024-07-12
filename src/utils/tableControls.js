function sortData(data, options) {
    // console.log('sort!');
    if(!options.column) return data;

    data.sort((a, b) => a[options.column] - b[options.column]);

    if(options.reverse) {
        data.reverse();
    }

    return data;
}

function select(db, cardNumber) {
    const index = cardNumber - 1;
    if(index < 0 || index >= db.length) return;
    
    const card = db[index];
    console.log(card);

    return card;
}

function searchInStats(data, options) {
    // console.log('filter', options);
    if(!options.query) return null;
    // console.log(options.query);
    const { query, column } = options;
    if(query !== '' && !isNaN(query)) {
        return data.filter((row) => row[column] == query);
    } else {
        const lt = query.split('<')[1];
        const mt = query.split('>')[1];
        const btw = query.split('-');

        if(lt) {
            return data.filter((row) => row[column] < lt);
        } else if(mt) {
            return data.filter((row) => row[column] > mt);
        } else if(btw.length === 2) {
            return data.filter((row) => {
                return btw[0] <= row[column] && row[column] <= btw[1];
            });
        }
    }
}

export {
    sortData,
    select,
    searchInStats
};