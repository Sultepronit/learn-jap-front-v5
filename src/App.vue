<script setup>
import { ref, computed } from 'vue';
import StatusBar from '@/components/StatusBar.vue';
import StartMenu from './views/StartMenu/StartMenu.vue';
import WordsDb from './views/WordsDb/WordsDb.vue';
import LearnWords from './views/LearnWords/LearnWords.vue';
import LearnKanji from './views/LearnKanji/LearnKanji.vue';
import CollectKanji from './views/CollectKanji/CollectKanji.vue';
import CollectedKanjiDb from './views/CollectedKanjiDb/CollectedKanjiDb.vue';


const routes = {
    '#/jap-tap': LearnWords,
    '#/kanji-tap': LearnKanji,
    '#/words-db': WordsDb,
    '#/collect-kanji': CollectKanji,
    '#/kanji-db': CollectedKanjiDb
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
    <StatusBar />
    <component :is="currentView" />     
</template>