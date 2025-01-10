<script setup>
import WordList from '@/components/WordList.vue';
import { ref, watch, computed } from 'vue';
import { randomInt } from '@/utils/random.js';
import { show } from '../utils/displayControls.js';
import { card } from '../utils/cycle.js';
import { repeatStages } from '../utils/enums';
import { toKatakana } from "wanakana";
import { selectKanji, selectedKanji } from '../utils/kanji.js';

const fonts = ['sans', 'serif', 'maru', 'kurenaido'];
const randomFontNumber = () => randomInt(0, show.value.answer ? 3 : 1);
const fontNumber = ref(randomFontNumber());

watch(show, () => {
    console.log(show.value);
    console.log(randomInt(0, show.value.answer ? 30 : 1))
    fontNumber.value = randomFontNumber();
});

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
    <p class="card-stats" :class="card.repeatStage">
        {{ card.id }} [{{ card.repeatStatus }}]: 
        {{ card.fProgress }} {{ card.bProgress }} | 
        <span :class="{ auto: card.fAutorepeat }">
            {{ card.fRecord }}
        </span>&nbsp;<span :class="{ auto: card.bAutorepeat }">
            {{ card.bRecord }}
        </span>
    </p>

    <section
        class="question-answer"
        :class="{ autorep: card.repeatStage === repeatStages.AUTOREPEAT }"
    >
        <p id="kanji" v-show="show.answer">
            <span
                v-for="kanji in card.kanjis"
                :key="kanji"
                @click="selectKanji(kanji, card.cardNumber)"
            >
                {{ kanji }}
            </span>
        </p>
        
        <p class="writing" :class="[card.recogMark, fonts[fontNumber]]">
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

    <section id="word-list">
        <WordList :card="selectedKanji" />
    </section>
</main>
</template>

<style scoped>
main {
    margin: 0.5rem;
    margin-bottom: 7rem;
}

.card-stats {
    font-size: 1.1em;
    width: fit-content;
    border-bottom: 3px solid white;
}

.learn {
    border-color: yellow;
}

.confirm {
    border-color: green;
}

.repeat {
    border-color: blue;
}

.remember {
    border-color: red;
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
#kanji span {
    margin-inline: 0.4em;
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

#word-list {
    font-size: 1rem;
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
/* .question {
    border-color: black;
} */
</style>