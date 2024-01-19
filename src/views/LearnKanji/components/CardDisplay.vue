<script setup>
import { ref, watch, watchEffect } from 'vue';
import { card, showAnswer } from '../utils/cycle.js';
import WordCard from './WordCard.vue';

const readings = ref(null);
const wordList = ref(null);
// console.log(readings);
// console.log(readings.value);
// watch(card, () => {
watch(showAnswer, (val) => {
    if(!val) return;
    setTimeout(() => {
        // console.log(readings.value);
        // console.log(window.getComputedStyle(readings.value).getPropertyValue('height'));        
        const readingsHeight = window
            .getComputedStyle(readings.value)
            .getPropertyValue('height');
        console.log(readingsHeight);

        wordList.value.style.height = `calc(100vh - 15rem - ${readingsHeight})`;
        // console.log(wordList.value);
        // console.log(wordList.value.style);
        console.log(wordList.value.style.height);

    }, 10);
    // console.log(readings);
    // console.log(readings.value);
    // console.log(window.getComputedStyle(readings.value).getPropertyValue('height'));
});
// watchEffect(() => {
//     console.log(readings);
//     console.log(readings.value);
//     // console.log(window?.getComputedStyle(readings.value)?.getPropertyValue('height'));
// });
</script>

<template>
    <p class="the-kanji">{{ card.kanji }}</p>

    <p
        class="readings"
        v-show="showAnswer"
        ref="readings"
    >
        {{ card.readings }}
    </p>

    <div class="word-list" v-show="showAnswer" ref="wordList">
        <WordCard
            v-for="item in card.wordList"
            :key="item.articleNumber"
            :article="item.article"
            :number="item.articleNumber"
        />
        <br>
        <WordCard
            v-for="item in card.otherList"
            :key="item.articleNumber"
            :article="item.article"
            :number="item.articleNumber"
            :additional="true"
        />
    </div>
</template>

<style scoped>
.the-kanji {
    font-size: 4rem;
    text-align: center;
}
.readings {
    text-align: center;
    font-size: 1.7rem;
    color: blue;
}
.word-list {
    margin-bottom: 7rem;
    overflow: auto;
}
</style>