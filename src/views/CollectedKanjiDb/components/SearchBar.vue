<script setup>
import { ref, watchEffect } from 'vue';
import { db } from '../services/crud';
import { selectedNumber, select } from '../utils/displayAndSelect';
import { searchText, searchInStats } from '../utils/searchAndFilter.js';
import statsTitles from '../utils/statsTitles.js';

const titles = ['learnStatus', ...statsTitles];

const searchInTranslation = ref(false);
const searchQuery = ref('');

const filterColumn = ref('');
const filterValue = ref('');

watchEffect(() => {
    console.log(filterColumn.value);
    console.log(filterValue.value);
    
    if(!filterColumn.value) return;
    searchInStats(filterValue.value, filterColumn.value);
});
</script>

<template>
    <div class="the-bar">
        <input
            class="cardNumber"
            type="number"
            min="1"
            :max="db.length"
            :value="selectedNumber"
            @input="select($event.target.value, true)"
        >
        
        <input
            class="filter-input"
            type="text"
            v-model="filterValue"
        >
        <select v-model="filterColumn">
            <option
                v-for="title in titles"
                :key="title"
                :value="title"
            >{{ title }}</option>
        </select>

        <input
            type="text"
            v-model="searchQuery"
            @input="searchText(searchQuery, searchInTranslation)"
        >
        <label for="translation">
            <input
                type="checkbox"
                name="translation"
                v-model="searchInTranslation"
                @change="searchText(searchQuery, searchInTranslation)"
            >
            Translation
        </label>
    </div>
</template>

<style scoped>
* {
    font-size: 1.2rem;
    margin: 1px;
}
.the-bar {
    margin-top: 5px;
}
input {
    padding-inline: 0.2em;
}
.cardNumber {
    width: 4em;
}

.filter-input {
    width: 9em;
}
</style>