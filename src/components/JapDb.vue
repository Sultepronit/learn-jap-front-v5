<script setup>
import { okYouCanStart } from '@/JapDb/crud';
import EditSelected from './EditSelected.vue';
import SearchBar from './SearchBar.vue';
import DbList from './DbList.vue';

console.timeLog('tt', 'in the main component!');

document.title = 'Japanese words DB';

okYouCanStart();
</script>

<template>
    <EditSelected />
    <SearchBar />
    <DbList />
</template>

