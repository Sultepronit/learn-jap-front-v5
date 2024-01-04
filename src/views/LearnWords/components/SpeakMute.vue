<script setup>
import playAudio from '../utils/playAudio.js';
import { isMute } from '../utils/playAudio.js';

// const isMute = ref(false);
function mute() {
    isMute.value = true;
}
function speak() {
    isMute.value = false;
    playAudio();
}
</script>

<template>
    <p v-show="!isMute" @click="mute">🔊</p>
    <p v-show="isMute" @click="speak">🔇</p>
</template>

<style scoped>
p {
    float: right;
    padding-inline: 1rem;
    font-size: 1.5rem;
}
</style>