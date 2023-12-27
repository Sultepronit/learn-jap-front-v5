import { ref, watch, computed } from 'vue';
import { db, ready, numberToSelect } from '@/JapDb/crud.js';

const viewList = ref([]);
function resetViewList() {
    viewList.value = db.value; 
}

const rowNumber = ref(0);
function resetRowNumber() {
    rowNumber.value = Math.round((window.innerHeight / 33) - 6);
}
resetRowNumber();

const selectedNumber = ref(0);
const selectedCard = ref({});

watch(ready, () => {
    console.log('ready!');
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
    // console.log(lastDisplayedRow.value, rowNumber.value);
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
    console.log(selectedCard.value);
    if(changeDisplay) {
        setLastDisplayedRow(cardNumber + rowNumber.value - 1);
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