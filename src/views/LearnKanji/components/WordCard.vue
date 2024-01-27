<script setup>

defineProps(['number', 'article', 'additional']);
</script>

<template>
    <div class="block" :class="{additional}">
        <p class="number" v-html="number" />
        <p class="article" v-html="article" />
    </div>
</template>

<style>
.block {
    border: 2px solid green;
    margin: 0.1rem;
    padding: 0.2rem;
}
.additional {
    border-color: red;
}
.article {
    font-size: 1.7rem;
}
.number {
    float: right;
    /* margin: 0.3rem 0.7rem; */
}
</style>