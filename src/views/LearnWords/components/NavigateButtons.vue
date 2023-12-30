<script setup>
import { marks } from '../utils/enums';
// defineProps(['params']);
import { params } from '../utils/buttonsControls.js';
</script>

<template>
<footer>
    <button
        v-show="params.showSides"
        @click="params.action(marks.GOOD)"
    >+</button>
    <button
        v-show="params.showCentral"
        @click="params.action(marks.NEUTRAL)"
    >#</button>
    <button
        v-show="params.showSides"
        @click="params.action(marks.BAD)"
    >-</button>
</footer>
</template>

<style scoped>
footer {
    display: flex;
    position: fixed;
    bottom: 0.5rem;
    width: 100%;
    gap: 1rem;
    /* place-content: space-around; */
    /* margin-bottom: 0.2rem; */
    padding-inline: 0.5rem;
}
footer button {
    flex-grow: 1;
    height: 2rem;
    /* margin: 0.2rem; */
}
</style>
