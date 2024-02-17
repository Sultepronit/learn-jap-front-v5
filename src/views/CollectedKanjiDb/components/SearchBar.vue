<script setup>
import { ref, reactive, watch } from 'vue';
import { db } from '../services/crud';
import { selectedNumber, select, sortViewList } from '../utils/displayAndSelect';
import { searchKanji, searchInStats } from '../utils/searchAndFilter.js';
import statsTitles from '../utils/statsTitles.js';

const filter = reactive({
    column: '',
    value: ''
});

watch(filter, () => {
    // console.log(filter.column);
    // console.log(filter.value);
    
    if(!filter.column) return;
    searchInStats(filter.value, filter.column);
});

const sortTitles = ['id', ...statsTitles];

const sort = reactive({
    column: '',
    reverse: false
});

watch(sort, () => {
    // console.log(sort);
    if(!sort.column) return;
    sortViewList(sort.column, sort.reverse);
});

const sortArrow = ref('↓');
function newSortDirection() {
    sort.reverse = !sort.reverse;
    sortArrow.value = sort.reverse ? '↑' : '↓';
}
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

        <span class="space"></span>
        
        <input
            class="filter-input"
            type="text"
            v-model="filter.value"
        >
        <select v-model="filter.column">
            <option
                v-for="title in statsTitles"
                :key="title"
                :value="title"
            >{{ title }}</option>
        </select>

        <span class="space"></span>

        <button class="sort" @click="newSortDirection">{{ sortArrow }}</button>

        <select v-model="sort.column">
            <option
                v-for="title in sortTitles"
                :key="title"
                :value="title"
            >{{ title }}</option>
        </select>

        <span class="space"></span>

        <input
            type="text"
            class="search-kanji"
            @input="searchKanji($event.target.value)"
        >
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
.space {
    display: inline-block;
    width: 0.5em;
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

.search-kanji {
    width: 2em;
}

button.sort {
    width: 1em;
}
</style>