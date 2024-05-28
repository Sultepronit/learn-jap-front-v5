<script setup>
import { status } from '@/utils/statusBarControl.js';
</script>

<template>
    <div id="status-bar" :class="status" />
</template>

<style scoped>
#status-bar {
    width: 100%;
    height: 5px;
    /* background: yellow; */
}
.loading {
    background: yellow;
}
.failed {
    background: red;
}
</style>