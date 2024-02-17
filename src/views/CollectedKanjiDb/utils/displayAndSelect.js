import { ref, watch, computed } from 'vue';
import { db, ready, numberToSelect } from '../services/crud.js';

const viewList = ref([]);
function resetViewList() {
    // viewList.value = db.value; 
    viewList.value = [ ...db.value ]; 
}

function sortViewList(field, reverse) {
    viewList.value.sort((a, b) => a[field] - b[field]);
    if(reverse) {
        viewList.value.reverse();
    }
}

const rowNumber = ref(0);
function resetRowNumber() {
    rowNumber.value = Math.round((window.innerHeight / 33) - 1);
}
resetRowNumber();

const selectedNumber = ref(0);
const selectedCard = ref({});

watch(ready, () => {
    resetViewList();
    goToTheBottom();
});

const lastDisplayedRow = ref(0);
function setLastDisplayedRow(newVal) {
    lastDisplayedRow.value = newVal < rowNumber.value ? rowNumber.value
        : newVal > viewList.value.length ? viewList.value.length : newVal;
}

function incrementLastDisplayedRow(delta) {
    setLastDisplayedRow(Number(lastDisplayedRow.value) + delta);
}

const displayedRange = computed(() => {
    return viewList.value.slice(
        (lastDisplayedRow.value - rowNumber.value),
        lastDisplayedRow.value
    );
});

function select(cardNumber, changeDisplay) {
    cardNumber = Math.round(cardNumber);
    if(cardNumber < 1 || cardNumber > db.value.length) {
        return;
    }
    selectedNumber.value = cardNumber;
    selectedCard.value = db.value[cardNumber - 1];
    
    // console.log(selectedNumber.value);
    console.log(selectedCard.value);

    if(changeDisplay) {
        if(db.value[cardNumber - 1] !== viewList.value[cardNumber - 1]) {
            // console.log(db.value[cardNumber - 1], viewList.value[cardNumber - 1]);
            const shifted = viewList.value.findIndex(card => card.id === cardNumber);
            // console.log(shifted);
            cardNumber = shifted + 1;
        }

        setLastDisplayedRow(cardNumber + rowNumber.value - 1);
        // console.log(cardNumber + rowNumber.value - 1);
    }
}

watch(numberToSelect, (num) => {
    select(num, true);
});

function goToTheBottom() {
    setLastDisplayedRow(db.value.length);
    select(db.value.length);
}

export {
    viewList,
    resetViewList,
    sortViewList,
    rowNumber,
    resetRowNumber,
    lastDisplayedRow,
    setLastDisplayedRow,
    incrementLastDisplayedRow,
    displayedRange,
    select,
    selectedNumber,
    selectedCard,
    goToTheBottom
};