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
        l {{ plan.learnNumber }}:
        <i>{{ learnPass }}</i> {{ progress.learn.good }}
        <strong>{{ progress.learn.upgraded }}</strong>
    </span> |
    <span class="blue">
        c {{ plan.confirmNumber }}:
        <i>{{ progress.confirm.neutral }}</i> {{ progress.confirm.good }}
        <strong>{{ progress.confirm.upgraded }}-{{ progress.confirm.bad }}</strong>
    </span>
    <br>
    rp {{ plan.repeatNumber }}:
        <i>{{ repeatPass }}</i>
        {{ progress.repeat.good }}<sup>{{ progress.repeat.autoGood+' ' }}</sup>
        <b>{{ progress.repeat.upgraded }}<sup>{{ progress.repeat.autoUpgraded }}</sup>-{{ progress.repeat.bad }}</b>
    | rc {{ plan.recognizeNumber }}
</header>
</template>

<style scoped>
header {
    margin: 0.5rem;
}
</style>