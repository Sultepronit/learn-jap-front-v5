<script setup>
defineProps(['setFindTextOptions']);
</script>

<template>
    <input
        type="text"
        class="search-kanji"
        @input="setFindTextOptions({ query: $event.target.value })"
    >
</template>

<style scoped>
.search-kanji {
    width: 2em;
}
</style>