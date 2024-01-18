<script setup>
import { watch } from 'vue';
import { startSession, ready } from './services/data.js';
import { nextCycle } from './utils/cycle.js';
import CardDisplay from './components/CardDisplay.vue';

document.title = 'Learn Kanji';

startSession();
watch(ready, () => {
    nextCycle();
});
</script>

<template>
    <template v-if="ready">
        <h1>Hello there!</h1>
        <CardDisplay />
    </template>
</template>