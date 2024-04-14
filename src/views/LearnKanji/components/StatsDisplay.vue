<script setup>
import { computed } from 'vue';
import progress from '../utils/progress.js';
import { card, showAnswer } from '../utils/cycle.js';

const good = computed(() => progress.value.good + progress.value.best);
</script>

<template>
    <div class="stats">
        <p class="card-stats" v-show="showAnswer">
            {{ card?.id }}:
            {{ card?.progress }}
            <strong>{{ card?.record }}</strong>
        </p>

        <p class="session-stats">
            {{ progress.cards }}/{{ progress.problemCards }}:
            +{{ good }}<sup>{{ progress.best }}</sup>±{{ progress.neutral }}-{{ progress.bad }}
            <strong>{{ progress.upgraded }}<sup>{{ progress.autorepeat }}</sup></strong>
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