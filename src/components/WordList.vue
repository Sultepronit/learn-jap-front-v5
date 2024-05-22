<script setup>
import WordListCard from './WordListCard.vue';
defineProps(['card']);
</script>

<template>
    <WordListCard
        v-for="item in card?.wordList"
        :key="item.articleNumber"
        :article="item.article"
        :number="item.articleNumber"
    />
    <br>
    <WordListCard
        v-for="item in card?.otherList"
        :key="item.articleNumber"
        :article="item.article"
        :number="item.articleNumber"
        :additional="true"
    />
</template>