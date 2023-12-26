const lastDisplayedRow = ref(0);
function setLastDisplayedRow(newVal) {
    if(newVal < rowNumber.value) {
        newVal = rowNumber.value;
    } else if(newVal >= viewList.value.length) {
        newVal = viewList.value.length;
    }
    lastDisplayedRow.value = newVal; 
    // console.log(lastDisplayedRow.value);
}

function incrementLastDisplayedRow(delta) {
    setLastDisplayedRow(Number(lastDisplayedRow.value) + delta);
}

const displayedRange = computed(() => {
    // console.log(lastDisplayedRow.value, rowNumber.value);
    return viewList.value.slice(
        (lastDisplayedRow.value - rowNumber.value),
        lastDisplayedRow.value
    );
});