<script setup>
import { ref } from 'vue';
import startSession from '@/JapDb/startSession';
import patch from '@/api/patch.js';
import post from '@/api/post.js';
import DbList from './DbList.vue';
import EditSelected from './EditSelected.vue';

const db = ref([]);
// let db = ref([]);
const ready = ref(false);
const selectedNumber = ref(-1);
const selectedCard = ref({});
const editedCard = ref({});

startSession().then((data) => {
    db.value = data;

    select(data.length);
    ready.value = true;
});

function select(cardNumber) {
    console.log(cardNumber);
    selectedNumber.value = cardNumber;
    selectedCard.value = db.value[cardNumber - 1];
    console.log(selectedCard.value);
}

const isSaving = ref(false);
function update(cardNumber, field, value) {
    console.log('saving...');
    isSaving.value = true;

    editedCard.value = db.value[cardNumber - 1];
    editedCard.value[field] = value;

    console.log(cardNumber, field, value);
    console.log(editedCard.value);

    const data = {
        id: editedCard.value.id,
        changes: {}
    }
    data.changes[field] = value;

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
        :selectedNumber="selectedNumber"
    />
    
</template>

