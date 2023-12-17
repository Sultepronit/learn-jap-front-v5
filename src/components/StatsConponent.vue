<script setup>
import { computed } from 'vue';
const { consts, vars } = defineProps(['consts', 'vars']);

// console.log(props);
// console.log(props.consts);
// console.log(props.vars);
// console.log(props.vars.cardPassed);

const passedPercent = computed(
    () => Math.round(vars.cardPassed / consts.sessionLength * 100) 
);

</script>
<template>
    <p>
        {{ vars.cardPassed }}/{{ consts.sessionLength }}:
        {{ passedPercent }}% |
        wl-{{ consts.learnNumber }}: ... |
        wl-{{ consts.confirmNumber }}
    </p>
</template>