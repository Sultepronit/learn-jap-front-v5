<script setup>
defineProps(['card', 'show']);
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

    <section id="question-answer">
        <p id="writing">
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
#question-answer {
    text-align: center;
    font-size: 2rem;
}
</style>