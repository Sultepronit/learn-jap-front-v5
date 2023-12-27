<script setup>
import { ref, computed, watch } from 'vue';
import { db, ready } from '@/JapDb/crud.js';
import EditSelected from './EditSelected.vue';
import FilterBar from './FilterBar.vue';
import DbList from './DbList.vue';


function searchInWritings(row, input) {
    const writings = row.writings + row.rareWritings;
    if(writings.includes(input)) {
        return true;
    }
    const inclusiveWritings = writings.replace(/[()[\]{}]/g, '');
    if(inclusiveWritings.includes(input)) {
        return true;
    }
    const exclusiveWritings = writings.replace(/\([^)]*\)|\[[^\]]*\]|\{[^}]*\}/g, '');
    if(exclusiveWritings.includes(input)) {
        return true;
    }
}

function search(column, input) {
    rowNumber.value = maxRowNumber;

    function breakOut() {
        viewList.value = db.value;
        // select(selectedNumber.value, true);
        setLastDisplayedRow(selectedNumber.value + rowNumber.value - 1);
        return;
    }

    if(!input) breakOut();
    // console.log(column, input);
    const filtered = db.value.filter((row) => {
        return searchInWritings(row, input);
    });
    // console.log(filtered);

    if(filtered.length < 1) breakOut();

    if(filtered.length > 1) {
        viewList.value = filtered;
        if(rowNumber.value > filtered.length) {
            rowNumber.value = filtered.length;
        }
    }
    
    select(filtered[filtered.length - 1].cardNumber, true);
}
</script>

<template>
    <EditSelected />
    <!-- <EditSelected
        :card="selectedCard"
    /> -->
    <FilterBar />
    <!-- <FilterBar
        :selectedNumber="selectedNumber"
        :lastCardNumber="db.length"
        :select="select"
        @search="search"
    /> -->
    <DbList />
    <!-- <DbList
        v-if="ready"
        :min="rowNumber"
        :max="viewList.length"
        :range="displayedRange"
        :lastRow="lastDisplayedRow"
        :selectedNumber="selectedNumber"
        @setLastRow="setLastDisplayedRow"
        @incrementLastRow="incrementLastDisplayedRow"
        :select="select"
    /> -->
</template>

