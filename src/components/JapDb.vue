<script setup>
import { ref } from 'vue';
import startSession from '@/JapDb/startSession';
import patch from '@/api/patch.js';
import post from '@/api/post.js';
import DbList from './DbList.vue';
import EditSelected from './EditSelected.vue';

// const db = ref([]);
let db = ref([]);
const ready = ref(false);
const selectedId = ref(-1);
const selectedCard = ref({});
startSession().then((data) => {
    // const newCards = Array(20).fill({id: -1});
    // db.value = [...data, ...newCards];
    db.value = data;
    // selectedId.value = data.length;
    select(data.length);
    ready.value = true;
});

function select(id) {
    console.log(id);
    selectedId.value = id;
    // if(id < 0) {
    //     selectedCard.value = {};
    //     return;
    // }
    selectedCard.value = db.value[id - 1];
    console.log(selectedCard.value);
}

const isSaving = ref(false);
function update(event, field, toggle) {
    console.log('saving...');

    const newVal = toggle ? Number(!selectedCard.value[field])
        : event.target.value;

    console.log(field, ': ', newVal);

    isSaving.value = true;
    selectedCard.value[field] = newVal;
    const data = {
        id: selectedId.value,
        changes: {}
    }
    data.changes[field] = newVal;

    patch(data).then((success) => {
        if(success) {
            isSaving.value = false;
        } else {
            // add possibility to try and save again
        }
    });
}

async function createNewCard() {
    console.log('creating...');
    ready.value = false;
    const newCard = await post();
    console.log(db.value.length);
    setTimeout(() => {
        ready.value = true;
    }, 100);
    // const newCard = {id: db.value.length + 1};
    console.log(newCard);
    
    db.value.push(newCard);
    console.log(db.value);
    // db.value = [...db.value, newCard];
    // db.value.push(...[newCard]);
    // db = ref([...db.value, newCard]);
    select(newCard.id);
    // ready.value = true;
}
</script>

<template>
    <EditSelected
        :select="select"
        :createNewCard="createNewCard"
        :card="selectedCard"
        :update="update"
        :isSaving="isSaving"
    />
    <DbList
        v-if="ready"
        :db="db"
        :select="select"
        :selectedId="selectedId"
    />
    
</template>

