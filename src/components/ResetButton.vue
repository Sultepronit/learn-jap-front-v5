<script setup>
import { isDisplayed } from '../utils/resetButtonDisplay.js';

function reset() {
    localStorage.clear();
    // localStorage.removeItem
    location.reload();
}
</script>

<template>
    <p class="the-button" @click="reset" v-if="isDisplayed">↻</p>
</template>

<style scoped>
.the-button {
    font-size: 3rem;
    color: red;
}
</style>