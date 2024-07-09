function calculateDefaultRowNumber(ounterSpace) {
    return Math.round((window.innerHeight / 33) - ounterSpace);
}

function sortData(data, column, reverse) {
    // console.log('sort!');
    if(!column) return data;

    data.sort((a, b) => a[column] - b[column]);
    if(reverse) {
        data.reverse();
    }

    return data;
}

export {
    calculateDefaultRowNumber,
    sortData
};