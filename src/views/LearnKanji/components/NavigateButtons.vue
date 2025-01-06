<script setup>
import { marks } from '../utils/enums';
import { params } from '../utils/buttonsControls.js';

</script>

<template>
    <button
        class="nav-b best"
        v-show="params.show.best"
        @click="params.action(marks.BEST)"
    />
    <button
        class="nav-b good"
        v-show="params.show.good"
        @click="params.action(marks.GOOD)"
    />
    <button
        class="nav-b"
        v-show="params.show.pass"
        @click="params.action(marks.NEUTRAL)"
    />
    <button
        class="nav-b return"
        v-show="params.show.retry"
        @click="params.action(marks.RETURN)"
    />
    <button
        class="nav-b bad"
        v-show="params.show.bad"
        @click="params.action(marks.BAD)"
    />
</template>

<style scoped>
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
.return {
    background: yellow;
}
.bad {
    background: red;
}
</style>
