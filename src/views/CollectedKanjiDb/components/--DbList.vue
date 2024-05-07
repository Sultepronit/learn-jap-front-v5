<script setup>
import TableRow from './TableRow.vue';

import {
    displayedRange as range,
    selectedNumber,
    select,
    incrementLastDisplayedRow as incrementLastRow,
    setLastDisplayedRow as setLastRow,
    rowNumber as min,
    viewList,
    lastDisplayedRow as lastRow
} from '../utils/displayAndSelect';

function handleWheel(event) {
    const delta = Math.sign(event.deltaY) * 5;
    incrementLastRow(delta);
}                           
</script>

<template>
    <section class="list" @wheel="handleWheel">
        <table>
            <tbody>
                <TableRow
                    v-for="row in range"
                    :key="row.id"
                    :row="row"
                    @click="select(row.id)"
                    :class="{selected: selectedNumber === row.id}"
                />
            </tbody>
        </table>
        <input
            v-show="min < viewList.length"
            type="range"
            class="scroller"        
            :min="min"
            :max="viewList.length"
            :value="lastRow"
            @change="setLastRow($event.target.value)"
        >
    </section>
</template>


<style scoped>
.list {
    display: flex;
    width: 100%;
}
.scroller {
    width: 2%;
    writing-mode: vertical-rl;
    /* transform: rotate(180deg); */
}
table {
    width: 98%;
    border-collapse: collapse;
}
.selected {
    /* background-color: yellow; */
    border: 2px solid red;
}
</style>