<script setup>
import { startSession, ready } from './services/crud';
import EditSelected from './components/EditSelected.vue';
import SearchBar from './components/SearchBar.vue';
import DbList from './components/DbList.vue';

document.title = 'Japanese words DB';

startSession();
console.log('ready?');
</script>

<template>
    <template v-if="ready">
        <!-- <EditSelected /> -->
        <SearchBar />
        <DbList />
    </template>
</template>