<script setup>
import { ref } from 'vue';
// defineProps(['selectedNumber', 'select', 'lastCardNumber']);
import { db } from '../services/crud';
import { selectedNumber, select } from '../utils/displayAndSelect';
// const emit = defineEmits(['search']);
import { searchText } from '../utils/searchAndFilter.js';

const searchInTranslation = ref(false);
const query = ref('');
</script>

<template>
    <input
        type="number"
        min="1"
        :max="db.length"
        :value="selectedNumber"
        @input="select($event.target.value, true)"
    >
    <span>***</span>
    <input
        type="text"
        v-model="query"
        @input="searchText(query, searchInTranslation)"
    >
    <label for="translation">
        <input
            type="checkbox"
            name="translation"
            v-model="searchInTranslation"
            @change="searchText(query, searchInTranslation)"
        >
        Translation
    </label>
</template>

<style scoped>
input {
    font-size: 1.5rem;
}
</style>@/Views/WordsDb/utils/displayAndSelect@/Views/WordsDb/utils/searchAndFilter.js@/Views/WordsDb/services/crud