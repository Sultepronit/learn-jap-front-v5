<script setup>
import { marks } from '../utils/enums';
import { params } from '../utils/buttonsControls.js';
</script>

<template>
<footer>
    <button
        class="good"
        v-show="params.show.good"
        @click="params.action(marks.GOOD)"
    />
    <button
        v-show="params.show.pass"
        @click="params.action(marks.NEUTRAL)"
    />
    <button
        class="return"
        v-show="params.show.retry"
        @click="params.action(marks.RETURN)"
        :style="{ flexGrow: params.retryWidth }"
    />
    <button
        class="bad"
        v-show="params.show.bad"
        @click="params.action(marks.BAD)"
        :style="{ flexGrow: (12 - params.retryWidth) }"
    />
</footer>
</template>

<style scoped>
footer {
    display: flex;
    position: fixed;
    background: white;
    bottom: 0;
    padding: 0.4rem 0 0.5rem;
    width: 100%;
    gap: 1rem;
    padding-inline: 0.5rem;
}
footer button {
    flex-grow: 6;
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
