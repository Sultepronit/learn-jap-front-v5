<script setup>
import { computed, ref } from 'vue';
import startSession from '@/JapDb/startSession';
import patch from '@/api/patch.js';
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

function update(event, field) {
    console.log(field);
    console.log(event.target.value);
    if(selectedCard.value[field] !== event.target.value) {
        console.log('saving...');
        const data = {
            id: selectedId.value,
            changes: {}
        }
        data.changes[field] = event.target.value;
        event.target.style.color = 'red';
        patch(data).then((success) => {
            if(success) {
                selectedCard.value[field] = event.target.value;
                event.target.style.color = 'black';
            }
            // console.log(event.target);
            // console.log(event.target.style);
            // console.log(event.target.style.color);
        });
    } else {
        console.log('nothing new...');
    }
}

// console.log(db.value);
</script>

<template>
    <EditSelected
        :card="selectedCard"
        :update="update"
    />
    <DbList
        v-if="ready"
        :db="db"
        :select="select"
        :selectedId="selectedId"
    />
    
</template>

