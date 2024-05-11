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
        class="return"
        v-show="params.showReturn"
        @click="params.action(marks.RETURN)"
    />
    <button
        class="bad"
        v-show="params.showSides"
        @click="params.action(marks.BAD)"
    />
    <!-- <button
        class="reset"
        v-show="params.showReset"
        @click="params.action(marks.RESET)"
    /> -->
</footer>
</template>

<style scoped>
footer {
    display: flex;
    position: fixed;
    /* bottom: 0.5rem; */
    bottom: 0;
    padding: 0.4rem 0 0.5rem;
    width: 100%;
    gap: 1rem;
    padding-inline: 0.5rem;
}
footer button {
    flex-grow: 1;
    height: 4.5rem;
    margin-bottom: 1rem;
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

/*.reset {
    background: black;
}*/
.return {
    background: yellow;
}
</style>
