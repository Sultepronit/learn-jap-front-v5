<script setup>
import EditSelected from './components/EditSelected.vue';
import SearchBar from './components/SearchBar.vue';
import DbList from '@/components/DbList.vue';
import DbTable from '@/components/DbTable.vue';
import TableRow from './components/TableRow.vue';

import { ref } from 'vue';
import { startSession, ready } from './services/crud';
import { calculateDefaultRowNumber } from '@/utils/tableControls.js';
import {
    displayedRange, 
    selectedNumber,
    select,
    incrementLastDisplayedRow, 
    setLastDisplayedRow, 
    rowNumber, 
    viewList,
    lastDisplayedRow 
} from './utils/displayAndSelect';

document.title = 'Japanese words DB';
startSession();

const defaultRowNumber = calculateDefaultRowNumber(6);
console.log(defaultRowNumber);
// const rowNumber = ref(0);
</script>

<template>
    <template v-if="ready">
        <EditSelected />
        <SearchBar />
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
    </template>
</template>