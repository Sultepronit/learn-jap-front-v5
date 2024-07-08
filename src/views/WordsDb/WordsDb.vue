<script setup>
import { startSession, ready } from './services/crud';
import EditSelected from './components/EditSelected.vue';
import SearchBar from './components/SearchBar.vue';
import DbList from '@/components/DbList.vue';
import TableRow from './components/TableRow.vue';

document.title = 'Japanese words DB';

import {
    displayedRange, // as range,
    selectedNumber,
    select,
    incrementLastDisplayedRow, // as incrementLastRow,
    setLastDisplayedRow, // as setLastRow,
    rowNumber, // as min,
    viewList,
    lastDisplayedRow // as lastRow
} from './utils/displayAndSelect';

startSession();
</script>

<template>
    <template v-if="ready">
        <EditSelected />
        <SearchBar />
        <DbList
            :min="rowNumber"
            :max="viewList.length"
            :current="lastDisplayedRow"
            :increment-last-row="incrementLastDisplayedRow"
            :set-last-row="setLastDisplayedRow"
            :TableRow="TableRow"
            :displayedRange="displayedRange"
            :select="select"
            :selectedNumber="selectedNumber"
        />
    </template>
</template>