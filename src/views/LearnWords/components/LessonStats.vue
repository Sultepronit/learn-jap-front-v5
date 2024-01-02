<script setup>
import { ref, computed } from 'vue';
// const { plan, vars } = defineProps(['plan', 'vars']);
import { plan } from '../services/data.js';
import progress from '../utils/progress.js';

const { cards, learn, confirm, repeat } = progress;

const passedPercent = computed(
    () => Math.round(progress.value.cards / plan.sessionLength * 100) 
);

</script>
<template>
<header>
    {{ progress.cards }}/{{ plan.sessionLength }}:
    {{ passedPercent }}% |
    l-{{ plan.learnNumber }}:
        +{{ progress.learn.good }}-{{ progress.learn.bad }}
        <strong>{{ progress.learn.upgraded }}</strong> |
    c-{{ plan.confirmNumber }}:
        +{{ progress.confirm.good }}-{{ progress.confirm.bad }}±{{ progress.confirm.neutral }}
        <strong>{{ progress.confirm.upgraded }}-{{ progress.confirm.degraded }}</strong> |
    rep-{{ plan.repeatNumber }}/{{ plan.problemNumber }}
        <span>+{{ progress.repeat.good }}<sup>{{ progress.repeat.autoGood }}</sup></span>
        <span>-{{ progress.repeat.bad }}±{{ progress.repeat.neutral }}
        <strong>{{ progress.repeat.upgraded }}<sup>{{ progress.repeat.autoUpgraded }}</sup>
        <span>-{{ progress.repeat.degraded }}</span>
        </strong></span> |
    rec-{{ plan.recognizeNumber }}
</header>
</template>