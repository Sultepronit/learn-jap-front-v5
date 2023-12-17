<script setup>
import { ref } from 'vue';
import startSession from './startSession';
import nextCard from './nextCard';
import { directions } from './enums';
import LessonStats from './components/LessonStats.vue';
import MainView from './components/MainView.vue';
import NavigateButtons from './components/NavigateButtons.vue';

const plan = {};
const lists = {};
const progress = ref({
  cardPassed: 0
});
const card = ref({});
const show = ref({
    writing: false,
    reading: false,
    translation: false,
    answer: false
});
const buttons = ref({
  good: {},
  central: {},
  bad: {},
});

const started = ref(false);
startSession().then((data) => {
  console.log(data);
  Object.assign(plan, data.consts);
  Object.assign(lists, data.lists);

  started.value = true;
  showQuestion();
});

function showQuestion() {
  progress.value.cardPassed++;
  card.value = nextCard(lists);
  //  console.log(currentCard);
  buttons.value = {
    good: { show: false },
    central: { show: true },
    bad: { show: false }
  };

  show.value = {
    writing: false,
    reading: false,
    translation: false,
    answer: false
  }

  if(card.value.direction === directions.FORWARD) {
    show.value.writing = true;

    buttons.value.central.action = showReadingAndEvaluate;
  } else {
    show.value.translation = true;

    buttons.value.central.action = showAnswerAndEvaluate;
  }
}

function showReadingAndEvaluate() {
  show.value.reading = true;

  buttons.value = {
    good: { show: true },
    central: {
      show: true,
      action: showAnswerAndEvaluate
    },
    bad: { show: true }
  };
}

function showAnswer() {
  show.value = {
    writing: false,
    reading: false,
    translation: true,
    answer: true
  }
}

function showAnswerAndEvaluate() {
  showAnswer();
  // wordEvaluationButtons();
  buttons.value = {
    good: { show: true },
    central: {
      show: true,
      action: showQuestion
    },
    bad: { show: true }
  };
}


</script>

<template>
  <template v-if="started">
    <LessonStats 
      :consts="plan"
      :vars="progress"
    />
    <MainView :card="card" :show="show" />  
    <NavigateButtons :params="buttons" />
  </template>
</template>

<style scoped>

</style>
