<script setup>
import { computed } from 'vue';
import { randomInt } from '@/utils/random.js';
import { show } from '../utils/displayControls.js';
import { card } from '../utils/cycle.js';
import { learnStages } from '../utils/enums';
import { toKatakana } from "wanakana";

const randomWriting = computed(() => {
    const ri = randomInt(0, card.value.parsed.writingsArray.length - 1);
    return card.value.parsed.writingsArray[ri];
});
const randomReading = computed(() => {
    const ri = randomInt(0, card.value.parsed.mainReadingsArray.length - 1);
    const reading = card.value.parsed.mainReadingsArray[ri];

    return randomInt(0, 1) ? reading : toKatakana(reading);
});
</script>

<template>
<main>
    <p>
        {{ card.id }} [{{ card.learnStatus }}]: 
        {{ card.fProgress }} {{ card.bProgress }} | 
        <span :class="{ auto: card.fAutorepeat }">
            {{ card.fStats }}
        </span>&nbsp;<span :class="{ auto: card.bAutorepeat }">
            {{ card.bStats }}
        </span>
    </p>

    <section
        class="question-answer"
        :class="{ autorep: card.learnStage === learnStages.AUTOREPEAT }"
    >
        <p class="writing" :class="card.recogMark">
            <span
                v-show="show.writing"
                v-html="randomWriting"
            />
            <span
                v-show="show.answer"
                v-html="card.parsed.writingsString"
            />
        </p>
        <p id="reading">
            <span
                v-show="show.reading"
                v-html="randomReading"
            />
            <span
                v-show="show.answer"
                v-html="card.parsed.readingsString"
            />
        </p>
        <p
            id="translation"    
            v-show="show.translation"
            v-html="card.translation"
        />
        <p
            id="example"    
            v-show="show.answer"
            v-html="card.example"
        />
    </section>
</main>
</template>

<style scoped>
main {
    margin: 0.5rem;
    margin-bottom: 7rem;
}
.question-answer {
    text-align: center;
    font-size: 1.6rem;
    border: 5px solid white;
}
.autorep {
    border-color: black;
}
.auto {
    color: red;
    font-weight: bold;
}
.writing {
    font-size: 3rem;
    border-bottom: 5px solid white;
    width: fit-content;
    margin: auto;
}
#example {
    margin-top: 1rem;
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