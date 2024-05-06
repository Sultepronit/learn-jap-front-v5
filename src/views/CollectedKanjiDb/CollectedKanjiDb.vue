<script setup>
import { startSession, ready } from './services/crud';
// import EditSelected from './components/EditSelected.vue';
import SearchBar from './components/SearchBar.vue';
import TableRow from './components/TableRow.vue';
import DbList from './components/DbList.vue';

document.title = 'Collected Kanji DB';

import {
    displayedRange as range,
    selectedNumber,
    select,
    incrementLastDisplayedRow, // as incrementLastRow,
    setLastDisplayedRow, // as setLastRow,
    rowNumber, // as min,
    viewList,
    lastDisplayedRow, // as lastRow
} from './utils/displayAndSelect';

startSession();
// console.log('ready?');
</script>

<template>
    <template v-if="ready">
        <SearchBar />
        <DbList 
            :range="range"
            :incrementLastRow="incrementLastDisplayedRow"
            :setLastRow="setLastDisplayedRow"
            :min="rowNumber"
            :max="viewList.length"
            :lastRow="lastDisplayedRow"
        >
            <TableRow
                v-for="row in range"
                :key="row.id"
                :row="row"
                @click="select(row.id)"
                :class="{selected: selectedNumber === row.id}"
            />
            <!-- <p v-slot="props">
                go!
                {{ props }}
            </p> -->
            <!-- <TableRow v-slot="props" /> -->
        </DbList>
    </template>
</template>