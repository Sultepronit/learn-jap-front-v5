<script setup>
import { ref } from 'vue';
import { get } from '@/services/commonAPI.js';

const results = ref(null);
get('/session/collect-kanji').then(data => results.value = data);
</script>

<template>
    <p>updated: {{ results?.updated.length }}</p>
    <p>
        <span v-for="kanji in results?.updated" :key="kanji">
            {{ kanji }}&nbsp;
        </span>
    </p>
    <p>created: {{ results?.created.length }}</p>
    <p>
        <span v-for="kanji in results?.created" :key="kanji">
            {{ kanji }}&nbsp;
        </span>
    </p>
</template>

<style scoped>
* {
    font-size: 2rem;
}
</style>