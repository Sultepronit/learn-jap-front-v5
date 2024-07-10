<script setup>
import { ref, watch, reactive } from 'vue';
import { db } from '../services/crud';
// import { selectedNumber, select, /*sortViewList*/ } from '../utils/displayAndSelect';
import { searchText, searchInStats } from '../utils/searchAndFilter.js';
import statsTitles from '../utils/statsTitles.js';

const props = defineProps(
    ['selectedNumber', 'select', 'setSortOptions', 'setFilterStatsOptions']
);

const titles = ['learnStatus', ...statsTitles];
const sortTitles = ['cardNumber', ...titles];

const searchInTranslation = ref(false);
const searchQuery = ref('');

// const filterColumn = ref('');
// const filterValue = ref('');
const filter = reactive({
    column: '',
    query: ''
});

watch(filter, () => {
    console.log(filter);
    
    if(!filter.column) return;
    // searchInStats(filter.query, filter.column);
    props.setFilterStatsOptions(filter);
});

const sort = reactive({
    column: '',
    reverse: false
});

watch(sort, () => {
    console.log(sort);
    if(!sort.column) return;
    props.setSortOptions(sort);
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

        <span class="space"></span>
        
        <input
            class="filter-input"
            type="text"
            v-model="filter.query"
        >
        <select v-model="filter.column">
            <option
                v-for="title in titles"
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
            >
                {{ title }}
            </option>
        </select>

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
button.sort {
    width: 1em;
}
</style>