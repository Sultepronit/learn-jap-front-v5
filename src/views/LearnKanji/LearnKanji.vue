<script setup>
import { watch } from 'vue';
import { startSession, ready } from './services/data.js';
import { nextCycle, ended } from './utils/cycle.js';
import CardDisplay from './components/CardDisplay.vue';
import NavigateButtons from './components/NavigateButtons.vue';
import StatsDisplay from './components/StatsDisplay.vue';
import ResetButton from '@/components/ResetButton.vue';
import HappyEnd from '@/components/HappyEnd.vue';

document.title = 'Learn Kanji';

startSession();
watch(ready, () => {
    nextCycle();
});
</script>

<template>
    <div class="display" v-if="ready">
        <header>
            <StatsDisplay />
        </header>
        <template v-if="!ended">
            <main>
                <CardDisplay />
                <ResetButton />
            </main>
            <footer>
                <NavigateButtons />
            </footer>
        </template>
        <main v-else>
            <HappyEnd />
        </main>
    </div>
</template>

<style scoped>
.display {
    height: 100vh;
    display: grid;
    /* grid-template-rows: auto auto auto 1fr; */
    grid-template-rows: auto 1fr;
}
main {
    overflow: auto;
    display: grid;
    grid-template-rows: auto auto 1fr;
}
footer {
    background: white;
    display: flex;
    /* position: fixed; */
    /* bottom: 0.5rem; */
    /* bottom: 0; */
    padding: 0.6rem 0 1rem;
    width: 100%;
    gap: 1rem;
    padding-inline: 0.5rem;
}
/* footer button {
    flex-grow: 1;
    height: 4.5rem;
    border-radius: 1rem;
    border: none;
    background: gray;
} */
</style>