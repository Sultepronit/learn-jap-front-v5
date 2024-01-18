<script setup>
import { card } from '../utils/cycle.js';
import WordCard from './WordCard.vue';
</script>

<template>
    <h1>{{ card.kanji }}</h1>
    <div class="word-list">
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