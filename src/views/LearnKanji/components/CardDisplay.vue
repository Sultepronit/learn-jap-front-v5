<script setup>
import { card, showAnswer } from '../utils/cycle.js';
import WordCard from './WordCard.vue';
</script>

<template>
    <p class="the-kanji">{{ card.kanji }}</p>
    <p class="readings">{{  card.readings }}</p>
    <div class="word-list" v-show="showAnswer">
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

<style>
.the-kanji {
    font-size: 3.5rem;
    text-align: center;
}
.readings {
    text-align: center;
    font-size: 2rem;
}
.word-list {
    margin-bottom: 7rem;
}
</style>