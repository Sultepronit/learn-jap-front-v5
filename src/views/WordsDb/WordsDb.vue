<script setup>
import EditSelected from './components/EditSelected.vue';
import SearchBar from './components/SearchBar.vue';
import DbTable from '@/components/DbTable.vue';
import TableRow from './components/TableRow.vue';

import { ref } from 'vue';
import { startSession, ready, db } from '@/views/WordsDb/services/crud.js';
import findText from './utils/findText.js';

document.title = 'Japanese words DB';
startSession();

const enforcedList = ref(null);
function setEnforcedList(newVal) {
    // console.log(newVal);
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
            :TableRow="TableRow"
            :SearchBar="SearchBar"
        />
    </template>
</template>