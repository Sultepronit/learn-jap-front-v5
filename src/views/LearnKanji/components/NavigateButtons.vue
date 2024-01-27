<script setup>
import { marks } from '../utils/enums';
import { params } from '../utils/buttonsControls.js';

</script>

<template>
<footer>
    <button
        class="best"
        v-show="params.showBest"
        @click="params.action(marks.BEST)"
    />
    <button
        class="good"
        v-show="params.showSides"
        @click="params.action(marks.GOOD)"
    />
    <button
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
    background: white;
    display: flex;
    position: fixed;
    /* bottom: 0.5rem; */
    bottom: 0;
    padding: 0.4rem 0 1rem;
    width: 100%;
    gap: 1rem;
    padding-inline: 0.5rem;
}
footer button {
    flex-grow: 1;
    height: 4.5rem;
    /* margin-bottom: 1rem; */
    border-radius: 1rem;
    border: none;
    background: gray;
}
.best {
    background: blue;
}
.good {
    background: green;
}
.bad {
    background: red;
}
</style>
