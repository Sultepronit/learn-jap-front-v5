<script setup>
import { marks } from '../utils/enums';
// defineProps(['params']);
import { params } from '../utils/buttonsControls.js';
</script>

<template>
<footer>
    <button
        class="good"
        v-show="params.showSides"
        @click="params.action(marks.GOOD)"
    />
    <button
        v-show="params.showCentral"
        @click="params.action(marks.NEUTRAL)"
    />
    <button
        class="bad"
        v-show="params.showSides"
        @click="params.action(marks.BAD)"
    />
</footer>
</template>

<style scoped>
footer {
    display: flex;
    position: fixed;
    bottom: 0.5rem;
    width: 100%;
    gap: 1rem;
    padding-inline: 0.5rem;
}
footer button {
    flex-grow: 1;
    height: 4rem;
    /* margin: 0.2rem; */
    border-radius: 1rem;
    border: none;
    background: gray;
}

.good {
    background: green;
}

.bad {
    background: red;
}
</style>
