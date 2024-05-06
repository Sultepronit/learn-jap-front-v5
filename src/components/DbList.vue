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
    'range',
    'incrementLastRow',
    'setLastRow',
    'min',
    'max',
    'lastRow'
]);

function handleWheel(event) {
    const delta = Math.sign(event.deltaY) * 5;
    incrementLastRow(delta);
}        

</script>

<template>
    <section class="list" @wheel="handleWheel">
        <!-- <table>
            <tbody>
                <slot  />
            </tbody>
        </table> -->
        <section id="table">
            <slot  />
        </section>
        <input
            v-show="min < max"
            type="range"
            class="scroller"
            :min="min"
            :max="max"
            :value="lastRow"
            @change="setLastRow($event.target.value)"
        >
    </section>
</template>


<style>
.list {
    display: flex;
    width: 100%;
}
.scroller {
    /* width: 2%; */
    writing-mode: vertical-rl;
    /* transform: rotate(180deg); */
}
#table {
    width: 98%;
    border-top: 1px solid;
    border-right: 1px solid;
}
table {
    width: 98%;
    border-collapse: collapse;
}
.selected {
    /* background-color: yellow; */
    /* border: 2px solid red; */
    /* border: 2px solid blue; */
    background-color: #90ffef;
}
</style>