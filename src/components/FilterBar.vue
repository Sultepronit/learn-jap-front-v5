<script setup>
defineProps(['selectedNumber', 'select', 'lastCardNumber']);
const emit = defineEmits(['search']);
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
        @input="emit('search', 'writings', $event.target.value)"
    >
</template>

<style scoped>
input {
    font-size: 1.5rem;
}
</style>