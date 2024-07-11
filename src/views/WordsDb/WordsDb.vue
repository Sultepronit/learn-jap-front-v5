<script setup>
import EditSelected from './components/EditSelected.vue';
import SearchBar from './components/SearchBar.vue';
// import DbList from '@/components/DbList.vue';
import DbTable from '@/components/DbTable.vue';
import TableRow from './components/TableRow.vue';

import { ref, computed, watch, watchEffect } from 'vue';
import { startSession, ready, db } from '@/views/WordsDb/services/crud.js';
import findText from './utils/findText.js';
// import { calculateDefaultRowNumber, sortData, select } from '@/utils/tableControls.js';

document.title = 'Japanese words DB';
startSession();


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
        <DbTable
            :db="db"
            cardNumber="cardNumber"
            outerSpace="6"
            :setSelectedCard="setSelectedCard"
            :TableRow="TableRow"
            :SearchBar="SearchBar"
            :findText="findText"
        />
    </template>
</template>