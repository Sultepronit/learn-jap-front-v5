<script setup>
import { ref, computed } from 'vue';
import StartMenu from './Views/StartMenu/StartMenu.vue';
import WordsDb from './Views/WordsDb/WordsDb.vue';
import JapTap from './JapTap.vue';


const routes = {
    '#/jap-tap': JapTap,
    '#/words-db': WordsDb
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