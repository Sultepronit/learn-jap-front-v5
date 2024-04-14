<script setup>
import { ref, watch } from 'vue';
import { card, showAnswer } from '../utils/cycle.js';
import WordCard from './WordCard.vue';

// const readings = ref(null);
const wordList = ref(null);
// const readingsHeight = ref('*');
// const windowHeight = window.innerHeight;

// watch(showAnswer, (val) => {
//     if(!val) return;
//     setTimeout(() => {
//         readingsHeight.value = window.getComputedStyle(readings.value).height;

//         wordList.value.scrollTop = 0;
//     }, 10);
// });

watch(showAnswer, (val) => {
    if(!val) return;
    setTimeout(() => {
        wordList.value.scrollTop = 0;
    }, 10);
});

// watch(readingsHeight, () => {
//     wordList.value.style.height
//         = `calc(${windowHeight}px - 14.3rem - ${readingsHeight.value})`;
//     // console.log(wordList.value.style.height);
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
    margin-bottom: -0.5rem;
}
.readings {
    text-align: center;
    font-size: 1.7rem;
    color: blue;
}
.word-list {
    overflow: auto;
}
</style>