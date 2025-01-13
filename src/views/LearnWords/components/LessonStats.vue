<script setup>
import { computed } from 'vue';
import { plan } from '../services/data.js';
import progress from '../utils/progress.js';

const learnPass = computed(
    () => progress.value.learn.bad + progress.value.learn.neutral + progress.value.learn.return
);

const repeatPass = computed(
    () => progress.value.repeat.neutral
        + progress.value.repeat.return
        + progress.value.remember.neutral
        + progress.value.remember.return
);

</script>
<template>
<header>
    {{ progress.cards }} |
    <span class="green">
        <b><u>{{ plan.learnNumber }}</u></b> <i>{{ learnPass }}</i> {{ progress.learn.good }}
        <strong>{{ progress.learn.upgraded }}</strong>
    </span> |
    <span class="blue">
        <b><u>{{ plan.confirmNumber }}</u></b> <i>{{ progress.confirm.neutral }}</i> {{ progress.confirm.good }}
        <strong>{{ progress.confirm.upgraded }}-{{ progress.confirm.bad }}</strong>
    </span> |
    <b><u>{{ plan.repeatNumber }}</u></b> <i>{{ repeatPass }}</i>
    {{ progress.repeat.good }}<sup>{{ progress.repeat.autoGood+' ' }}</sup>
    <b>{{ progress.repeat.upgraded }}<sup>{{ progress.repeat.autoUpgraded }}</sup>-{{ progress.repeat.bad }}</b>
    |1
</header>
</template>

<style scoped>
header {
    margin: 0.5rem;
}
</style>