<script setup>
import { ref } from 'vue';
import startSession from './startSession';
import nextCard from './nextCard';
import { directions, learnStages } from './enums';
// import initCycle from '@/initCycle.js';
// import { initStandardCycle } from './standardCycle.js';
import LessonStats from './components/LessonStats.vue';
import MainView from './components/MainView.vue';
import NavigateButtons from './components/NavigateButtons.vue';

const plan = {};
const lists = {};
const progress = ref({
  cardPassed: 0
});
const card = ref({});
const show = ref({});
const buttons = ref({});

const started = ref(false);
startSession().then((data) => {
  console.log(data);
  Object.assign(plan, data.consts);
  Object.assign(lists, data.lists);

  started.value = true;
  // initCycle(progress, lists, card, show, buttons);
  nextCycle();
});

function newDisplay() {
  show.value = {
    writing: false,
    reading: false,
    translation: false,
    answer: false
  }

  buttons.value = {
    showCentral: true,
    showSides: false,
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

function nextCycle() {
  newDisplay();

  progress.value.cardPassed++;

  card.value = nextCard(lists);

  // autorepeat
  if(card.value[`${card.value.direction}AutoRepeat`]) {
    autorepeat();
    return;
  }

  // recognition
  if(card.value.learnStage === learnStages.RECOGNIZE) {
    askToRecognize();
    return;
  }

  // learn/confrim/repeat
  showStandardQuestion();
}

// learn/confrim/repeat
function showStandardQuestion() {
  if(card.value.direction === directions.FORWARD) {
    show.value.writing = true;
    buttons.value.action = showReading;
  } else {
    show.value.translation = true;
    buttons.value.action = showStandardAnswer;
  }
}

function showReading() {
  show.value.reading = true;

  buttons.value.action = quickRecognition;
  buttons.value.showSides = true;
  if(card.value.learnStage === learnStages.LEARN) {
    buttons.value.showCentral = false;
  }
}

function quickRecognition(mark) {
  showStandardAnswer();
  card.value.recogMark = mark;
}

function showStandardAnswer() {
  showAnswer();
  buttons.value.action = evaluateAndSave; 
  buttons.value.showSides = true;
  if(card.value.learnStage === learnStages.LEARN) {
    buttons.value.showCentral = false;
  }
}

// recognition
function askToRecognize() {
  show.value.writing = true;
  card.value.recogMark = {name: 'question'};
  buttons.value.action = showRecognitionAnswer;
}

function showRecognitionAnswer() {
  showAnswer();
  buttons.value.action = evaluateAndSave; 
  buttons.value.showSides = true;
  buttons.value.showCentral = false;
}

// autorepeat
function autorepeat() {
  showAnswer();  
  // change & save
  card.value.autorepeated = true; // adds black border
  buttons.value.action = nextCycle; 
}

// common
function evaluateAndSave(mark) {
  console.log(mark);
  // evaluate
  // save
  nextCycle();
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
