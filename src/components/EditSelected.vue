<script setup>
defineProps(['card']);
</script>

<template>
    <section class="edit">
        <input
            type="text"
            class="writings jap-field"
            v-model="card.writings"
        >
        <input
            type="text"
            class="jap-field gray"
            v-model="card.rareWritings"
        >
        <input
            type="text"
            class="readings jap-field"
            v-model="card.readings"
        >
        <input
            type="text"
            class="jap-field gray"
            v-model="card.rereReadings"
        >
        <input
            type="text"
            class="uk-field"
            v-model="card.translation"
        >
    </section>
</template>

<style scoped>
input[type="text"] {
    padding-inline: 0.2em;
}
.jap-field {
    width: 50%;
    font-size: 1.3rem;
    font-family: "Noto Sans CJK JP";
}
.uk-field {
    width: 100%;
    font-size: 1.2rem;
    height: 1.5em
}

.blue {
    color: blue;
}
.gray {
    color: gray;
}
</style>