<script setup>
import { startSession } from './services/crud';
import EditSelected from './components/EditSelected.vue';
import SearchBar from './components/SearchBar.vue';
import DbList from './components/DbList.vue';

document.title = 'Japanese words DB';

startSession();
</script>

<template>
    <p>go</p>
    <EditSelected />
    <SearchBar />
    <DbList />
</template>

@/Views/WordsDb/services/crud