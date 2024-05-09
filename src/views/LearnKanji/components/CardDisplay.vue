<script setup>
import { ref, watch } from 'vue';
import { card, showAnswer } from '../utils/cycle.js';
import WordCard from './WordCard.vue';

const wordList = ref(null);
const font = ref();
randomFont();

function randomFont() {
    font.value = Math.floor(Math.random() * 3);
    console.log(font.value);
}

watch(showAnswer, (val) => {
    if(!val) return;
    randomFont();

    setTimeout(() => {
        wordList.value.scrollTop = 0;
    }, 10);
});
</script>

<template>
    <p class="the-kanji">
        <span class="sans" v-show="showAnswer || font === 0">{{ card.kanji }}</span>
        <span class="serif" v-show="showAnswer || font === 1">{{ card.kanji }}</span>
        <span class="maru" v-show="showAnswer || font === 2">{{ card.kanji }}</span>
        <span class="kurenaido" v-show="showAnswer">{{ card.kanji }}</span>
    </p>

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
.sans {
	font-family: 'Noto Sans JP', sans-serif;
}
.serif {
	font-family: 'Noto Serif JP', serif;
}
.kurenaido {
	font-family: 'Zen Kurenaido', sans-serif;
}
.maru {
	font-family: 'Zen Maru Gothic', sans-serif;
}

.the-kanji {
    font-size: 4rem;
    text-align: center;
    margin-bottom: -0.5rem;
}

.the-kanji span {
    padding-inline: 0.1em;
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