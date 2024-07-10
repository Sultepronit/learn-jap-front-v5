<script setup>
import { ref, computed, watchEffect } from 'vue';
import { calculateDefaultRowNumber, sortData, select } from '@/utils/tableControls.js';

const props = defineProps([
    'db',
    'outerSpace',
    'setSelectedCard',
    'TableRow',
    'SearchBar'
]);

const localList = computed(() => props.db.slice());
// console.log(localList.value);

const sortOptions = ref({
    column: '',
    reverse: false
});
function setSortOptions(newVal) {
    sortOptions.value = newVal;
}

const viewList = computed(() =>
    sortData(localList.value, sortOptions.value.column, sortOptions.value.reverse)
);

const defaultRowNumber = Math.round((window.innerHeight / 33) - props.outerSpace);
const rowNumber = computed(() =>
    viewList.value.length > defaultRowNumber ? defaultRowNumber : viewList.value.length
);
//console.log(rowNumber.value);

const lastDisplayedRow = ref(0);

watchEffect(() => {
    console.log('change!');
    lastDisplayedRow.value = viewList.value.length;
});

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

const selectedNumber = ref(0);

function selectItem(cardNumber, changeDisplay) {
    const selectedCard = select(viewList, cardNumber);
    if(!selectedCard) return;

    selectedNumber.value = Number(cardNumber);
    props.setSelectedCard(selectedCard);
}

</script>

<template>
    <SearchBar
        :selectedNumber="selectedNumber"
        :select="selectItem"
        :sortOptions="sortOptions"
        :setSortOptions="setSortOptions"
    />
    <section
        id="table"
        @wheel="incrementLastDisplayedRow(Math.round($event.deltaY) / 16)"
    >
        <div id="rows">
            <TableRow
                v-for="row in displayedRange"
                :key="row.id"
                :row="row"
                :select="selectItem"
                :selectedNumber="selectedNumber"
            />
            <!-- {{ console.log(selectedNumber) }} -->
            <!-- {{ console.log(scrollerValue, min, max) }} -->
        </div>
        <input
            id="scroller"
            v-show="rowNumber < viewList.length"
            type="range"
            :min="rowNumber"
            :max="viewList.length"
            :value="lastDisplayedRow"
            @change="setLastDisplayedRow($event.target.value)"
        >
    </section>
</template>


<style>
#table {
    display: flex;
    width: 100%;
}
#rows {
    width: 100%;
    border-top: 1px solid;
    border-right: 1px solid;
}
#scroller {
    writing-mode: vertical-rl
}
.selected {
    background-color: #90ffef;
}
</style>