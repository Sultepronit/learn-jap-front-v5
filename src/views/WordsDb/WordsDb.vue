<script setup>
import EditSelected from './components/EditSelected.vue';
import SearchBar from './components/SearchBar.vue';
import DbList from '@/components/DbList.vue';
import DbTable from '@/components/DbTable.vue';
import TableRow from './components/TableRow.vue';

import { ref, computed, watch, watchEffect } from 'vue';
import { startSession, ready, db } from '@/views/WordsDb/services/crud.js';
import { calculateDefaultRowNumber, sortData, select } from '@/utils/tableControls.js';

document.title = 'Japanese words DB';
startSession();

// const localList = computed(() => db.value.slice() );

// const sortOptions = ref({
//     column: '',
//     reverse: false
// });
// function setSortOptions(newVal) {
//     sortOptions.value = newVal;
// }

// const viewList = computed(() =>
//     sortData(localList.value, sortOptions.value.column, sortOptions.value.reverse)
// );

// const defaultRowNumber = calculateDefaultRowNumber(6);
// const rowNumber = computed(() =>
//     viewList.value.length > defaultRowNumber ? defaultRowNumber : viewList.value.length
// );

// const lastDisplayedRow = ref(0);

// watchEffect(() => {
//     console.log('change!');
//     lastDisplayedRow.value = viewList.value.length;
// });

// function setLastDisplayedRow(newVal) {
//     lastDisplayedRow.value = newVal < rowNumber.value ? rowNumber.value
//         : newVal > viewList.value.length ? viewList.value.length : newVal;
// }

// function incrementLastDisplayedRow(delta) {
//     setLastDisplayedRow(Number(lastDisplayedRow.value) + delta);
// }

// const displayedRange = computed(() => {
//     return viewList.value.slice(
//         (lastDisplayedRow.value - rowNumber.value),
//         lastDisplayedRow.value
//     );
// });

// const selectedNumber = ref(0);
// const selectedCard = ref({});

// function selectWord(cardNumber, changeDisplay) {
//     // console.log('here?');
//     selectedNumber.value = Number(cardNumber);
//     selectedCard.value = select(viewList, cardNumber);
// }
const selectedCard = ref({});
function setSelectedCard(newVal) {
    selectedCard.value = newVal;
}
</script>

<template>
    <template v-if="ready">
        <EditSelected
            :card="selectedCard"
        />
        <!-- <SearchBar
            :selectedNumber="selectedNumber"
            :select="selectWord"
            :sortOptions="sortOptions"
            :setSortOptions="setSortOptions"
        /> -->
        <!-- {{ console.log(selectedNumber) }} -->
        <!-- <DbTable
            :db="db"
            outerSpace="6"
            :TableRow="TableRow"
            :SearchBar="SearchBar"

            :min="rowNumber"
            :max="viewList.length"
            :scrollerValue="lastDisplayedRow"
            :increment-last-row="incrementLastDisplayedRow"
            :set-last-row="setLastDisplayedRow"
            :displayedRange="displayedRange"
            :select="selectWord"
            :selectedNumber="selectedNumber"
        /> -->
        <DbTable
            :db="db"
            outerSpace="6"
            :setSelectedCard="setSelectedCard"
            :TableRow="TableRow"
            :SearchBar="SearchBar"
        />
    </template>
</template>