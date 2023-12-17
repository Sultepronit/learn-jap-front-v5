<script setup>
const props = defineProps(['params']);
</script>

<template>
<footer>
    <button
        v-show="params.good.show"
        @click="console.log('hello there')"
    >+</button>
    <button
        v-show="params.central.show"
        @click="params.central.action()"
    >#</button>
    <button
        v-show="params.bad.show"
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
