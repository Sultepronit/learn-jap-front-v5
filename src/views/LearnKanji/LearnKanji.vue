<script setup>
import { watch } from 'vue';
import { startSession, ready } from './services/data.js';
import { nextCycle, ended } from './utils/cycle.js';
import CardDisplay from './components/CardDisplay.vue';
import NavigateButtons from './components/NavigateButtons.vue';
import StatsDisplay from './components/StatsDisplay.vue';
import ResetButton from '@/components/ResetButton.vue';
import HappyEnd from '@/components/HappyEnd.vue';

document.title = 'Learn Kanji';

startSession();
watch(ready, () => {
    nextCycle();
});
</script>

<template>
    <template v-if="ready">
        <StatsDisplay />
        <template v-if="!ended">
            <CardDisplay />
            <ResetButton />
            <NavigateButtons />
        </template>
        <HappyEnd v-else />
    </template>
</template>