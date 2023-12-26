<script setup>
import { ref, computed } from 'vue';
import startSession from '@/JapDb/startSession';
import patch from '@/api/patch.js';
import post from '@/api/post.js';
import deleteAPI from '@/api/deleteAPI.js';
import EditSelected from './EditSelected.vue';
import FilterBar from './FilterBar.vue';
import DbList from './DbList.vue';

const db = ref([]);
const ready = ref(false);

startSession().then((data) => {
    db.value = data;

    select(data.length);
    setLastDisplayedRow(data.length);
    ready.value = true;
});

const rowNumber = 18;
const lastDisplayedRow = ref(0);
function setLastDisplayedRow(newVal) {
    if(newVal < rowNumber) {
        newVal = rowNumber;
    } else if(newVal >= db.value.length) {
        newVal = db.value.length;
    }
    lastDisplayedRow.value = newVal; 
    // console.log(lastDisplayedRow.value);
}

function incrementLastDisplayedRow(delta) {
    setLastDisplayedRow(Number(lastDisplayedRow.value) + delta);
}

const displayedRange = computed(() => {
    return db.value.slice(
        (lastDisplayedRow.value - rowNumber),
        lastDisplayedRow.value
    );
});

const selectedNumber = ref(0);
const selectedCard = ref({});

function select(cardNumber, changeDisplay) {
    cardNumber = Math.round(cardNumber);
    // console.log(cardNumber);
    if(cardNumber < 1 || cardNumber > db.value.length) {
        return;
    }
    selectedNumber.value = cardNumber;
    selectedCard.value = db.value[cardNumber - 1];
    console.log(selectedCard.value);
    if(changeDisplay) {
        setLastDisplayedRow(cardNumber + rowNumber - 1);
    }
}

const isSaving = ref(false);
const editedCard = ref({});

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
    try {
        isSaving.value = true;
        const newCard = await post(db.value.length + 1);
        db.value.push(newCard);
        select(newCard.cardNumber, true);

        // console.log(db.value);
        // console.log(newCard);
        isSaving.value = false;
    } catch(e) {
        console.error(e);
    }
}

async function deleteCard() {
    const confirmation = confirm(`Do you confrim deleating this card?`);
    if(!confirmation) {
        return;
    }
    isSaving.value = true;
    try {
        const success = await deleteAPI(selectedCard.value.id);
        if(success) {
            location.reload();
            isSaving.value = false;
        } else {
            alert('Not deleted!');
        }
    } catch(e) {
        console.error(e);
        alert('Error!');
    }
}
</script>

<template>
    <EditSelected
        :card="selectedCard"
        :isSaving="isSaving"
        :update="update"
        :createNewCard="createNewCard"
        @deleteCard="deleteCard"
    />
    <FilterBar
        :selectedNumber="selectedNumber"
        :lastCardNumber="db.length"
        :select="select"
    />
    <DbList
        v-if="ready"
        :min="rowNumber"
        :max="db.length"
        :range="displayedRange"
        :lastRow="lastDisplayedRow"
        :selectedNumber="selectedNumber"
        @setLastRow="setLastDisplayedRow"
        @incrementLastRow="incrementLastDisplayedRow"
        :select="select"
    />
    
</template>

