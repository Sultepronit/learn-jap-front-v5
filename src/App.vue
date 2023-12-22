<script setup>
import JapTap from './JapTap.vue';
import JapDb from './components/JapDb.vue';
let mode = 'jap-tap';
mode = 'jap-db';
</script>

<template>
    <JapTap v-if="mode === 'jap-tap'" />
    <JapDb v-if="mode === 'jap-db'" />
</template>