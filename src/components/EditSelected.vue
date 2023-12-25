<script setup>
defineProps(['select', 'createNewCard', 'card', 'update', 'isSaving']);
//  @click="toggle('altWriting')"
</script>

<template>
    <section class="edit" :class="{'is-saving': isSaving}">
        <div class="top-line">
            <button class="new-card" @click="createNewCard">
                新しい
            </button>
            <p>{{ card.id }}</p>
        </div>
        <input
            type="text"
            class="jap-field shorter"
            :class="{'blue' : card.altWriting}"
            :value="card.writings"
            @change="update($event, 'writings')"
        >
        <div
            class="alt-toggle"
            :class="{'is-alt' : card.altWriting}"
            @click="update($event, 'altWriting', true)"
        />
        <input
            type="text"
            class="jap-field gray"
            :value="card.rareWritings"
            @change="update($event, 'rareWritings')"
        >
        <input
            type="text"
            class="jap-field"
            :value="card.readings"
            @change="update($event, 'readings')"
        >
        <input
            type="text"
            class="jap-field gray"
            :value="card.rereReadings"
            @change="update($event, 'rereReadings')"
        >
        <input
            type="text"
            class="uk-field"
            :value="card.translation"
            @change="update($event, 'translation')"
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
button.new-card {
    float: right;
    font-size: 1.0rem;
    padding: 0 1em 0.1em;
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
</style>