<script setup>
import { startSession, ready } from './services/crud';
import SearchBar from './components/SearchBar.vue';
// import DbList from './components/DbList.vue';
import DbList from '@/components/DbList.vue';
import TableRow from './components/TableRow.vue';

document.title = 'Collected Kanji DB';

import {
    displayedRange as range,
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
        <SearchBar />
        <DbList 
            :min="rowNumber"
            :max="viewList.length"
            :current="lastDisplayedRow"
            :incrementLastRow="incrementLastDisplayedRow"
            :setLastRow="setLastDisplayedRow"
        >
            <TableRow
                v-for="row in range"
                :key="row.id"
                :row="row"
                @click="select(row.id)"
                :class="{selected: selectedNumber === row.id}"
            />
        </DbList>
    </template>
</template>