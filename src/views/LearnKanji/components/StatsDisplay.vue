<script setup>
import { computed } from 'vue';
import { plan } from '../services/data';
import progress from '../utils/progress.js';
import { card, showAnswer } from '../utils/cycle.js';

const repeatPass = computed(() => 
    progress.value.repeat.neutral + progress.value.repeat.return
    //+ progress.value.remember.neutral + progress.value.remember.return
);
const repeatGood = computed(() => progress.value.repeat.good + progress.value.repeat.best);

const learnPass = computed(() => 
    progress.value.learn.neutral + progress.value.learn.return + progress.value.learn.bad
);

const remember = computed(() => progress.value.remember.neutral + progress.value.remember.return);

const repeatStatus = computed(() =>
    card.value ? (card.value.repeatStatus < 2 ? card.value.repeatStatus : 'R') : ''
);

const learning = computed(() => 
    card.value ? (card.value.repeatStatus < 1 ? true : false) : false
);
</script>

<template>
    <div class="stats">
        <p class="session-stats">
            {{ progress.cards }} |
            <span class="green">
                <b><u>{{ plan.learnNumber }}</u></b> <i>{{ learnPass }}</i> {{ progress.learn.good }} <b>{{ progress.learn.upgrade }}</b>
            </span> |
            <span>
                <b><u>{{ plan.repeatNumber }}</u></b> <i>{{ repeatPass }}</i> <b>{{ repeatGood }}<sub>{{ progress.repeat.best }}</sub>
                <sup>{{ progress.repeat.autorepeat }}</sup>-{{ progress.repeat.bad }}</b>
            </span> |
            <i>{{ remember }}</i>
        </p>

        <p class="card-stats" :class="{learning}" v-show="showAnswer">
            {{ card?.id }} [{{ repeatStatus }}]:
            {{ card?.progress }}
            <strong>{{ card?.record }}</strong>
        </p>
    </div>
</template>

<style scoped>
.stats {
    margin: 0.2rem 0.5rem 0;
    display: flex;
    align-items: start;
    justify-content: space-between;
}
.card-stats {
    border-bottom: 3px solid white;
}
.learning {
    border-color: yellow;
}
</style>