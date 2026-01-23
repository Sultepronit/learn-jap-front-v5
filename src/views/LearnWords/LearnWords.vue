<script setup>
import { watch } from 'vue';
import { startSession, ready } from './services/data.js';
import { nextCycle, ended } from './utils/cycle.js';
import { removeSession } from './services/backup';
import LessonStats from './components/LessonStats.vue';
import CardDisplay from './components/CardDisplay.vue';
import NavigateButtons from './components/NavigateButtons.vue';
import SpeakMute from './components/SpeakMute.vue';
import ResetButton from '@/components/ResetButton.vue';
import HappyEnd from '@/components/HappyEnd.vue';

document.title = 'Learn Jap Words';

startSession();
watch(ready, (val) => {
  if (!val) return;
  nextCycle();
});

// if (ready.value) { // in case of switching between views
//   nextCycle();
// }

</script>

<template>
  <template v-if="ready">
    <LessonStats />
    <template v-if="!ended">
      <SpeakMute />
      <CardDisplay />  
      <ResetButton :removeSession="removeSession" />
      <NavigateButtons />
    </template>
    <HappyEnd v-else />
  </template>
</template>

<style scoped>

</style>