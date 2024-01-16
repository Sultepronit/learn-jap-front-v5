<script setup>
import { isSaving, createNewCard, update, deleteCard } from '../services/crud';
import { selectedCard as card, select } from '../utils/displayAndSelect';
import { searchText } from '../utils/searchAndFilter.js';
import statsTitles from '../utils/statsTitles.js';

function checkInput(value, field) {
    if(card.value.learnStatus < 0) {
        card.value[field] = value;
        searchText(value, false);
    }
}
function resetSearch() {
    if(card.value.learnStatus < 0) {
        const cn = card.value.cardNumber;
        searchText('');
        select(cn);
    }
}
// const statsTitles = ['fProgress', 'bProgress', 'fStats', 'fAutorepeat', 'bStats', 'bAutorepeat'];
</script>

<template>
    <section class="edit" :class="{'is-saving': isSaving}">
        <div class="top-line">
            <button class="new-card" @click="createNewCard">
                新しい
            </button>
            <span class="card-number">{{ card.cardNumber }}</span>
            <input
                type="number"
                class="status"
                :value="card.learnStatus"
                @change="update(
                    card.cardNumber,
                    'learnStatus',
                    Number($event.target.value)
                )"
            >
            <input
                v-for="field in statsTitles" 
                :key="field"
                type="number"
                class="stats"
                :value="card[field]"
                @change="update(
                    card.cardNumber,
                    field,
                    Number($event.target.value)
                )"
            >
            <button class="delete" @click="deleteCard(card.cardNumber)">
                消す
            </button>
        </div>
        <input
            type="text"
            class="jap-field shorter"
            :class="{'blue' : card.altWriting}"
            :value="card.writings"
            @change="update(card.cardNumber, 'writings', $event.target.value)"
            @input="checkInput($event.target.value, 'writings')"
            @blur="resetSearch"
            placeholder="言葉"
        >
        <div
            class="alt-toggle"
            :class="{'is-alt' : card.altWriting}"
            @click="update(
                card.cardNumber,
                'altWriting',
                Number(!card.altWriting)
            )"
        />
        <input
            type="text"
            class="jap-field gray"
            :value="card.rareWritings"
            @change="update(card.cardNumber, 'rareWritings', $event.target.value)"
            placeholder="言葉"
        >
        <input
            type="text"
            class="jap-field"
            :value="card.readings"
            @change="update(card.cardNumber, 'readings', $event.target.value)"
            @input="checkInput($event.target.value, 'readings')"
            @blur="resetSearch"
            placeholder="ことば"
        >
        <input
            type="text"
            class="jap-field gray"
            :value="card.rareReadings"
            @change="update(card.cardNumber, 'rareReadings', $event.target.value)"
            placeholder="ことば"
        >
        <input
            type="text"
            class="uk-field"
            :value="card.translation"
            @change="update(card.cardNumber, 'translation', $event.target.value)"
            placeholder="слово"
        >
        <input
            type="text"
            class="uk-field"
            :value="card.example"
            @change="update(card.cardNumber, 'example', $event.target.value)"
            placeholder="実例"
        >
    </section>
</template>

<style scoped>
* {
    font-size: 1.2rem;
}
.edit {
    margin: 2px;
    border: 3px solid white;
}
.is-saving {
    border-color: red;
}
.top-line {
    height: 2rem;
}
.card-number {
    font-size: 1.3rem;
    font-weight: bold;
    padding-left: 0.5em;
    padding-right: 0.5em;
}
button {
    font-size: 1.0rem;
    padding: 0 1em 0.1em;
    margin-inline: 1rem;
    float: right;
}
button.delete {
    color: red;   
}

input {
    padding-inline: 0.2em;
    margin: 1px;
}
.status {
    width: 5em;
}
.stats {
    width: 3em;
    /* padding-inline: 0.1em; */
    /* margin-top: 0.1rem; */
}
.alt-toggle {
    display: inline-block;
    width: 1.2rem;
    height: 1.2rem;
    background-color: black;
    margin-inline: 0.3em;
    margin-bottom: -0.05em;
}
.is-alt {
    background-color: blue;
}
/* input[type="text"] { */
.jap-field {
    width: calc(50% - 2px);
    font-family: "Noto Sans CJK JP";
}
.shorter {
    width: calc(50% - 1px - 1.7em);
}
.uk-field {
    width: calc(100% - 2px);
    height: 1.5em
}

.blue {
    color: blue;
}
.gray {
    color: gray;
}
</style>