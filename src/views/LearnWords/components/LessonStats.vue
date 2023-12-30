<script setup>
import { ref, computed } from 'vue';
// const { plan, vars } = defineProps(['plan', 'vars']);
import { plan } from '../services/data.js';

const progress = ref({
  cardPassed: 0
});

const passedPercent = computed(
    () => Math.round(progress.value.cardPassed / plan.sessionLength * 100) 
);

</script>
<template>
<header>
    {{ progress.cardPassed }}/{{ plan.sessionLength }}:
    {{ passedPercent }}% |
    l-{{ plan.learnNumber }}: ... |
    c-{{ plan.confirmNumber }} ... |
    rep-{{ plan.repeatNumber }}/{{ plan.problemNumber }} ... |
    rec-{{ plan.recognizeNumber }}
</header>
</template>