<script setup>
import { ref } from 'vue';
import startSession from './startSession';
import nextCard from './nextCard';
import LessonStats from './components/LessonStats.vue';

// let sessionConsts = {};
const sessionConsts = {};
const lists = {};
const sessionVars = ref({
  cardPassed: 1
});
const currentCard = ref({});

const show = ref(false);
startSession().then((data) => {
  console.log(data);
  // sessionConsts = { ...data.consts };
  Object.assign(sessionConsts, data.consts);
  Object.assign(lists, data.lists);
  show.value = true;

 currentCard.value = nextCard(lists);
 console.log(currentCard);
});


</script>

<template>
  <LessonStats v-if="show"
    :consts="sessionConsts"
    :vars="sessionVars"
  />
</template>

<style scoped>

</style>
