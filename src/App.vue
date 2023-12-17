<script setup>
import { ref } from 'vue';
import startSession from './startSession';
import StatsConponent from './components/StatsConponent.vue';

let sessionConsts = {};
const sessionVars = ref({
  cardPassed: 1
});

const start = ref(false);
startSession().then((data) => {
  console.log(data);
  sessionConsts = { ...data.consts };
  console.log(sessionConsts);
  start.value = true;
});


</script>

<template>
  <StatsConponent v-if="start"
    :consts="sessionConsts"
    :vars="sessionVars"
  />
</template>

<style scoped>

</style>
