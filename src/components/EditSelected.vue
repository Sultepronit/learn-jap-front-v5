<script setup>
import { ref, watch } from 'vue';
const { card } = defineProps(['card', 'update']);
</script>

<template>
    <section class="edit">
        <input
            type="text"
            class="writings jap-field"
            :value="card.writings"
            @change="update($event, 'writings')"
        >
        <input
            type="text"
            class="jap-field gray"
            :value="card.rareWritings"
            @change="update($event, 'rareWritings')"
        >
        <input
            type="text"
            class="readings jap-field"
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