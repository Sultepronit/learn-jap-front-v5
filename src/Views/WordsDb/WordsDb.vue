<script setup>
import { startSession } from './services/crud';
import EditSelected from './components/EditSelected.vue';
import SearchBar from './components/SearchBar.vue';
import DbList from './components/DbList.vue';

document.title = 'Japanese words DB';

startSession();
</script>

<template>
    <EditSelected />
    <SearchBar />
    <DbList />
</template>