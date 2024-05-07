<script setup>
// import TableRow from './TableRow.vue';

// import {
//     // displayedRange as range,
//     // selectedNumber,
//     // select,
//     // incrementLastDisplayedRow as incrementLastRow,
//     // setLastDisplayedRow as setLastRow,
//     // rowNumber as min,
//     // viewList,
//     // lastDisplayedRow as lastRow
// } from '../utils/displayAndSelect';

const { incrementLastRow } = defineProps([
    'min',
    'max',
    'current',
    'incrementLastRow',
    'setLastRow'
]);

function handleWheel(event) {
    const delta = Math.sign(event.deltaY) * 5;
    incrementLastRow(delta);
}        

</script>

<template>
    <section id="table" @wheel="handleWheel">
        <!-- <table>
            <tbody>
                <slot />
            </tbody>
        </table> -->
        <section id="rows">
            <slot />
        </section>
        <input
            id="scroller"
            v-show="min < max"
            type="range"
            :min="min"
            :max="max"
            :value="current"
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
    /* width: 2%; */
    writing-mode: vertical-rl;
    /* transform: rotate(180deg); */
}
.selected {
    background-color: #90ffef;
}
</style>