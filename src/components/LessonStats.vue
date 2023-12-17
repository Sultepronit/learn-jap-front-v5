<script setup>
import { computed } from 'vue';
const { consts, vars } = defineProps(['consts', 'vars']);

// console.log(props);
// console.log(consts);
// console.log(props.vars);
// console.log(props.vars.cardPassed);

const passedPercent = computed(
    () => Math.round(vars.cardPassed / consts.sessionLength * 100) 
);

</script>
<template>
    <header>
        {{ vars.cardPassed }}/{{ consts.sessionLength }}:
        {{ passedPercent }}% |
        l-{{ consts.learnNumber }}: ... |
        c-{{ consts.confirmNumber }} ... |
        rep-{{ consts.repeatNumber }}/{{ consts.problemNumber }} ... |
        rec-{{ consts.recognizeNumber }}
    </header>
</template>