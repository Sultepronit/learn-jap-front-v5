<script setup>
import { computed } from 'vue';
import progress from '../utils/progress.js';
import { card, showAnswer } from '../utils/cycle.js';

const repeatPass = computed(() => 
    progress.value.repeat.neutral + progress.value.repeat.return
    + progress.value.remember.neutral + progress.value.remember.return
);
const repeatGood = computed(() => progress.value.repeat.good + progress.value.repeat.best);

const learnPass = computed(() => 
    progress.value.learn.neutral + progress.value.learn.return + progress.value.learn.bad
);

const repeatStage = computed(() => card.value.repeatStatus < 2 ? card.value.repeatStatus : 'R');
</script>

<template>
    <div class="stats">
        <p class="session-stats">
            <!-- {{ progress.cards }}/{{ progress.problemCards }}:
            +{{ good }}<sup>{{ progress.best }}</sup>±{{ progress.neutral }}-{{ progress.bad }}
            <strong>{{ progress.upgraded }}<sup>{{ progress.autorepeat }}</sup></strong> -->
            {{ progress.cards }} |
            <span class="green">
                l: <i>{{ learnPass }}</i> {{ progress.learn.good }} <b>{{ progress.learn.upgrade }}</b>
            </span> |
            <span>
                r: <i>{{ repeatPass }}</i> <b>{{ repeatGood }}<sub>{{ progress.repeat.best }}</sub>
                <sup>{{ progress.repeat.autorepeat }}</sup>-{{ progress.repeat.bad }}</b>
            </span>
        </p>

        <p class="card-stats" v-show="showAnswer">
            {{ card?.id }} [{{ repeatStage }}]:
            {{ card?.progress }}
            <strong>{{ card?.record }}</strong>
        </p>
    </div>
</template>

<style scoped>
/* header { */
.stats {
    margin: 0.2rem 0.5rem 0;
}
.card-stats {
    float: right;
}
</style>