<script setup>
import { watch } from 'vue';
import { startSession, ready } from './services/data.js';
import { nextCycle } from './utils/cycle.js';
import CardDisplay from './components/CardDisplay.vue';
import NavigateButtons from './components/NavigateButtons.vue';
import StatsDisplay from './components/StatsDisplay.vue';

document.title = 'Learn Kanji';

startSession();
watch(ready, () => {
    nextCycle();
});
</script>

<template>
    <template v-if="ready">
        <StatsDisplay />
        <CardDisplay />
        <NavigateButtons />
    </template>
</template>