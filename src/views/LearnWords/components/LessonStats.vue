<script setup>
import { computed } from 'vue';
// const { plan, vars } = defineProps(['plan', 'vars']);
import { plan } from '../services/data.js';
import progress from '../utils/progress.js';

const passedPercent = computed(
    () => Math.round(progress.value.cards / plan.sessionLength * 100) 
);

</script>
<template>
<header>
    {{ progress.cards }}/{{ plan.sessionLength }}:
    {{ passedPercent }}% |
    <span class="green">
        l-{{ plan.learnNumber }}:
        +{{ progress.learn.good }}-{{ progress.learn.bad }}
        <strong>{{ progress.learn.upgraded }}</strong>
    </span> |
    <span class="blue">
        c-{{ plan.confirmNumber }}:
        +{{ progress.confirm.good }}-{{ progress.confirm.bad }}±{{ progress.confirm.neutral }}
        <strong>{{ progress.confirm.upgraded }}-{{ progress.confirm.degraded }}</strong>
    </span>
    <br>
    rep-{{ plan.repeatNumber }}/{{ plan.problemNumber }}
        <span>+{{ progress.repeat.good }}<sup>{{ progress.repeat.autoGood }}</sup></span>
        <span>-{{ progress.repeat.bad }}±{{ progress.repeat.neutral }}
        <strong>{{ progress.repeat.upgraded }}<sup>{{ progress.repeat.autoUpgraded }}</sup>
        <span>-{{ progress.repeat.degraded }}</span>
        </strong></span> |
    rec-{{ plan.recognizeNumber }}
</header>
</template>

<style scoped>
header {
    margin: 0.5rem;
}
</style>