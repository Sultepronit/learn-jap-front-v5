<script setup>
import EditSelected from './components/EditSelected.vue';
import DbTable from '@/components/DbTable.vue';
import TableRow from './components/TableRow.vue';
import SearchText from './components/SearchText.vue';

import { ref } from 'vue';
import { startSession, ready, db } from '@/views/WordsDb/services/crud.js';
import findText from './utils/findText.js';
import statsTitles from './utils/statsTitles.js';

document.title = 'Japanese words DB';
startSession();

const filterColumns = ['repeatStatus', ...statsTitles];
const sortColumns = ['cardNumber', ...filterColumns];

const enforcedList = ref(null);
function setEnforcedList(newVal) {
    enforcedList.value = newVal;
}

const selectedCard = ref({});
function setSelectedCard(newVal) {
    selectedCard.value = newVal;
}
</script>

<template>
    <template v-if="ready">
        <EditSelected
            :card="selectedCard"
            :db="db"
            :findInDb="findText"
            :displayMatches="setEnforcedList"
        />
        <DbTable
            :db="db"
            cardNumber="cardNumber"
            outerSpace="6"
            :setSelectedCard="setSelectedCard"
            :enforcedList="enforcedList"
            :findText="findText"
            :filterColumns="filterColumns"
            :sortColumns="sortColumns"
            :TableRow="TableRow"
            :SearchText="SearchText"
        />
    </template>
</template>