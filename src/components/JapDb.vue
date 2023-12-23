<script setup>
import { computed, ref } from 'vue';
import startSession from '@/JapDb/startSession';
import DbList from './DbList.vue';
import EditSelected from './EditSelected.vue';

// const db = ref(Array(1000).fill({ id: 1}));
const db = ref([]);
const ready = ref(false);
const topPartIsReady = ref(false);
startSession().then((data) => {
    db.value = data;
    ready.value = true;

    setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight);
    }, 50);
    setTimeout(() => {
        topPartIsReady.value = true;
    }, 500);
});

const selectedId = ref(-1);
const selectedCard = ref({});
function select(id) {
    selectedId.value = id;
    selectedCard.value = db.value[id - 1];
    console.log(id);
    console.log(selectedCard.value);
}

// console.log(db.value);
</script>

<template>
    <EditSelected
        :card="selectedCard"
    />
    <DbList
        v-if="ready"
        :db="db"
        :select="select"
        :selectedId="selectedId"
    />
    
</template>

