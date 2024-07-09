<script setup>
import EditSelected from './components/EditSelected.vue';
import SearchBar from './components/SearchBar.vue';
import DbList from '@/components/DbList.vue';
import DbTable from '@/components/DbTable.vue';
import TableRow from './components/TableRow.vue';

import { ref, computed, watch } from 'vue';
import { startSession, ready, db } from '@/views/WordsDb/services/crud.js';
import { calculateDefaultRowNumber, sortData } from '@/utils/tableControls.js';
import {
    // displayedRange, 
    selectedNumber,
    select,
    // incrementLastDisplayedRow, 
    // setLastDisplayedRow, 
    // rowNumber, 
    // viewList,
    // lastDisplayedRow 
} from './utils/displayAndSelect';

document.title = 'Japanese words DB';
startSession();

const localList = computed(() => db.value.slice() );

const sortOptions = ref({
    column: '',
    reverse: false
});
function setSortOptions(newVal) {
    console.log('here we go!');
    sortOptions.value = newVal;
}

const viewList = computed(() =>
    sortData(localList.value, sortOptions.value.column, sortOptions.value.reverse)
);
// watch(sortOptions, () => {
//     sortData(localList, ...sortOptions)
// });

const defaultRowNumber = calculateDefaultRowNumber(6);
// console.log(defaultRowNumber);
// console.log(displayedRange);
// console.log(viewList);
const rowNumber = computed(() =>
    viewList.value.length > defaultRowNumber ? defaultRowNumber : viewList.value.length
);
// console.log(rowNumber.value);

const lastDisplayedRow = ref(viewList.value.length);
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
</script>

<template>
    <template v-if="ready">
        <EditSelected />
        <SearchBar
            :sortOptions="sortOptions"
            :setSortOptions="setSortOptions"
        />
        <DbTable
            :min="rowNumber"
            :max="viewList.length"
            :scrollerValue="lastDisplayedRow"
            :increment-last-row="incrementLastDisplayedRow"
            :set-last-row="setLastDisplayedRow"
            :TableRow="TableRow"
            :displayedRange="displayedRange"
            :select="select"
            :selectedNumber="selectedNumber"
        />
        <!-- <DbList
            :min="rowNumber"
            :max="viewList.length"
            :current="lastDisplayedRow"
            :increment-last-row="incrementLastDisplayedRow"
            :set-last-row="setLastDisplayedRow"
            :TableRow="TableRow"
            :displayedRange="displayedRange"
            :select="select"
            :selectedNumber="selectedNumber"
        /> -->
    </template>
</template>