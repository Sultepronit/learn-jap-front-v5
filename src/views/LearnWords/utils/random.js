function randomInt(from, to) {
    return Math.round((Math.random() * (to - from)) + from);
}

function pullRandomElement(array) {
    const index = randomInt(0, array.length - 1);
    const item = array[index];
    array.splice(index, 1);
    return item;
} 
export { randomInt, pullRandomElement };