<script setup>
import { ref } from 'vue';

const props = defineProps([
    'selectedNumber',
    'select',
    'viewListPosition',
    'viewListLength',
    'filterColumns',
    'sortColumns',
    'setSortOptions',
    'setFilterStatsOptions',
    'setFindTextOptions',
    'SearchText'
]);

const filterOptions = ref({
    column: '',
    query: ''
});

const sortOptions = ref({
    column: '',
    reverse: false
});


const sortArrow = ref('↓');
function changeSortDirection() {
    sortOptions.value.reverse = !sortOptions.value.reverse;
    sortArrow.value = sortOptions.value.reverse ? '↑' : '↓';

    props.setSortOptions(sortOptions.value);
}
</script>

<template>
<div class="the-bar">
    <input
        class="cardNumber"
        type="number"
        min="1"
        :max="viewListLength"
        :value="selectedNumber"
        @input="select($event.target.value, true)"
    >

    <span class="space"></span>

    <SearchText :setFindTextOptions=setFindTextOptions />

    <span class="space"></span>
    
    <input
        class="filter-input"
        type="text"
        v-model="filterOptions.query"
        @input="setFilterStatsOptions(filterOptions)"
    >
    <select
        v-model="filterOptions.column"
        @change="setFilterStatsOptions(filterOptions)"
    >
        <option
            v-for="title in filterColumns"
            :key="title"
            :value="title"
        >
            {{ title }}
        </option>
    </select>

    <span class="space"></span>

    <button class="sort" @click="changeSortDirection">{{ sortArrow }}</button>
    <select
        v-model="sortOptions.column"
        @change="setSortOptions(sortOptions)"
    >
        <option
            v-for="title in sortColumns"
            :key="title"
            :value="title"
        >
            {{ title }}
        </option>
    </select>

    <span class="space"></span>

    <span>{{ viewListPosition }}/{{ viewListLength }}</span>
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