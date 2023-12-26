<script setup>
defineProps(['selectedNumber', 'select', 'lastCardNumber']);

//@change="select"
</script>

<template>
    <input
        type="number"
        min="1"
        :max="lastCardNumber"
        :value="selectedNumber"
        @input="select($event.target.value, true)"
    >
    <span>***</span>
    <input
        type="text"
        @input="console.log($event.target.value)"
    >
</template>

<style scoped>
input {
    font-size: 1.5rem;
}
</style>