<script setup>
import { isDisplayed } from '@/utils/resetButtonDisplay.js';
const { removeSession } = defineProps(['removeSession']);

function reset() {
    // localStorage.clear();
    removeSession();
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
    width: min-content;
}
</style>