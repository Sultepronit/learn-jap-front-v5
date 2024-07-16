<script setup>
// import SearchBar from './components/SearchBar.vue';
// import DbList from '@/components/DbList.vue';
import DbTable from '@/components/DbTable.vue';
import TableRow from './components/TableRow.vue';
import SearchText from './components/SearchText.vue';

import { startSession, ready, db } from './services/crud';
// import statsTitles from './utils/statsTitles.js';
import findText from './utils/findText.js';

document.title = 'Kanji DB';
startSession();

const statsTitles = [
    'repeatStatus', 
    'progress', 
    'record', 
    'autorepeat'
];

const sortColumns = ['id', ...statsTitles];

</script>

<template>
    <template v-if="ready">
        <DbTable
            :db="db"
            cardNumber="id"
            outerSpace="1"
            :setSelectedCard="() => {}"
            :enforcedList="null"
            :findText="findText"
            :filterColumns="statsTitles"
            :sortColumns="sortColumns"
            :TableRow="TableRow"
            :SearchText="SearchText"
        />
    </template>
</template>