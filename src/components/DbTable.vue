<script setup>
import { ref, computed } from 'vue';

const { incrementLastRow } = defineProps([
    'min',
    'max',
    'scrollerValue',
    'incrementLastRow',
    'setLastRow',
    'TableRow',
    'displayedRange',
    'select',
    'selectedNumber'
]);

// const lastDisplayedRow = ref(0);
// function setLastDisplayedRow(newVal) {
//     lastDisplayedRow.value = newVal < rowNumber.value ? rowNumber.value
//         : newVal > viewList.value.length ? viewList.value.length : newVal;
// }

// function incrementLastDisplayedRow(delta) {
//     setLastDisplayedRow(Number(lastDisplayedRow.value) + delta);
// }


// const displayedRange = computed(() => {
//     return viewList.value.slice(
//         (lastDisplayedRow.value - rowNumber.value),
//         lastDisplayedRow.value
//     );
// });

</script>

<template>
    <section
        id="table"
        @wheel="incrementLastRow(Math.round($event.deltaY) / 16)"
    >
        <div id="rows">
            <TableRow
                v-for="row in displayedRange"
                :key="row.id"
                :row="row"
                :select="select"
                :selectedNumber="selectedNumber"
            />
            {{ console.log(scrollerValue, min, max) }}
        </div>
        <input
            id="scroller"
            v-show="min < max"
            type="range"
            :min="min"
            :max="max"
            :value="scrollerValue"
            @change="setLastRow($event.target.value)"
        >
    </section>
</template>


<style>
#table {
    display: flex;
    width: 100%;
}
#rows {
    width: 100%;
    border-top: 1px solid;
    border-right: 1px solid;
}
#scroller {
    writing-mode: vertical-rl
}
.selected {
    background-color: #90ffef;
}
</style>