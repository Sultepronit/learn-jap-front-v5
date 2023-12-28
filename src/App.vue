<script setup>
import { ref, computed } from 'vue';
import StartMenu from './StartMenu.vue';
import JapTap from './JapTap.vue';
import JapDb from './components/JapDb.vue';

const routes = {
    '#/jap-tap': JapTap,
    '#/jap-db': JapDb
};

const currentPath = ref(window.location.hash);
window.addEventListener('hashchange', () => {
    currentPath.value = window.location.hash;
});

const currentView = computed(() => {
    return routes[currentPath.value] || StartMenu;
});
</script>

<template>
    <component :is="currentView" />     
</template>