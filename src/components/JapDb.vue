<script setup>
import { ref, computed } from 'vue';
import startSession from '@/JapDb/startSession';
import patch from '@/api/patch.js';
import post from '@/api/post.js';
import deleteAPI from '@/api/deleteAPI.js';
import { createNewCard, deleteCard } from '@/JapDb/c_ud.js';
import EditSelected from './EditSelected.vue';
import FilterBar from './FilterBar.vue';
import DbList from './DbList.vue';

const db = ref([]);
const viewList = ref([]);
const ready = ref(false);

const maxRowNumber = Math.round((window.innerHeight / 33) - 6);
const rowNumber = ref(maxRowNumber);

startSession().then((data) => {
    db.value = viewList.value = data;

    select(data.length);
    setLastDisplayedRow(data.length);
    ready.value = true;
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
        setLastDisplayedRow(cardNumber + rowNumber.value - 1);
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

async function createNewCard0() {
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

async function deleteCard0() {
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

function searchInWritings(row, input) {
    const writings = row.writings + row.rareWritings;
    if(writings.includes(input)) {
        return true;
    }
    const inclusiveWritings = writings.replace(/[()[\]{}]/g, '');
    if(inclusiveWritings.includes(input)) {
        return true;
    }
    const exclusiveWritings = writings.replace(/\([^)]*\)|\[[^\]]*\]|\{[^}]*\}/g, '');
    if(exclusiveWritings.includes(input)) {
        return true;
    }
}

function search(column, input) {
    rowNumber.value = maxRowNumber;
    if(!input) {
        viewList.value = db.value;
        select(selectedNumber.value, true);
        return;
    }
    // console.log(column, input);
    const filtered = db.value.filter((row) => {
        return searchInWritings(row, input);
    });
    // console.log(filtered);
    viewList.value = filtered;
    if(rowNumber.value > filtered.length) {
        rowNumber.value = filtered.length;
    }
    select(filtered[filtered.length - 1].cardNumber, true);
}

const lastDisplayedRow = ref(0);
function setLastDisplayedRow(newVal) {
    if(newVal < rowNumber.value) {
        newVal = rowNumber.value;
    } else if(newVal >= viewList.value.length) {
        newVal = viewList.value.length;
    }
    lastDisplayedRow.value = newVal; 
    // console.log(lastDisplayedRow.value);
}

function incrementLastDisplayedRow(delta) {
    setLastDisplayedRow(Number(lastDisplayedRow.value) + delta);
}

const displayedRange = computed(() => {
    // console.log(lastDisplayedRow.value, rowNumber.value);
    return viewList.value.slice(
        (lastDisplayedRow.value - rowNumber.value),
        lastDisplayedRow.value
    );
});
function useCreateNewCard() {
    createNewCard(isSaving, db, select);
}
function useDeleteCard() {
    deleteCard(isSaving, selectedCard);
}
</script>

<template>
    <EditSelected
        :card="selectedCard"
        :isSaving="isSaving"
        :update="update"
        :createNewCard="useCreateNewCard"
        @deleteCard="useDeleteCard"
    />
    <FilterBar
        :selectedNumber="selectedNumber"
        :lastCardNumber="db.length"
        :select="select"
        @search="search"
    />
    <DbList
        v-if="ready"
        :min="rowNumber"
        :max="viewList.length"
        :range="displayedRange"
        :lastRow="lastDisplayedRow"
        :selectedNumber="selectedNumber"
        @setLastRow="setLastDisplayedRow"
        @incrementLastRow="incrementLastDisplayedRow"
        :select="select"
    />
    
</template>

