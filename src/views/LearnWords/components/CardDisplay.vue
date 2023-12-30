<script setup>
// defineProps(['card', 'show']);
import { show } from '../utils/displayControls.js';
import { card } from '../utils/cycle.js';
// const show = {
//     writing: true,
//     reading: true,
//     translation: true,
//     answer: false
// }
// console.log(card);
</script>

<template>
<main>
    <p>{{ card.id }} [{{ card.status }}]</p>
    <p>{{ card.autorepeated }}</p>

    <section class="question-answer" :class="{ autorep: card.autorepeated }">
        <p class="writing" :class="card.recogMark?.name">
            <span v-show="show.writing">
                <span v-html="card.writings" />
            </span>
            <span v-show="show.answer">
                <span v-html="card.writings" />
                <span class="gray" v-html="card.rareWritings" />
            </span>
        </p>
        <p id="reading">
            <span v-show="show.reading">
                <span v-html="card.readings" />
            </span>
            <span v-show="show.answer">
                <span v-html="card.readings" />
                <span class="gray" v-html="card.rareReadings" />
            </span>
        </p>
        <p v-show="show.translation" id="translation" v-html="card.translation" />
        <p v-show="show.answer" id="example" v-html="card.example" />
    </section>

</main>
</template>

<style scoped>
.gray {
    color: gray;
}
.question-answer {
    text-align: center;
    font-size: 2rem;
    border: 5px solid white;
}
.autorep {
    border-color: black;
}
.writing {
    border-bottom: 5px solid white;
    width: fit-content;
    margin: auto;
}
.good {
    border-color: green;
}
.bad {
    border-color: red;
}
.neutral {
    border-color: yellow;
}
.question {
    border-color: black;
}
</style>