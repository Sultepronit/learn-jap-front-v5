<script setup>
import { ref, computed } from 'vue';
import StartMenu from './views/StartMenu/StartMenu.vue';
import WordsDb from './views/WordsDb/WordsDb.vue';
import LearnWords from './views/LearnWords/LearnWords.vue';
import LearnKanji from './views/LearnKanji/LearnKanji.vue';
import SelectKanji from './views/SelectKanji/SelectKanji.vue';


const routes = {
    '#/jap-tap': LearnWords,
    '#/kanji-tap': LearnKanji,
    '#/words-db': WordsDb,
    '#/select-kanji': SelectKanji
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