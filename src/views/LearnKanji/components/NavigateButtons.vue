<script setup>
import { marks } from '../utils/enums';
import { params } from '../utils/buttonsControls.js';

</script>

<template>
    <button
        class="nav-b best"
        v-show="params.showBest"
        @click="params.action(marks.BEST)"
    />
    <button
        class="nav-b good"
        v-show="params.showSides"
        @click="params.action(marks.GOOD)"
    />
    <button
        class="nav-b"
        @click="params.action(marks.NEUTRAL)"
    />
    <button
        class="nav-b bad"
        v-show="params.showSides"
        @click="params.action(marks.BAD)"
    />
</template>

<style scoped>
/* footer {
    background: white;
    display: flex;
    padding: 0.6rem 0 1rem;
    width: 100%;
    gap: 1rem;
    padding-inline: 0.5rem;
}
footer button {
    flex-grow: 1;
    height: 4.5rem;
    border-radius: 1rem;
    border: none;
    background: gray;
} */
.nav-b {
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
