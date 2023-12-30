<script setup>
import { watch } from 'vue';
import { startSession, ready } from './services/data.js';
import { nextCycle } from './utils/cycle.js';

import LessonStats from './components/LessonStats.vue';
import CardDisplay from './components/CardDisplay.vue';
import NavigateButtons from './components/NavigateButtons.vue';

startSession();
watch(ready, () => {
  console.log('here we go!');
  nextCycle();
});

</script>

<template>
  <template v-if="ready">
    <LessonStats />
    <CardDisplay />  
    <NavigateButtons />
  </template>
</template>

<style scoped>

</style>