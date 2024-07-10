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

function select(data, cardNumber) {
    const index = cardNumber - 1;
    if(index < 0 || index >= data.value.length) return;
    
    const card = data.value[index];
    console.log(card);

    return card;
}

export {
    calculateDefaultRowNumber,
    sortData,
    select
};