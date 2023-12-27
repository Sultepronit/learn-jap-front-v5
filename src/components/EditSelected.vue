<script setup>
import { isSaving, createNewCard, update, deleteCard } from '@/JapDb/crud';
import { selectedCard as card } from '@/JapDb/displayAndSelect';
// defineProps(['createNewCard', 'card', 'update', 'isSaving']);
// defineProps(['card']);
// const emit = defineEmits(['deleteCard']);

</script>

<template>
    <section class="edit" :class="{'is-saving': isSaving}">
        <div class="top-line">
            <button class="new-card" @click="createNewCard">
                新しい
            </button>
            <span>{{ card.cardNumber }}</span>
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
        >
        <input
            type="text"
            class="jap-field"
            :value="card.readings"
            @change="update(card.cardNumber, 'readings', $event.target.value)"
        >
        <input
            type="text"
            class="jap-field gray"
            :value="card.rareReadings"
            @change="update(card.cardNumber, 'rareReadings', $event.target.value)"
        >
        <input
            type="text"
            class="uk-field"
            :value="card.translation"
            @change="update(card.cardNumber, 'translation', $event.target.value)"
        >
    </section>
</template>

<style scoped>
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
button {
    font-size: 1.0rem;
    padding: 0 1em 0.1em;
}
button.delete {
    color: red;
    display: inline-block;
}
button.new-card {
    float: right;
}
.alt-toggle {
    display: inline-block;
    width: 1.5em;
    height: 1.5em;
    background-color: black;
    margin-inline: 0.3em;
    margin-bottom: -0.15em;
}
.is-alt {
    background-color: blue;
}
input[type="text"] {
    padding-inline: 0.2em;
    margin: 1px;
    font-size: 1.3rem;
}
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
</style>@/JapDb/displayAndSelect