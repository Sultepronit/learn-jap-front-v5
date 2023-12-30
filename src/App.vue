<script setup>
import { ref, computed } from 'vue';
import StartMenu from './views/StartMenu/StartMenu.vue';
import WordsDb from './views/WordsDb/WordsDb.vue';
import LearnWords from './views/LearnWords/LearnWords.vue';


const routes = {
    '#/jap-tap': LearnWords,
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