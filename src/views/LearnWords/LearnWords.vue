<script setup>
import { watch } from 'vue';
import { startSession, ready } from './services/data.js';
import { nextCycle, ended } from './utils/cycle.js';

import LessonStats from './components/LessonStats.vue';
import CardDisplay from './components/CardDisplay.vue';
import NavigateButtons from './components/NavigateButtons.vue';
import HappyEnd from './components/HappyEnd.vue';
import ResetButton from './components/ResetButton.vue';
import SpeakMute from './components/SpeakMute.vue';

document.title = 'Learn Jap Words';

startSession();
watch(ready, () => {
  nextCycle();
});

</script>

<template>
  <template v-if="ready">
    <LessonStats />
    <template v-if="!ended">
      <SpeakMute />
      <CardDisplay />  
      <ResetButton />
      <NavigateButtons />
    </template>
    <HappyEnd v-else />
  </template>
</template>

<style scoped>

</style>